-- Add user_id to orders so users can see their own orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create user_addresses table
CREATE TABLE IF NOT EXISTS user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'المنزل',
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  governorate TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  landmark TEXT DEFAULT '',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "addresses_read_own" ON user_addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "addresses_insert_own" ON user_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "addresses_update_own" ON user_addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "addresses_delete_own" ON user_addresses FOR DELETE USING (auth.uid() = user_id);
