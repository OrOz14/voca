-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────
-- Helper: list org IDs the current user belongs to
-- ─────────────────────────────────────────
create or replace function my_org_ids()
returns setof uuid
language sql
stable
security definer
as $$
  select org_id from org_members where user_id = auth.uid();
$$;

-- ─────────────────────────────────────────
-- organizations
-- ─────────────────────────────────────────
create table organizations (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  plan              text not null default 'free',
  stripe_customer_id text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table organizations enable row level security;

create policy "org_members can view their org"
  on organizations for select
  using (id = any(select my_org_ids()));

create policy "org_members with admin role can update their org"
  on organizations for update
  using (id = any(select my_org_ids()));

-- ─────────────────────────────────────────
-- user_profiles
-- ─────────────────────────────────────────
create table user_profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table user_profiles enable row level security;

create policy "users can view own profile"
  on user_profiles for select
  using (id = auth.uid());

create policy "users can update own profile"
  on user_profiles for update
  using (id = auth.uid());

-- ─────────────────────────────────────────
-- org_members
-- ─────────────────────────────────────────
create table org_members (
  id         uuid primary key default uuid_generate_v4(),
  org_id     uuid not null references organizations(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  unique(org_id, user_id)
);

alter table org_members enable row level security;

create policy "members can view their org members"
  on org_members for select
  using (org_id = any(select my_org_ids()));

create policy "members can view own membership"
  on org_members for select
  using (user_id = auth.uid());

-- ─────────────────────────────────────────
-- templates
-- ─────────────────────────────────────────
create table templates (
  id          uuid primary key default uuid_generate_v4(),
  org_id      uuid not null references organizations(id) on delete cascade,
  name        text not null,
  description text,
  fields      jsonb not null default '[]',
  created_by  uuid references auth.users(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table templates enable row level security;

create policy "org members can view templates"
  on templates for select
  using (org_id = any(select my_org_ids()));

create policy "org members can insert templates"
  on templates for insert
  with check (org_id = any(select my_org_ids()));

create policy "org members can update templates"
  on templates for update
  using (org_id = any(select my_org_ids()));

create policy "org members can delete templates"
  on templates for delete
  using (org_id = any(select my_org_ids()));

-- ─────────────────────────────────────────
-- sessions
-- ─────────────────────────────────────────
create table sessions (
  id          uuid primary key default uuid_generate_v4(),
  org_id      uuid not null references organizations(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  template_id uuid references templates(id) on delete set null,
  status      text not null default 'active' check (status in ('active', 'completed', 'archived')),
  title       text,
  form_data   jsonb not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table sessions enable row level security;

create policy "org members can view sessions"
  on sessions for select
  using (org_id = any(select my_org_ids()));

create policy "org members can insert sessions"
  on sessions for insert
  with check (org_id = any(select my_org_ids()) and user_id = auth.uid());

create policy "org members can update sessions"
  on sessions for update
  using (org_id = any(select my_org_ids()) and user_id = auth.uid());

create policy "org members can delete sessions"
  on sessions for delete
  using (org_id = any(select my_org_ids()) and user_id = auth.uid());

-- ─────────────────────────────────────────
-- messages
-- ─────────────────────────────────────────
create table messages (
  id         uuid primary key default uuid_generate_v4(),
  session_id uuid not null references sessions(id) on delete cascade,
  role       text not null check (role in ('user', 'assistant', 'system')),
  content    text not null,
  metadata   jsonb,
  created_at timestamptz not null default now()
);

alter table messages enable row level security;

create policy "org members can view messages via session"
  on messages for select
  using (
    exists (
      select 1 from sessions s
      where s.id = session_id
        and s.org_id = any(select my_org_ids())
    )
  );

create policy "org members can insert messages via session"
  on messages for insert
  with check (
    exists (
      select 1 from sessions s
      where s.id = session_id
        and s.org_id = any(select my_org_ids())
    )
  );

-- ─────────────────────────────────────────
-- documents
-- ─────────────────────────────────────────
create table documents (
  id           uuid primary key default uuid_generate_v4(),
  org_id       uuid not null references organizations(id) on delete cascade,
  session_id   uuid references sessions(id) on delete set null,
  uploaded_by  uuid references auth.users(id),
  name         text not null,
  storage_path text not null,
  mime_type    text,
  size_bytes   bigint,
  created_at   timestamptz not null default now()
);

alter table documents enable row level security;

create policy "org members can view documents"
  on documents for select
  using (org_id = any(select my_org_ids()));

create policy "org members can insert documents"
  on documents for insert
  with check (org_id = any(select my_org_ids()) and uploaded_by = auth.uid());

create policy "org members can delete documents"
  on documents for delete
  using (org_id = any(select my_org_ids()) and uploaded_by = auth.uid());

-- ─────────────────────────────────────────
-- usage_events
-- ─────────────────────────────────────────
create table usage_events (
  id          uuid primary key default uuid_generate_v4(),
  org_id      uuid not null references organizations(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  event_type  text not null,
  metadata    jsonb,
  created_at  timestamptz not null default now()
);

alter table usage_events enable row level security;

create policy "org members can view usage events"
  on usage_events for select
  using (org_id = any(select my_org_ids()));

create policy "org members can insert usage events"
  on usage_events for insert
  with check (org_id = any(select my_org_ids()) and user_id = auth.uid());

-- ─────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────
create index idx_org_members_user_id on org_members(user_id);
create index idx_org_members_org_id on org_members(org_id);
create index idx_templates_org_id on templates(org_id);
create index idx_sessions_org_id on sessions(org_id);
create index idx_sessions_user_id on sessions(user_id);
create index idx_sessions_template_id on sessions(template_id);
create index idx_messages_session_id on messages(session_id);
create index idx_documents_org_id on documents(org_id);
create index idx_documents_session_id on documents(session_id);
create index idx_usage_events_org_id on usage_events(org_id);
create index idx_usage_events_user_id on usage_events(user_id);
create index idx_usage_events_created_at on usage_events(created_at desc);

-- ─────────────────────────────────────────
-- Trigger: auto-create user_profile on signup
-- ─────────────────────────────────────────
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
declare
  new_org_id uuid;
begin
  -- Create user profile
  insert into user_profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );

  -- Create a personal organization
  insert into organizations (name)
  values (coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)) || '''s Workspace')
  returning id into new_org_id;

  -- Add user as owner of that organization
  insert into org_members (org_id, user_id, role)
  values (new_org_id, new.id, 'owner');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
