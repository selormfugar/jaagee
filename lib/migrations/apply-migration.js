const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function run() {
  const sqlPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const client = new Client({
    host: 'aws-1-eu-west-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.izdpbrwehqmkapbkxztc',
    password: 'pwd@jaagee.org',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected to PostgreSQL. Applying schema.sql...');

  await client.query(sql);
  console.log('schema.sql successfully applied!');

  // Verify tables
  const res = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);
  console.log('Public tables created:', res.rows.map(r => r.table_name));

  // Verify RLS
  const rls = await client.query(`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY tablename;
  `);
  console.log('RLS verification:');
  rls.rows.forEach(r => console.log(`  - ${r.tablename}: RLS = ${r.rowsecurity}`));

  // Verify functions
  const fn = await client.query(`
    SELECT proname, prosecdef 
    FROM pg_proc 
    WHERE proname = 'is_admin';
  `);
  console.log('Functions:');
  fn.rows.forEach(r => console.log(`  - ${r.proname}: SECURITY DEFINER = ${r.prosecdef}`));

  await client.end();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
