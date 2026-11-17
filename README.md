# KODORA v3 — Daha sade tasarım ve uygulama detay sayfaları

## Neler değişti?
- Ana sayfa sadeleştirildi; uygulama kartlarında yalnızca temel bilgiler var.
- Her uygulamanın kendine ait detay sayfası bulunuyor (`#app/uygulama-adi`).
- Detay sayfasında açıklama, indirme bağlantısı, kurulum rehberi, güncelleme notları ve yorumlar gösteriliyor.
- Arama ve platform filtreleri eklendi.
- Var olan admin paneli korundu; admin uygulama ekleyebilir, düzenleyebilir, yayınlayabilir ve silebilir.

## Supabase bağlantısı
1. `config.js` dosyasını aç.
2. `PUBLISHABLE_KEY_BURAYA` metnini kendi `sb_publishable_...` anahtarınla değiştir.
3. `service_role`, `sb_secret_...` veya başka bir gizli anahtarı tarayıcı koduna koyma.

Project URL önceden girilmiştir.

## Yayına alma
GitHub'daki `uygulama-merkezim` deposunun ana dizinindeki şu dosyaları bu pakettekilerle değiştir:
- `index.html`
- `styles.css`
- `script.js`
- `config.js`

Commit yapınca Cloudflare Pages yeniden dağıtım yapar. Build komutu boş, output directory `.` kalabilir.

## Veritabanı
Önceki sürümde kurduğun `profiles`, `apps`, `comments` tablolarını ve RLS politikalarını kullanır. SQL kurulumunu tekrar çalıştırma.

## Not
Bu sürümde uygulama detay sayfaları tek sayfalı site içinde hash yönlendirmesiyle açılır; ayrıca her uygulama için ayrı HTML dosyası oluşturman gerekmez.
