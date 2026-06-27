-- Run this in Supabase SQL Editor to fix blog posts visibility

-- Check if RLS policy exists, drop and recreate
drop policy if exists "anon_read_published" on blog_posts;

create policy "anon_read_published" on blog_posts
  for select
  to anon
  using (status = 'published');

-- Also allow authenticated users (admin) to read all posts
drop policy if exists "auth_read_all" on blog_posts;

create policy "auth_read_all" on blog_posts
  for select
  to authenticated
  using (true);

-- Allow authenticated users to insert/update/delete (for admin panel)
drop policy if exists "auth_write" on blog_posts;

create policy "auth_write" on blog_posts
  for all
  to authenticated
  using (true)
  with check (true);

-- Verify posts exist and are published
select id, title, status, published_at from blog_posts order by published_at desc;
