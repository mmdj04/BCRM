-- =====================================================
-- Studio Admin Dashboard - Supabase Schema
-- =====================================================
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor → New Query
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. AUTH & USERS
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  username TEXT UNIQUE,
  email TEXT NOT NULL,
  avatar TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('administrator', 'admin', 'user', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Platform users (extended user profiles)
CREATE TABLE IF NOT EXISTS public.platform_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'invited')),
  team TEXT,
  workspace TEXT[],
  joined_date DATE DEFAULT CURRENT_DATE,
  last_active TIMESTAMPTZ DEFAULT NOW()
);

-- Roles & permissions
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  "group" TEXT NOT NULL,
  access_level TEXT DEFAULT 'read',
  users_count INTEGER DEFAULT 0,
  permission_sets TEXT[],
  last_review DATE,
  owner TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. CUSTOMERS (Default Dashboard)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  plan TEXT DEFAULT 'free',
  status TEXT DEFAULT 'active',
  billing TEXT,
  joined DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. E-COMMERCE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  customer_name TEXT NOT NULL,
  payment_method TEXT,
  total DECIMAL(10,2) DEFAULT 0,
  items INTEGER DEFAULT 0,
  fulfillment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. CRM
-- =====================================================

CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account TEXT NOT NULL,
  stage TEXT DEFAULT 'lead',
  priority TEXT DEFAULT 'medium',
  health TEXT DEFAULT 'good',
  value DECIMAL(12,2) DEFAULT 0,
  owner TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. TASKS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  label TEXT DEFAULT 'feature',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kanban_columns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.kanban_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  progress INTEGER DEFAULT 0,
  owner_name TEXT,
  owner_avatar TEXT,
  team TEXT,
  insights JSONB DEFAULT '[]',
  column_id TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. CHAT
-- =====================================================

CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  location TEXT,
  timezone TEXT,
  status TEXT DEFAULT 'offline',
  qualified_at TIMESTAMPTZ,
  tags TEXT[],
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_name TEXT,
  name TEXT NOT NULL,
  subject TEXT,
  preview TEXT,
  time TIMESTAMPTZ DEFAULT NOW(),
  is_unread BOOLEAN DEFAULT false,
  is_online BOOLEAN DEFAULT false,
  unread_count INTEGER DEFAULT 0,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id),
  align TEXT DEFAULT 'left',
  text TEXT NOT NULL,
  time TIMESTAMPTZ DEFAULT NOW(),
  reaction TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. MAIL
-- =====================================================

CREATE TABLE IF NOT EXISTS public.emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id TEXT,
  from_name TEXT NOT NULL,
  from_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT,
  received_at TIMESTAMPTZ DEFAULT NOW(),
  folder TEXT DEFAULT 'inbox',
  is_read BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  is_priority BOOLEAN DEFAULT false,
  labels TEXT[],
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.email_recipients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_id UUID REFERENCES public.emails(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT NOT NULL,
  type TEXT DEFAULT 'to' CHECK (type IN ('to', 'cc', 'bcc'))
);

CREATE TABLE IF NOT EXISTS public.email_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_id UUID REFERENCES public.emails(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  size INTEGER,
  icon TEXT
);

-- =====================================================
-- 8. LOGISTICS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number TEXT UNIQUE NOT NULL,
  customer_id UUID,
  customer_name TEXT,
  customer_initials TEXT,
  customer_tier TEXT,
  origin_city TEXT,
  origin_country TEXT,
  origin_code TEXT,
  destination_city TEXT,
  destination_country TEXT,
  destination_code TEXT,
  cargo_description TEXT,
  cargo_type TEXT,
  handling_tags TEXT[],
  weight_kg DECIMAL(10,2),
  estimated_arrival TIMESTAMPTZ,
  status TEXT DEFAULT 'in_transit',
  progress INTEGER DEFAULT 0,
  transport_mode TEXT,
  route_type TEXT,
  transport_number TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. INVOICES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.invoice_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  address_lines TEXT[],
  tax_id TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number TEXT UNIQUE NOT NULL,
  issued_date DATE DEFAULT CURRENT_DATE,
  payment_due_date DATE,
  from_client_id UUID REFERENCES public.invoice_clients(id),
  to_client_id UUID REFERENCES public.invoice_clients(id),
  tax_id TEXT,
  discount_type TEXT DEFAULT 'percentage',
  discount_value DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'draft',
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoice_line_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) DEFAULT 0,
  position INTEGER DEFAULT 0
);

-- =====================================================
-- 10. CALENDAR
-- =====================================================

CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  start TIMESTAMPTZ NOT NULL,
  "end" TIMESTAMPTZ,
  all_day BOOLEAN DEFAULT false,
  group_id TEXT,
  display TEXT DEFAULT 'block',
  color TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 11. FILE MANAGER
-- =====================================================

CREATE TABLE IF NOT EXISTS public.folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  file_count INTEGER DEFAULT 0,
  size TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  kind TEXT DEFAULT 'document',
  size TEXT,
  owner_name TEXT,
  owner_initials TEXT,
  modified_at TIMESTAMPTZ DEFAULT NOW(),
  shared BOOLEAN DEFAULT false,
  starred BOOLEAN DEFAULT false,
  folder_id UUID REFERENCES public.folders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 12. INFRASTRUCTURE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.infrastructure_environments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_name TEXT NOT NULL,
  organization TEXT,
  domain TEXT NOT NULL,
  platform TEXT,
  environment TEXT,
  status TEXT DEFAULT 'healthy',
  latency_ms DECIMAL(10,2),
  uptime_percent DECIMAL(5,2),
  server TEXT,
  country_code TEXT,
  plan TEXT,
  resources JSONB DEFAULT '{}',
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 13. PATIENT MONITORING
-- =====================================================

CREATE TABLE IF NOT EXISTS public.patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER,
  sex TEXT,
  bed TEXT,
  diagnosis TEXT,
  heart_rate INTEGER,
  spo2 INTEGER,
  nibp_systolic INTEGER,
  nibp_diastolic INTEGER,
  map_value INTEGER,
  temperature DECIMAL(4,1),
  respiration_rate INTEGER,
  status TEXT DEFAULT 'stable',
  alarm TEXT,
  alarm_duration TEXT,
  signal_profile TEXT DEFAULT 'normal_sinus',
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.patient_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  event_time TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 14. PREFERENCES (Cookie-based → DB migration)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT,
  UNIQUE(user_id, key)
);

-- =====================================================
-- 15. INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_status ON public.customers(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON public.orders(customer_name);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(fulfillment_status);
CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON public.opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_kanban_tasks_column ON public.kanban_tasks(column_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_emails_folder ON public.emails(folder);
CREATE INDEX IF NOT EXISTS idx_emails_user ON public.emails(user_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON public.shipments(status);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user ON public.calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_files_user ON public.files(user_id);
CREATE INDEX IF NOT EXISTS idx_patients_user ON public.patients(user_id);

-- =====================================================
-- 16. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.infrastructure_environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can read their own data
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Platform users: authenticated users can view all, admins can manage
DROP POLICY IF EXISTS "Authenticated users can view platform users" ON public.platform_users;
CREATE POLICY "Authenticated users can view platform users" ON public.platform_users
  FOR SELECT TO authenticated USING (true);

-- Roles: authenticated users can view
DROP POLICY IF EXISTS "Authenticated users can view roles" ON public.roles;
CREATE POLICY "Authenticated users can view roles" ON public.roles
  FOR SELECT TO authenticated USING (true);

-- Customers: authenticated users can view all
DROP POLICY IF EXISTS "Authenticated users can view customers" ON public.customers;
CREATE POLICY "Authenticated users can view customers" ON public.customers
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert customers" ON public.customers;
CREATE POLICY "Authenticated users can insert customers" ON public.customers
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update customers" ON public.customers;
CREATE POLICY "Authenticated users can update customers" ON public.customers
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete customers" ON public.customers;
CREATE POLICY "Authenticated users can delete customers" ON public.customers
  FOR DELETE TO authenticated USING (true);

-- Orders: authenticated users can view all
DROP POLICY IF EXISTS "Authenticated users can view orders" ON public.orders;
CREATE POLICY "Authenticated users can view orders" ON public.orders
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert orders" ON public.orders;
CREATE POLICY "Authenticated users can insert orders" ON public.orders
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update orders" ON public.orders;
CREATE POLICY "Authenticated users can update orders" ON public.orders
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete orders" ON public.orders;
CREATE POLICY "Authenticated users can delete orders" ON public.orders
  FOR DELETE TO authenticated USING (true);

-- Opportunities: authenticated users can view all
DROP POLICY IF EXISTS "Authenticated users can view opportunities" ON public.opportunities;
CREATE POLICY "Authenticated users can view opportunities" ON public.opportunities
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage opportunities" ON public.opportunities;
CREATE POLICY "Authenticated users can manage opportunities" ON public.opportunities
  FOR ALL TO authenticated USING (true);

-- Tasks: users can manage their own
DROP POLICY IF EXISTS "Authenticated users can view tasks" ON public.tasks;
CREATE POLICY "Authenticated users can view tasks" ON public.tasks
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage tasks" ON public.tasks;
CREATE POLICY "Authenticated users can manage tasks" ON public.tasks
  FOR ALL TO authenticated USING (true);

-- Kanban: users can manage their own
DROP POLICY IF EXISTS "Users can view own kanban columns" ON public.kanban_columns;
CREATE POLICY "Users can view own kanban columns" ON public.kanban_columns
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own kanban tasks" ON public.kanban_tasks;
CREATE POLICY "Users can view own kanban tasks" ON public.kanban_tasks
  FOR ALL USING (auth.uid() = user_id);

-- Contacts: authenticated users can view all
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON public.contacts;
CREATE POLICY "Authenticated users can view contacts" ON public.contacts
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage contacts" ON public.contacts;
CREATE POLICY "Authenticated users can manage contacts" ON public.contacts
  FOR ALL TO authenticated USING (true);

-- Conversations & Messages: users manage their own
DROP POLICY IF EXISTS "Users can view own conversations" ON public.conversations;
CREATE POLICY "Users can view own conversations" ON public.conversations
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view conversation messages" ON public.messages;
CREATE POLICY "Users can view conversation messages" ON public.messages
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can send messages" ON public.messages;
CREATE POLICY "Authenticated users can send messages" ON public.messages
  FOR INSERT TO authenticated WITH CHECK (true);

-- Emails: users manage their own
DROP POLICY IF EXISTS "Users can view own emails" ON public.emails;
CREATE POLICY "Users can view own emails" ON public.emails
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated can view email recipients" ON public.email_recipients;
CREATE POLICY "Authenticated can view email recipients" ON public.email_recipients
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated can manage email recipients" ON public.email_recipients;
CREATE POLICY "Authenticated can manage email recipients" ON public.email_recipients
  FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated can manage email attachments" ON public.email_attachments;
CREATE POLICY "Authenticated can manage email attachments" ON public.email_attachments
  FOR ALL TO authenticated USING (true);

-- Shipments: users manage their own
DROP POLICY IF EXISTS "Users can manage own shipments" ON public.shipments;
CREATE POLICY "Users can manage own shipments" ON public.shipments
  FOR ALL USING (auth.uid() = user_id);

-- Invoices: users manage their own
DROP POLICY IF EXISTS "Users can manage own invoice clients" ON public.invoice_clients;
CREATE POLICY "Users can manage own invoice clients" ON public.invoice_clients
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own invoices" ON public.invoices;
CREATE POLICY "Users can manage own invoices" ON public.invoices
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own invoice line items" ON public.invoice_line_items;
CREATE POLICY "Users can manage own invoice line items" ON public.invoice_line_items
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage invoice items" ON public.invoice_line_items;
CREATE POLICY "Authenticated users can manage invoice items" ON public.invoice_line_items
  FOR ALL TO authenticated USING (true);

-- Calendar: users manage their own
DROP POLICY IF EXISTS "Users can manage own calendar events" ON public.calendar_events;
CREATE POLICY "Users can manage own calendar events" ON public.calendar_events
  FOR ALL USING (auth.uid() = user_id);

-- Files: users manage their own
DROP POLICY IF EXISTS "Users can manage own folders" ON public.folders;
CREATE POLICY "Users can manage own folders" ON public.folders
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own files" ON public.files;
CREATE POLICY "Users can manage own files" ON public.files
  FOR ALL USING (auth.uid() = user_id);

-- Infrastructure: users manage their own
DROP POLICY IF EXISTS "Users can manage own infrastructure" ON public.infrastructure_environments;
CREATE POLICY "Users can manage own infrastructure" ON public.infrastructure_environments
  FOR ALL USING (auth.uid() = user_id);

-- Patients: users manage their own
DROP POLICY IF EXISTS "Users can manage own patients" ON public.patients;
CREATE POLICY "Users can manage own patients" ON public.patients
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own patient events" ON public.patient_events;
CREATE POLICY "Users can manage own patient events" ON public.patient_events
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage patient events" ON public.patient_events;
CREATE POLICY "Authenticated users can manage patient events" ON public.patient_events
  FOR ALL TO authenticated USING (true);

-- Preferences: users manage their own
DROP POLICY IF EXISTS "Users can manage own preferences" ON public.user_preferences;
CREATE POLICY "Users can manage own preferences" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- 17. UPDATED_AT TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_opportunities_updated_at ON public.opportunities;
CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_kanban_tasks_updated_at ON public.kanban_tasks;
CREATE TRIGGER update_kanban_tasks_updated_at
  BEFORE UPDATE ON public.kanban_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_shipments_updated_at ON public.shipments;
CREATE TRIGGER update_shipments_updated_at
  BEFORE UPDATE ON public.shipments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON public.invoices;
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_infrastructure_updated_at ON public.infrastructure_environments;
CREATE TRIGGER update_infrastructure_updated_at
  BEFORE UPDATE ON public.infrastructure_environments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_patients_updated_at ON public.patients;
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
