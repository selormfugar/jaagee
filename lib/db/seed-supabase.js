const { Client } = require('pg');
const {
  SEED_BRANDS,
  SEED_CATEGORIES,
  SEED_INDUSTRIES,
  SEED_SERVICES,
  SEED_PRODUCTS
} = require('./data/seed-data.ts');

async function seed() {
  const client = new Client({
    host: 'aws-1-eu-west-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.izdpbrwehqmkapbkxztc',
    password: 'pwd@jaagee.org',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected to Supabase PostgreSQL for seeding...');

  // 1. SEED BRANDS
  console.log('Seeding brands...');
  const brandIdMap = {};
  for (const b of SEED_BRANDS) {
    const res = await client.query(`
      INSERT INTO brands (slug, name, country, website_url, description)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        country = EXCLUDED.country,
        website_url = EXCLUDED.website_url,
        description = EXCLUDED.description
      RETURNING id, slug;
    `, [b.slug, b.name, b.country, b.website_url, b.description]);
    brandIdMap[b.slug] = res.rows[0].id;
  }

  // Update parent_brand_id (e.g. liquidline -> opsis)
  for (const b of SEED_BRANDS) {
    if (b.parent_brand && brandIdMap[b.parent_brand]) {
      await client.query(`
        UPDATE brands SET parent_brand_id = $1 WHERE slug = $2;
      `, [brandIdMap[b.parent_brand], b.slug]);
    }
  }
  console.log(`✓ Seeded ${Object.keys(brandIdMap).length} brands`);

  // 2. SEED CATEGORIES
  console.log('Seeding categories...');
  const categoryIdMap = {};
  for (const c of SEED_CATEGORIES) {
    const res = await client.query(`
      INSERT INTO categories (slug, name, description)
      VALUES ($1, $2, $3)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description
      RETURNING id, slug;
    `, [c.slug, c.name, c.description]);
    categoryIdMap[c.slug] = res.rows[0].id;
  }
  console.log(`✓ Seeded ${Object.keys(categoryIdMap).length} categories`);

  // 3. SEED INDUSTRIES
  console.log('Seeding industries...');
  const industryIdMap = {};
  for (const ind of SEED_INDUSTRIES) {
    const res = await client.query(`
      INSERT INTO industries (slug, name, description, icon_name)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        icon_name = EXCLUDED.icon_name
      RETURNING id, slug;
    `, [ind.slug, ind.name, ind.description, ind.icon_name]);
    industryIdMap[ind.slug] = res.rows[0].id;
  }
  console.log(`✓ Seeded ${Object.keys(industryIdMap).length} industries`);

  // 4. SEED SERVICES
  console.log('Seeding services...');
  for (let i = 0; i < SEED_SERVICES.length; i++) {
    const s = SEED_SERVICES[i];
    await client.query(`
      INSERT INTO services (slug, title, summary, description, icon_name, display_order)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        description = EXCLUDED.description,
        icon_name = EXCLUDED.icon_name,
        display_order = EXCLUDED.display_order;
    `, [s.slug, s.title, s.summary, s.description, s.icon_name, i + 1]);
  }
  console.log(`✓ Seeded ${SEED_SERVICES.length} services`);

  // 5. SEED PRODUCTS
  console.log('Seeding products...');
  const productIdMap = {};
  for (const p of SEED_PRODUCTS) {
    const brandId = brandIdMap[p.brand_slug] || null;
    const categoryId = categoryIdMap[p.category_slug] || null;

    const res = await client.query(`
      INSERT INTO products (
        slug, name, brand_id, category_id, short_description, full_description,
        specifications, features, applications, status, verification_status, is_featured
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        brand_id = EXCLUDED.brand_id,
        category_id = EXCLUDED.category_id,
        short_description = EXCLUDED.short_description,
        full_description = EXCLUDED.full_description,
        specifications = EXCLUDED.specifications,
        features = EXCLUDED.features,
        applications = EXCLUDED.applications,
        status = EXCLUDED.status,
        verification_status = EXCLUDED.verification_status,
        is_featured = EXCLUDED.is_featured
      RETURNING id, slug;
    `, [
      p.slug,
      p.name,
      brandId,
      categoryId,
      p.short_description,
      p.full_description,
      JSON.stringify(p.specifications || []),
      JSON.stringify(p.features || []),
      JSON.stringify(p.applications || []),
      p.status,
      p.verification_status,
      p.is_featured || false
    ]);
    productIdMap[p.slug] = res.rows[0].id;

    // Seed product_industries junction
    if (p.industry_slugs && p.industry_slugs.length > 0) {
      for (const indSlug of p.industry_slugs) {
        const indId = industryIdMap[indSlug];
        if (indId) {
          await client.query(`
            INSERT INTO product_industries (product_id, industry_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING;
          `, [res.rows[0].id, indId]);
        }
      }
    }

    // Seed product_images if image_url exists
    if (p.image_url) {
      await client.query(`
        INSERT INTO product_images (product_id, image_url, is_primary, display_order)
        VALUES ($1, $2, true, 0)
        ON CONFLICT DO NOTHING;
      `, [res.rows[0].id, p.image_url]);
    }
  }
  console.log(`✓ Seeded ${Object.keys(productIdMap).length} products`);

  // Link discontinued replacement products
  for (const p of SEED_PRODUCTS) {
    if (p.replacement_product_slug && productIdMap[p.replacement_product_slug]) {
      await client.query(`
        UPDATE products SET replacement_product_id = $1 WHERE slug = $2;
      `, [productIdMap[p.replacement_product_slug], p.slug]);
      console.log(`✓ Linked replacement for ${p.slug} -> ${p.replacement_product_slug}`);
    }
  }

  // 6. VERIFY DATABASE TOTALS
  console.log('\n--- VERIFICATION OF SUPABASE DATABASE ---');
  const counts = await client.query(`
    SELECT
      (SELECT COUNT(*) FROM brands) AS brands_count,
      (SELECT COUNT(*) FROM categories) AS categories_count,
      (SELECT COUNT(*) FROM industries) AS industries_count,
      (SELECT COUNT(*) FROM services) AS services_count,
      (SELECT COUNT(*) FROM products) AS products_total,
      (SELECT COUNT(*) FROM products WHERE status = 'published' AND verification_status = 'verified') AS published_verified,
      (SELECT COUNT(*) FROM products WHERE status = 'draft') AS draft_count,
      (SELECT COUNT(*) FROM products WHERE verification_status = 'unverified') AS unverified_count,
      (SELECT COUNT(*) FROM products WHERE status = 'discontinued') AS discontinued_count,
      (SELECT COUNT(*) FROM product_industries) AS product_industries_count,
      (SELECT COUNT(*) FROM product_images) AS product_images_count;
  `);
  console.log('Database row counts:', counts.rows[0]);

  await client.end();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
