-- Create coupons table
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed', 'shipping')),
  value DECIMAL(10,2) NOT NULL DEFAULT 0,
  min_order DECIMAL(10,2) DEFAULT 0,
  max_uses INTEGER DEFAULT 0,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create settings table
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS: admin only
CREATE POLICY "coupons_read" ON coupons FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "coupons_insert" ON coupons FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "coupons_update" ON coupons FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "coupons_delete" ON coupons FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "settings_read" ON settings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "settings_insert" ON settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "settings_update" ON settings FOR UPDATE USING (auth.role() = 'authenticated');

-- Default settings
INSERT INTO settings (key, value) VALUES
  ('store_name', 'AZM'),
  ('store_email', 'hello@azm.com'),
  ('store_phone', '19999'),
  ('store_address', 'القاهرة، مصر'),
  ('tax_rate', '14'),
  ('shipping_threshold', '500');
