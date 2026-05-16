-- Supabase Database Schema for TodoExpress

-- 1. PROFILES (Extiende la tabla de usuarios de Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  display_name text,
  role text check (role in ('user', 'admin')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS en profiles
alter table public.profiles enable row level security;

-- Políticas para profiles
create policy "Los usuarios pueden ver su propio perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "Los usuarios pueden actualizar su propio perfil" on public.profiles
  for update using (auth.uid() = id);

create policy "Admins pueden ver todos los perfiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 2. PRODUCTS
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null check (price >= 0),
  image text,
  category text,
  stock integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS en products
alter table public.products enable row level security;

-- Políticas para products
create policy "Cualquiera puede ver productos" on public.products
  for select using (true);

create policy "Solo admins pueden insertar productos" on public.products
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Solo admins pueden actualizar productos" on public.products
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Solo admins pueden eliminar productos" on public.products
  for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 3. BANNERS
create table public.banners (
  id uuid default gen_random_uuid() primary key,
  image text not null,
  mobile_image text,
  link text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.banners enable row level security;
create policy "Cualquiera puede ver banners" on public.banners for select using (true);
create policy "Admins gestionan banners" on public.banners for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 4. MINI BANNERS
create table public.mini_banners (
  id uuid default gen_random_uuid() primary key,
  image text not null,
  title text,
  subtitle text,
  link text,
  color text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.mini_banners enable row level security;
create policy "Cualquiera puede ver mini_banners" on public.mini_banners for select using (true);
create policy "Admins gestionan mini_banners" on public.mini_banners for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- 5. INVOICES (Pedidos)
create table public.invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  total numeric not null,
  status text check (status in ('pending', 'completed', 'cancelled')) default 'pending',
  date timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.invoices enable row level security;

create policy "Usuarios ven sus propias facturas" on public.invoices
  for select using (auth.uid() = user_id);

create policy "Usuarios crean sus propias facturas" on public.invoices
  for insert with check (auth.uid() = user_id);

create policy "Admins ven todas las facturas" on public.invoices
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 6. INVOICE ITEMS (Detalle del pedido)
create table public.invoice_items (
  id uuid default gen_random_uuid() primary key,
  invoice_id uuid references public.invoices on delete cascade not null,
  product_id uuid references public.products,
  product_name text not null,
  quantity integer not null,
  price numeric not null
);

alter table public.invoice_items enable row level security;

create policy "Usuarios ven sus propios items" on public.invoice_items
  for select using (
    exists (
      select 1 from public.invoices 
      where id = invoice_items.invoice_id and user_id = auth.uid()
    )
  );

create policy "Admins ven todos los items" on public.invoice_items
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- FUNCIÓN PARA CREAR PERFIL AUTOMÁTICAMENTE AL REGISTRARSE
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para ejecutar la función
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
