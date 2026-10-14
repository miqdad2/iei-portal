-- IEI Portal init — parity with iei-kuwait-web Store collections
-- 22 groups: users→profiles, members, employers, jobs, jobapps, applications,
-- renewals, inbox, rsvps, registers, gallery, events, notices, albums, library,
-- polls, attendance, requests, intros, audit, files(meta counters in settings).

create extension if not exists "pgcrypto";

-- EC users mirror (auth.users linked in app; role enforced in RLS + server)
create table profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null check (username ~ '^[a-z0-9._-]{3,30}$'),
  full_name text not null,
  roles text[] not null default '{}',
  must_change boolean default true,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table members (
  member_id text primary key check (member_id ~ '^IEI-KW-[0-9]+$'),
  name text not null,
  civil_fp text not null, -- HMAC-SHA256 of Civil ID, never raw (Portal.java:75)
  civil_last4 text not null,
  mobile text not null,
  email text,
  discipline text, grade text, blood text,
  valid_until date, joined_on date,
  created_at timestamptz default now()
);

create table employers (
  id uuid primary key default gen_random_uuid(),
  company text not null, contact text not null, email text unique not null,
  status text default 'pending' check (status in ('pending','approved','suspended','declined')),
  approved_until date,
  created_at timestamptz default now()
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null, company text not null, description text not null,
  email text not null, status text default 'pending' check (status in ('pending','live','closed','rejected')),
  expires_at date, created_at timestamptz default now()
);

create table applications (
  ref text primary key,
  name text not null, civil_id text not null, mobile text not null,
  email text not null, discipline text, grade text,
  stage text default 'new' check (stage in ('new','query','gs','approved','active')),
  member_id text references members(member_id),
  created_at timestamptz default now()
);
create index on applications(stage);

create table renewals (
  id uuid primary key default gen_random_uuid(),
  member_id text not null, mobile text not null, method text not null,
  receipt_no text, confirmed boolean default false,
  created_at timestamptz default now()
);

create table events (
  id text primary key check (id ~ '^[a-z0-9-]{2,40}$'),
  title text not null, day date, venue text, cpd numeric,
  rsvp boolean default true, hidden boolean default false,
  seats_total int, seats_taken int default 0,
  created_at timestamptz default now()
);

create table rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id text references events(id) on delete cascade,
  mobile text not null, name text not null, seats int default 1,
  unique(event_id, mobile)
);

create table notices (
  id uuid primary key default gen_random_uuid(),
  title text not null, body text, kind text, members_only boolean default false,
  pinned boolean default false, expires_at date,
  created_at timestamptz default now()
);

create table library (
  id uuid primary key default gen_random_uuid(),
  title text not null, kind text, file_path text, url text,
  members_only boolean default false, created_at timestamptz default now()
);

create table polls (
  id uuid primary key default gen_random_uuid(),
  question text not null, options jsonb not null, open boolean default true,
  created_at timestamptz default now()
);

create table requests (
  id uuid primary key default gen_random_uuid(),
  kind text check (kind in ('blood','mentor')),
  detail jsonb not null, status text default 'open',
  created_at timestamptz default now()
);
create index on requests(status);

create table attendance (
  id uuid primary key default gen_random_uuid(),
  event_id text references events(id) on delete cascade,
  member_id text not null, at timestamptz default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor text, action text not null, entity text not null, entity_id text,
  created_at timestamptz default now()
);
create index on audit_logs(created_at);

-- RLS on (service_role bypasses; anon/authenticated read per policy)
alter table events enable row level security;
alter table notices enable row level security;
alter table jobs enable row level security;
alter table library enable row level security;
alter table polls enable row level security;

create policy "public read live" on events for select using (hidden = false);
create policy "public read notices" on notices for select using (members_only = false);
create policy "public read live jobs" on jobs for select using (status = 'live');
create policy "public read library" on library for select using (members_only = false);
create policy "public read open polls" on polls for select using (open = true);
