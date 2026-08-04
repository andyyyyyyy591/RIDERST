-- Ejecutar este SQL en el SQL Editor de tu proyecto Supabase
-- Project → SQL Editor → New query → pegar esto → Run

create table if not exists orders (
  id            uuid primary key default gen_random_uuid(),
  tracking_code text unique not null,
  created_at    date not null,                          -- día 0 del tracking
  customer_name text not null,
  product_type  text not null check (
    product_type in ('motorcycle', 'solar_kit', 'electric_tricycle')
  ),
  model         text not null,
  seller        text not null,
  inserted_at   timestamptz not null default now()     -- cuándo se cargó en el sistema
);

-- Índice para búsqueda por código (ruta /[code])
create index if not exists orders_tracking_code_idx on orders (tracking_code);

-- Row Level Security: cualquiera puede leer, solo anon puede insertar
-- (ajustar según necesidades de autenticación)
alter table orders enable row level security;

create policy "Lectura pública" on orders
  for select using (true);

create policy "Inserción pública" on orders
  for insert with check (true);
