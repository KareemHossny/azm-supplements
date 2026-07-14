-- Add images array column to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  price_modifier DECIMAL(10,2) DEFAULT 0,
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- RLS: public read, admin write
CREATE POLICY "variants_read_public" ON product_variants FOR SELECT USING (true);
CREATE POLICY "variants_insert_admin" ON product_variants FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "variants_update_admin" ON product_variants FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "variants_delete_admin" ON product_variants FOR DELETE USING (auth.role() = 'authenticated');
