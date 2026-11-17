# KODORA v4 — Sade tasarım, uygulama sayfaları ve görsel yükleme

## Bu sürüm
- Sade koyu tema ve mor KODORA sembolü (SVG logo).
- Her uygulama için ayrı detay görünümü.
- Admin panelinden uygulama simgesi ve kapak görseli yükleme.
- Görseller Supabase Storage `app-media` bucket'ında tutulur.

## 1) Veritabanı güncellemesi
Supabase → SQL Editor → New query bölümünde aşağıdaki SQL'i bir kez çalıştır:

```sql
alter table public.apps add column if not exists icon_url text;
alter table public.apps add column if not exists cover_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('app-media', 'app-media', true, 3145728, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 3145728, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view KODORA app media" on storage.objects;
create policy "Public can view KODORA app media" on storage.objects
for select using (bucket_id = 'app-media');

drop policy if exists "KODORA admins upload app media" on storage.objects;
create policy "KODORA admins upload app media" on storage.objects
for insert to authenticated with check (bucket_id = 'app-media' and (select public.is_admin()));

drop policy if exists "KODORA admins update app media" on storage.objects;
create policy "KODORA admins update app media" on storage.objects
for update to authenticated using (bucket_id = 'app-media' and (select public.is_admin()))
with check (bucket_id = 'app-media' and (select public.is_admin()));

drop policy if exists "KODORA admins delete app media" on storage.objects;
create policy "KODORA admins delete app media" on storage.objects
for delete to authenticated using (bucket_id = 'app-media' and (select public.is_admin()));
```

Bu SQL mevcut uygulama/yorum verilerini silmez. Bucket public olduğu için görseller herkesçe görüntülenebilir; yükleme/değiştirme/silme yalnızca admin içindir.

## 2) Supabase anahtarı
`config.js` içinde `PUBLISHABLE_KEY_BURAYA` yerine kendi `sb_publishable_...` anahtarını koy. `service_role` veya `sb_secret_...` anahtarlarını asla tarayıcıya koyma.

## 3) GitHub / Cloudflare
ZIP'i aç. İçindeki `index.html`, `styles.css`, `script.js`, `config.js` ve `README.md` dosyalarını GitHub deposunun ana dizinine yükleyip eskilerinin üzerine yaz. `config.js` içindeki Project URL önceden ayarlı. Commit sonrası Cloudflare Pages otomatik dağıtım yapar.

## 4) Görsel ekleme
Kurucu admin hesabıyla giriş yap. Yönetim bölümünde uygulama simgesi ve kapak görseli seç. Her görsel en fazla 3 MB olmalı.

## Güvenlik
Admin rolü istemci tarafında atanamaz. Rol kontrolü Supabase RLS ve `public.is_admin()` fonksiyonuyla yapılır. Admin rolünü yalnızca Supabase SQL Editor üzerinden güvenilir proje sahibi değiştirmelidir.
