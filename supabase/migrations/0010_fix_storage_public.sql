-- Force product-images bucket to be public (handles case where bucket was created manually without public flag)
UPDATE storage.buckets SET public = true WHERE id = 'product-images';

-- Ensure RLS policies exist (idempotent - IF NOT EXISTS pattern)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'product_images_read_public') THEN
    CREATE POLICY "product_images_read_public" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'product_images_insert_auth') THEN
    CREATE POLICY "product_images_insert_auth" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'product_images_update_auth') THEN
    CREATE POLICY "product_images_update_auth" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'product_images_delete_auth') THEN
    CREATE POLICY "product_images_delete_auth" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;
END $$;
