-- Patients table
create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  patient_id text unique not null,  -- auto-generated e.g. DEN-0001
  name text not null,
  phone text not null,
  email text,
  dob date,
  gender text check (gender in ('male','female','other')),
  address text,
  medical_history text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table patients enable row level security;
-- no anon access; only service-role reads/writes from admin routes

-- Invoice line items (embedded as jsonb in invoice for simplicity)
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text unique not null,  -- e.g. INV-0001
  patient_id uuid not null references patients(id) on delete restrict,
  items jsonb not null default '[]',    -- [{description, qty, rate, amount}]
  subtotal numeric(10,2) not null default 0,
  discount numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  notes text,
  status text not null default 'unpaid' check (status in ('unpaid','paid','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table invoices enable row level security;
-- no anon access; only service-role reads/writes from admin routes

-- Auto-increment patient_id function
create or replace function generate_patient_id() returns trigger as $$
declare
  next_num integer;
begin
  select coalesce(max(cast(substring(patient_id from 5) as integer)), 0) + 1
    into next_num from patients;
  new.patient_id := 'DEN-' || lpad(next_num::text, 4, '0');
  return new;
end;
$$ language plpgsql;

create trigger set_patient_id
  before insert on patients
  for each row
  when (new.patient_id is null or new.patient_id = '')
  execute function generate_patient_id();

-- Auto-increment invoice_number function
create or replace function generate_invoice_number() returns trigger as $$
declare
  next_num integer;
begin
  select coalesce(max(cast(substring(invoice_number from 5) as integer)), 0) + 1
    into next_num from invoices;
  new.invoice_number := 'INV-' || lpad(next_num::text, 4, '0');
  return new;
end;
$$ language plpgsql;

create trigger set_invoice_number
  before insert on invoices
  for each row
  when (new.invoice_number is null or new.invoice_number = '')
  execute function generate_invoice_number();
