-- ─────────────────────────────────────────────────────────────────────────────
-- partner_materials
-- Files / links that admins upload for partners to download and share.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.partner_materials (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  description  text,
  file_url     text        not null,
  category     text        not null default 'marketing'
                           check (category in ('marketing', 'knowledge')),
  is_active    boolean     not null default true,
  sort_order   integer     not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- RLS
alter table public.partner_materials enable row level security;

-- Admins can do everything
create policy "Admins manage materials"
  on public.partner_materials
  for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Authenticated partners can read active materials
create policy "Partners read active materials"
  on public.partner_materials
  for select
  to authenticated
  using (is_active = true);

-- updated_at trigger (reuse function if it already exists)
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists partner_materials_updated_at on public.partner_materials;
create trigger partner_materials_updated_at
  before update on public.partner_materials
  for each row execute function public.set_updated_at();
