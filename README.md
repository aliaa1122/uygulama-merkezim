# ARKA Studio — ücretsiz uygulama merkezi başlangıç projesi

## İçerik
- Koyu temalı, mobil uyumlu uygulama vitrini
- Android / iOS / Web / Masaüstü filtreleri
- Her uygulama için açıklama, sürüm, rehber metni ve indirme bağlantısı alanı
- Harici indirme bağlantıları için güvenli yeni sekme ayarları

## Kendi bilgilerinle düzenleme
1. `index.html` dosyasında `ARKA Studio` adını, açıklamaları ve destek e-posta adresini değiştir.
2. `apps.js` dosyasını açıp örnek uygulamaları kendi uygulamalarınla değiştir.
3. Uygulama indirme bağlantılarını `links` alanına `https://...` biçiminde ekle.
4. `styles.css` içindeki renkleri ve görünümü dilediğin gibi özelleştir.

## Ücretsiz yayınlama: Cloudflare Pages
1. Bu klasörü bir GitHub deposuna yükle.
2. Cloudflare hesabı açıp Workers & Pages bölümünden Pages projesi oluştur.
3. GitHub deponu bağla.
4. Framework preset: **None**; Build command: boş; Build output directory: `/`.
5. Deploy ile yayınla. Her değişiklikte yeniden dağıtım yapılabilir.

Alternatif: GitHub Pages ile de statik site olarak yayınlayabilirsin.

## Önemli yayınlama notları
- iOS uygulamaları için kullanıcıları App Store veya TestFlight gibi resmi dağıtım sayfalarına yönlendir. Web sitesinden herkese açık şekilde doğrudan iPhone uygulaması dosyası kurdurmak normal dağıtım yöntemi değildir.
- Android APK paylaşacaksan yalnızca kendi imzaladığın, güvenilir ve güncel dosyayı yayınla; sürüm ve izinleri açıkça belirt. Google Play bağlantısı da kullanabilirsin.
- İndirme bağlantılarını yayınlamadan önce test et. Örnek bağlantılar bilerek eklenmedi.
- Gizlilik politikası, kullanım koşulları ve destek sayfalarını uygulamalarının veri toplama davranışına göre ekle.
- Bu başlangıç projesinde uygulama dosyaları barındırılmaz; indirme düğmeleri verdiğin resmi bağlantılara gider.
