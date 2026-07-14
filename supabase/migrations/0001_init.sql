-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  brand TEXT NOT NULL,
  description TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL,
  old_price DECIMAL(10,2),
  image_url TEXT DEFAULT '',
  category_id UUID REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create governorates/shipping table
CREATE TABLE governorates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivery_days TEXT DEFAULT '2-3',
  is_active BOOLEAN DEFAULT true
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT DEFAULT '',
  governorate TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  landmark TEXT DEFAULT '',
  shipping_fee DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  subtotal DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT DEFAULT 'cod',
  status TEXT DEFAULT 'new' CHECK (status IN ('new','pending','processing','shipped','delivered','cancelled')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create admins table (linked to Supabase Auth)
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin','admin','manager','support')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create order_number sequence
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- Auto-generate order_number function
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE SQL
AS $$ SELECT 'AZM-' || nextval('order_number_seq')::TEXT; $$;

-- Auto-set order_number on insert
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE governorates ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- RLS: Products — public read, admin write
CREATE POLICY "products_read_public" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "products_read_admin" ON products FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "products_insert_admin" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "products_update_admin" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "products_delete_admin" ON products FOR DELETE USING (auth.role() = 'authenticated');

-- RLS: Categories — public read, admin write
CREATE POLICY "categories_read_public" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_write_admin" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "categories_update_admin" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "categories_delete_admin" ON categories FOR DELETE USING (auth.role() = 'authenticated');

-- RLS: Governorates — public read, admin write
CREATE POLICY "governorates_read_public" ON governorates FOR SELECT USING (true);
CREATE POLICY "governorates_write_admin" ON governorates FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS: Orders — admin full access, public insert
CREATE POLICY "orders_insert_public" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_read_admin" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "orders_update_admin" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS: Order items — admin full access, public insert
CREATE POLICY "order_items_insert_public" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "order_items_read_admin" ON order_items FOR SELECT USING (auth.role() = 'authenticated');

-- RLS: Admins — admin only
CREATE POLICY "admins_read" ON admins FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admins_write" ON admins FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default categories
INSERT INTO categories (slug, name, name_en) VALUES
  ('protein', 'بروتين', 'Protein'),
  ('creatine', 'كرياتين', 'Creatine'),
  ('mass-gainer', 'زيادة وزن', 'Mass Gainer'),
  ('pre-workout', 'بري وركاوت', 'Pre-Workout'),
  ('amino', 'أحماض أمينية', 'Amino'),
  ('vitamins', 'فيتامينات', 'Vitamins'),
  ('fat-burners', 'حرق الدهون', 'Fat Burners'),
  ('accessories', 'إكسسوارات', 'Accessories');

-- Insert default governorates
INSERT INTO governorates (name, fee, delivery_days) VALUES
  ('القاهرة', 40, '1-2'),
  ('الجيزة', 40, '1-2'),
  ('الإسكندرية', 55, '2-3'),
  ('الدقهلية', 55, '2-3'),
  ('الشرقية', 55, '2-3'),
  ('الغربية', 55, '2-3'),
  ('المنوفية', 55, '2-3'),
  ('البحيرة', 60, '2-3'),
  ('كفر الشيخ', 60, '2-4'),
  ('بورسعيد', 65, '2-4'),
  ('الإسماعيلية', 65, '2-4'),
  ('السويس', 65, '2-4'),
  ('دمياط', 60, '2-4'),
  ('شمال سيناء', 90, '3-5'),
  ('جنوب سيناء', 90, '3-5'),
  ('المنيا', 70, '3-4'),
  ('أسيوط', 75, '3-4'),
  ('سوهاج', 80, '3-5'),
  ('قنا', 85, '3-5'),
  ('الأقصر', 90, '3-5'),
  ('أسوان', 95, '4-6'),
  ('البحر الأحمر', 90, '3-5'),
  ('الفيوم', 65, '2-4'),
  ('بني سويف', 65, '2-4'),
  ('القليوبية', 45, '1-2'),
  ('مطروح', 90, '3-5'),
  ('الوادي الجديد', 100, '4-6');
