-- =====================================================
-- Business/Company fields for Stripe Checkout
-- =====================================================

-- Add business fields to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_business BOOLEAN DEFAULT FALSE;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS cnpj TEXT;

-- Index for CNPJ lookups
CREATE INDEX IF NOT EXISTS idx_users_cnpj ON public.users(cnpj);
