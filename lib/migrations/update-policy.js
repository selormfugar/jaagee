const { Client } = require('pg');

async function update() {
  const client = new Client({
    host: 'aws-1-eu-west-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.izdpbrwehqmkapbkxztc',
    password: 'pwd@jaagee.org',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  await client.query(`
    DROP POLICY IF EXISTS "Public products read published only" ON products;
    CREATE POLICY "Public products read published only" ON products FOR SELECT USING (
      (status = 'published' OR status = 'discontinued') AND verification_status = 'verified'
    );
  `);
  console.log('Policy updated successfully.');
  await client.end();
}

update().catch(console.error);
