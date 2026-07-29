-- Seed real product data for AZM store
-- Categories are already inserted in 0001_init.sql

DO $$
DECLARE
  cat_protein UUID;
  cat_creatine UUID;
  cat_mass UUID;
  cat_pre UUID;
  cat_amino UUID;
  cat_vitamins UUID;
  cat_fat UUID;
  cat_accessories UUID;
BEGIN
  SELECT id INTO cat_protein FROM categories WHERE slug = 'protein';
  SELECT id INTO cat_creatine FROM categories WHERE slug = 'creatine';
  SELECT id INTO cat_mass FROM categories WHERE slug = 'mass-gainer';
  SELECT id INTO cat_pre FROM categories WHERE slug = 'pre-workout';
  SELECT id INTO cat_amino FROM categories WHERE slug = 'amino';
  SELECT id INTO cat_vitamins FROM categories WHERE slug = 'vitamins';
  SELECT id INTO cat_fat FROM categories WHERE slug = 'fat-burners';
  SELECT id INTO cat_accessories FROM categories WHERE slug = 'accessories';

  -- ===== PROTEIN =====
  INSERT INTO products (name, name_en, brand, price, old_price, category_id, stock, tags, is_featured) VALUES
    ('واي بروتين إيزوليت ٢ كجم', 'Whey Isolate 2kg', 'AZM Pro', 2600, 3000, cat_protein, 45, '{الأكثر مبيعاً}', true),
    ('واي بروتين كونسينترد ١ كجم', 'Whey Concentrate 1kg', 'AZM Core', 1200, NULL, cat_protein, 60, '{}', false),
    ('بروتين نباتي ٩٠٠ جم', 'Plant Protein 900g', 'AZM Fuel', 1800, NULL, cat_protein, 20, '{جديد}', true);

  -- ===== CREATINE =====
  INSERT INTO products (name, name_en, brand, price, old_price, category_id, stock, tags, is_featured) VALUES
    ('كرياتين مونوهيدرات ٥٠٠ جم', 'Creatine Monohydrate 500g', 'AZM Core', 750, NULL, cat_creatine, 35, '{الأكثر مبيعاً}', true),
    ('كرياتين ميكرونايزد ١ كجم', 'Creatine Micronized 1kg', 'AZM Pro', 1200, NULL, cat_creatine, 25, '{}', false),
    ('هيدرو كرياتين ٣٠٠ جم', 'HCL Creatine 300g', 'AZM Pro', 900, 1100, cat_creatine, 15, '{خصم}', false);

  -- ===== MASS GAINER =====
  INSERT INTO products (name, name_en, brand, price, old_price, category_id, stock, tags, is_featured) VALUES
    ('ماس جاينر ٣ كجم', 'Mass Gainer 3kg', 'AZM Core', 1500, 1800, cat_mass, 30, '{خصم}', false),
    ('ماس جاينر برو ٥ كجم', 'Mass Gainer Pro 5kg', 'AZM Fuel', 2200, NULL, cat_mass, 18, '{}', false),
    ('سيرياس ماس ٢.٧ كجم', 'Serious Mass 2.7kg', 'AZM Pro', 1850, NULL, cat_mass, 12, '{حصري}', true);

  -- ===== PRE-WORKOUT =====
  INSERT INTO products (name, name_en, brand, price, old_price, category_id, stock, tags, is_featured) VALUES
    ('بري وركاوت إكستريم ٣٠٠ جم', 'Pre-Workout Extreme 300g', 'AZM Fuel', 1100, NULL, cat_pre, 28, '{الأكثر مبيعاً}', true),
    ('بري وركاوت نتروجين بوم', 'Nitrogen Boom Pre-Workout', 'AZM Pro', 950, NULL, cat_pre, 22, '{}', false),
    ('كافيين تابلت ٢٠٠ مجم × ١٠٠', 'Caffeine 200mg x 100', 'AZM Core', 350, NULL, cat_pre, 50, '{}', false);

  -- ===== AMINO ACIDS =====
  INSERT INTO products (name, name_en, brand, price, old_price, category_id, stock, tags, is_featured) VALUES
    ('بي سي إيه إيه ٢:١:١ ٥٠٠ جم', 'BCAA 2:1:1 500g', 'AZM Recover', 850, NULL, cat_amino, 20, '{}', false),
    ('إل-جلوتامين ٤٠٠ جم', 'L-Glutamine 400g', 'AZM Recover', 650, NULL, cat_amino, 15, '{جديد}', false),
    ('إل-كارنيتين ٦٠ كبسولة', 'L-Carnitine 60 Caps', 'AZM Fuel', 550, NULL, cat_amino, 40, '{}', false);

  -- ===== VITAMINS =====
  INSERT INTO products (name, name_en, brand, price, old_price, category_id, stock, tags, is_featured) VALUES
    ('مولتي فيتامين للرياضيين ٩٠ قرص', 'Multi-Vitamin 90 Tabs', 'AZM Core', 450, NULL, cat_vitamins, 60, '{الأكثر مبيعاً}', true),
    ('أوميغا ٣ ١٠٠٠ مجم ٦٠ كبسولة', 'Omega-3 1000mg 60 Softgels', 'AZM Pro', 380, NULL, cat_vitamins, 45, '{}', false),
    ('فيتامين د٣ ٥٠٠٠ وحدة ١٢٠ قرص', 'Vitamin D3 5000IU 120 Tabs', 'AZM Core', 320, NULL, cat_vitamins, 55, '{جديد}', false);

  -- ===== FAT BURNERS =====
  INSERT INTO products (name, name_en, brand, price, old_price, category_id, stock, tags, is_featured) VALUES
    ('فات برنر تيرمو ٩٠ كبسولة', 'Thermo Fat Burner 90 Caps', 'AZM Fuel', 850, 1000, cat_fat, 18, '{خصم}', false),
    ('إل-كارنيتين تيرمو ١٠٠٠ مجم', 'L-Carnitine Thermo 1000mg', 'AZM Pro', 650, NULL, cat_fat, 25, '{}', false),
    ('كلين سليم شاي أخضر ٣٠ كيس', 'Clean Slim Green Tea 30 Bags', 'AZM Core', 280, NULL, cat_fat, 35, '{}', false);

  -- ===== ACCESSORIES =====
  INSERT INTO products (name, name_en, brand, price, old_price, category_id, stock, tags, is_featured) VALUES
    ('حزام رفع أثقال جلد', 'Leather Lifting Belt', 'AZM Gear', 1350, NULL, cat_accessories, 10, '{}', false),
    ('أربطة معصم جل', 'Leather Wrist Straps', 'AZM Gear', 450, NULL, cat_accessories, 30, '{الأكثر مبيعاً}', true),
    ('جوانتي رفع أثقال مقاس M/L', 'Lifting Gloves M/L', 'AZM Gear', 600, NULL, cat_accessories, 20, '{}', false),
    ('شيكر بروتين ٧٠٠ مل', 'Protein Shaker 700ml', 'AZM Gear', 300, NULL, cat_accessories, 5, '{حصري}', true),
    ('حبل مقاومة مطاطي ١٠-٤٠ كجم', 'Resistance Band 10-40kg', 'AZM Gear', 450, NULL, cat_accessories, 15, '{}', false),
    ('شريط سحب (بار) باب', 'Pull-Up Bar Doorway', 'AZM Gear', 700, NULL, cat_accessories, 8, '{جديد}', false),
    ('نظارة شمس رياضية', 'Sport Sunglasses', 'AZM Gear', 550, NULL, cat_accessories, 12, '{حصري}', false),
    ('تابلت ألمنيوم للتمارين', 'Aluminum Exercise Pad', 'AZM Gear', 250, NULL, cat_accessories, 40, '{}', false);

END $$;
