-- Add missing UPDATE and DELETE policies for governorates
CREATE POLICY "governorates_update_admin" ON governorates FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "governorates_delete_admin" ON governorates FOR DELETE USING (auth.role() = 'authenticated');
