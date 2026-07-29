UPDATE products p SET image_url = '/product-images/' || c.slug || '.svg'
FROM categories c
WHERE p.category_id = c.id AND (p.image_url IS NULL OR p.image_url = '');
