-- Supabase Quotation Database Demo
-- PostgreSQL/Supabase-ready schema using fictional construction quotation data.

create extension if not exists "pgcrypto";

-- Stores the main cost buckets used in construction and industrial quotations.
create table if not exists cost_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  is_direct_cost boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table cost_categories is 'Cost buckets such as Materials, Fabrication, Installation, Civil Works, Electrical Work, Logistics, Equipment, Overhead, and Contingency.';
comment on column cost_categories.is_direct_cost is 'Marks whether the category is usually entered as a direct quote line item.';

-- Stores reusable fictional construction material records.
create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references cost_categories(id) on delete restrict,
  name text not null,
  description text,
  unit text not null,
  unit_cost numeric(12, 2) not null check (unit_cost >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint materials_category_name_key unique (category_id, name)
);

comment on table materials is 'Reusable fictional material catalog with units and unit costs.';
comment on column materials.unit_cost is 'Fictional unit cost used for demo quotation calculations.';

-- Stores reusable fictional labor records for work performed by people or crews.
create table if not exists labor_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references cost_categories(id) on delete restrict,
  name text not null,
  description text,
  unit text not null,
  unit_cost numeric(12, 2) not null check (unit_cost >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint labor_items_category_name_key unique (category_id, name)
);

comment on table labor_items is 'Reusable fictional labor items such as installation crew, welding work, and site preparation.';
comment on column labor_items.category_id is 'Connects each labor item to the relevant cost category.';

-- Stores reusable fictional service, logistics, and equipment records.
create table if not exists service_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references cost_categories(id) on delete restrict,
  name text not null,
  description text,
  unit text not null,
  unit_cost numeric(12, 2) not null check (unit_cost >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint service_items_category_name_key unique (category_id, name)
);

comment on table service_items is 'Reusable fictional service, logistics, and equipment items used in construction quotations.';
comment on column service_items.unit is 'Measurement unit such as lot, day, hour, trip, or package.';

-- Stores quote-level information and calculation snapshots.
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  quote_number text not null unique,
  project_name text not null,
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'archived')),
  overhead_percentage numeric(5, 2) not null default 8 check (overhead_percentage >= 0),
  contingency_percentage numeric(5, 2) not null default 5 check (contingency_percentage >= 0),
  margin_percentage numeric(5, 2) not null default 15 check (margin_percentage >= 0),
  direct_cost_subtotal numeric(12, 2) not null default 0 check (direct_cost_subtotal >= 0),
  overhead_amount numeric(12, 2) not null default 0 check (overhead_amount >= 0),
  contingency_amount numeric(12, 2) not null default 0 check (contingency_amount >= 0),
  margin_amount numeric(12, 2) not null default 0 check (margin_amount >= 0),
  total numeric(12, 2) not null default 0 check (total >= 0),
  notes text,
  created_at timestamptz not null default now()
);

comment on table quotes is 'Quotation header records with project name, status, overhead, contingency, margin, and final total.';
comment on column quotes.direct_cost_subtotal is 'Subtotal of direct quote items before overhead, contingency, and margin.';

-- Stores individual quote lines. Costs are copied here as a snapshot.
create table if not exists quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references quotes(id) on delete cascade,
  item_type text not null check (item_type in ('material', 'labor', 'service', 'custom')),
  category_id uuid not null references cost_categories(id) on delete restrict,
  material_id uuid references materials(id) on delete restrict,
  labor_item_id uuid references labor_items(id) on delete restrict,
  service_item_id uuid references service_items(id) on delete restrict,
  item_name text not null,
  description text,
  unit text not null,
  quantity numeric(12, 2) not null check (quantity > 0),
  unit_cost numeric(12, 2) not null check (unit_cost >= 0),
  subtotal numeric(12, 2) generated always as (round(quantity * unit_cost, 2)) stored,
  margin_percentage numeric(5, 2) not null default 0 check (margin_percentage >= 0),
  created_at timestamptz not null default now(),
  constraint quote_items_source_check check (
    (item_type = 'material' and material_id is not null and labor_item_id is null and service_item_id is null)
    or (item_type = 'labor' and labor_item_id is not null and material_id is null and service_item_id is null)
    or (item_type = 'service' and service_item_id is not null and material_id is null and labor_item_id is null)
    or (item_type = 'custom' and material_id is null and labor_item_id is null and service_item_id is null)
  )
);

comment on table quote_items is 'Line items linked to a quote. Each item belongs to a cost category and stores a cost snapshot.';
comment on column quote_items.item_type is 'Identifies whether the line came from materials, labor, services, or a custom entry.';
comment on column quote_items.category_id is 'Cost category used for grouped quotation totals.';
comment on column quote_items.subtotal is 'Generated subtotal before overhead, contingency, and quote-level margin are applied.';
