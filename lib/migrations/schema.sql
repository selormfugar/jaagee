-- ===============================================================================
-- JaaGee Scientific - Production Supabase / Postgres Database Schema
-- File: C:\xampp\htdocs\jaagee\lib\migrations\schema.sql
-- ===============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived', 'discontinued');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('unverified', 'verified');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. BRANDS TABLE
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    country TEXT,
    website_url TEXT,
    description TEXT,
    logo_url TEXT,
    parent_brand_id UUID REFERENCES brands(id) ON DELETE SET NULL, -- Model brand families (e.g. LiquidLINE under OPSIS)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INDUSTRIES TABLE
CREATE TABLE IF NOT EXISTS industries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sku TEXT,
    short_description TEXT,
    full_description TEXT,
    specifications JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    status product_status NOT NULL DEFAULT 'draft',
    verification_status verification_status NOT NULL DEFAULT 'unverified',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    replacement_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRODUCT INDUSTRIES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS product_industries (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    industry_id UUID REFERENCES industries(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, industry_id)
);

-- 7. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    description TEXT,
    icon_name TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    product_requirement TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'closed'
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PROFILES TABLE (ADMIN USERS)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===============================================================================
-- HELPER SECURITY DEFINER FUNCTION FOR RLS (PREVENTS RECURSION)
-- ===============================================================================
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ===============================================================================
-- INDEXES FOR HIGH PERFORMANCE QUERYING
-- ===============================================================================
CREATE INDEX IF NOT EXISTS idx_products_status_verification ON products(status, verification_status);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- ===============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===============================================================================

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Brands RLS (Public read, admin manage)
CREATE POLICY "Public brands read access" ON brands FOR SELECT USING (true);
CREATE POLICY "Admin brands write access" ON brands FOR ALL USING (public.is_admin(auth.uid()));

-- Categories RLS (Public read, admin manage)
CREATE POLICY "Public categories read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Admin categories write access" ON categories FOR ALL USING (public.is_admin(auth.uid()));

-- Industries RLS (Public read, admin manage)
CREATE POLICY "Public industries read access" ON industries FOR SELECT USING (true);
CREATE POLICY "Admin industries write access" ON industries FOR ALL USING (public.is_admin(auth.uid()));

-- Products RLS (Public read published & verified items, plus discontinued for replacement notices)
CREATE POLICY "Public products read published only" ON products FOR SELECT USING (
    (status = 'published' OR status = 'discontinued') AND verification_status = 'verified'
);
CREATE POLICY "Admin products full access" ON products FOR ALL USING (public.is_admin(auth.uid()));

-- Product Industries RLS
CREATE POLICY "Public product_industries read access" ON product_industries FOR SELECT USING (true);
CREATE POLICY "Admin product_industries full access" ON product_industries FOR ALL USING (public.is_admin(auth.uid()));

-- Product Images RLS
CREATE POLICY "Public product_images read access" ON product_images FOR SELECT USING (true);
CREATE POLICY "Admin product_images full access" ON product_images FOR ALL USING (public.is_admin(auth.uid()));

-- Services RLS (Public read, admin manage)
CREATE POLICY "Public services read access" ON services FOR SELECT USING (true);
CREATE POLICY "Admin services write access" ON services FOR ALL USING (public.is_admin(auth.uid()));

-- Enquiries RLS (Public INSERT ONLY, zero public SELECT/UPDATE/DELETE, admin full read/write)
CREATE POLICY "Public visitors submit enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin enquiries full access" ON enquiries FOR ALL USING (public.is_admin(auth.uid()));

-- Profiles RLS (User read own profile or admin read all)
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (
    auth.uid() = id OR public.is_admin(auth.uid())
);
