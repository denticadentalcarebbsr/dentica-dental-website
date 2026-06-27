-- Dentica – Initial schema

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service text,
  preferred_window text,
  message text,
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

alter table inquiries enable row level security;

-- Anon can only insert (submit inquiry form). Cannot read, update, or delete.
create policy "anon_insert_only" on inquiries
  for insert to anon
  with check (true);

-- ──────────────────────────────────────────

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  meta_title text,
  meta_description text,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table blog_posts enable row level security;

-- Public can read published posts (for blog page + SEO)
create policy "anon_read_published" on blog_posts
  for select to anon
  using (status = 'published');

-- ──────────────────────────────────────────

create table notification_log (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid references inquiries(id) on delete cascade,
  channel text not null check (channel in ('patient_ack','doctor_notify')),
  status text not null check (status in ('sent','failed')),
  error text,
  created_at timestamptz not null default now()
);

alter table notification_log enable row level security;
-- No anon policy → fully locked. Only service-role key can access.
