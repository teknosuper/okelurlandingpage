# Landing Page LAPOR Pak Lur

Landing page statis ini dibuat untuk layanan digital resmi `LAPOR Pak Lur` Desa Ketitang Lor dan siap dideploy ke Cloudflare Pages tanpa framework tambahan.

## Struktur

- `index.html`
- `styles.css`
- `script.js`

## Deploy ke Cloudflare Pages

1. Push folder ini ke repository GitHub atau GitLab.
2. Buka Cloudflare Dashboard.
3. Masuk ke `Workers & Pages` lalu pilih `Create application`.
4. Pilih `Pages` lalu hubungkan repository Anda.
5. Gunakan pengaturan berikut:
   - Framework preset: `None`
   - Build command: kosongkan
   - Build output directory: `/`
6. Deploy.

## Pengembangan lokal

Karena ini situs statis, file `index.html` bisa langsung dibuka di browser atau dijalankan dengan server sederhana sesuai kebutuhan.
