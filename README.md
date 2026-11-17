# KODORA v2 — Cloudflare Pages + Supabase

## 1) Supabase bağlantısı
1. `config.js` dosyasını aç.
2. `PUBLISHABLE_KEY_BURAYA` metnini kendi `sb_publishable_...` anahtarınla değiştir.
3. Project URL zaten projene göre doldurulmuştur.
4. `service_role`, `secret` veya `sb_secret_...` anahtarını asla tarayıcı koduna koyma.

## 2) Mevcut Supabase SQL şeması
Bu sürüm, önceki kurulumda oluşturduğun `profiles`, `apps`, `comments` tablolarını ve `is_admin()` fonksiyonunu kullanır. SQL kurulumunu tekrar çalıştırma.

## 3) Cloudflare Pages'e yükleme
1. GitHub'daki `uygulama-merkezim` deposunu aç.
2. Eski site dosyalarının yedeğini al.
3. Bu klasördeki `index.html`, `styles.css`, `script.js`, `config.js` dosyalarını depo köküne yükleyip eskilerinin yerine koy.
4. Commit yap. Cloudflare Pages otomatik yeniden dağıtım yapacaktır.

Build ayarları: Framework preset `None`, Build command boş, Build output directory `.`.

## 4) Önemli güvenlik notları
- Publishable key tarayıcıda kullanılmak üzere tasarlanmıştır. Veritabanı güvenliği RLS politikalarıyla sağlanır.
- `service_role` / secret key'i hiçbir zaman siteye veya GitHub'a koyma.
- Admin rolü yalnızca Supabase SQL Editor gibi güvenilir yönetim kanalından verilmelidir. Sitede admin kayıt ekranı yoktur.
- Admin paneli sadece `profiles.role = 'admin'` olan giriş yapmış kullanıcılara görünür; veritabanı RLS kuralları da işlemleri ayrıca denetler.
- Yorumlarda kullanıcı adı için `profiles` ilişkisi okunur. Eğer Supabase sorgusu ilişkiyi bulamazsa, `comments` sorgusundaki `profiles(display_name)` bölümünü kaldırıp yalnızca `id,user_id,body,created_at` seçebilirsin.
- E-posta doğrulaması açıksa yeni üyeler, Supabase'in gönderdiği doğrulama e-postasını onaylamalıdır.

## 5) Test
- Önce kendi kurucu hesabınla giriş yap. Yönetim paneli görünmeli.
- Bir test uygulaması ekle ve yayınla.
- Çıkış yapıp başka normal kullanıcı hesabıyla giriş yap. Admin paneli görünmemeli.
- Normal kullanıcı uygulamalara yorum yazabilmeli, uygulama ekleyememeli.
