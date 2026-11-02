# ⚡ VH Sports - High-End Sports E-Commerce & Figma Canvas View (v4.0)
### Kiến Trúc Lead Full-Stack Architect & Senior UI/UX Specialist
**TikTok Shop + Shopee + Lazada Unified Architecture**

Ứng dụng web thương mại điện tử chuyên đồ thể thao cao cấp **VH Sports** (chuyên giày đá banh sân cỏ nhân tạo/tự nhiên, vợt cầu lông, áo đấu CLB Dri-Fit, phụ kiện bảo hộ thể thao) kết hợp hoàn hảo những tinh hoa UI/UX vượt trội nhất từ **TikTok Shop**, **Shopee** và **Lazada**, vận hành linh hoạt giữa 3 chế độ xem: **Web Thật (Edge-to-Edge Responsive)**, **Figma Canvas View (8 Artboards)** và **Interactive Prototype**.

---

## 🚀 1. HƯỚNG DẪN DEPLOY WEB ONLINE (ĐỂ AI Ở ĐÂU CŨNG TRUY CẬP ĐƯỢC)

Dự án được đóng gói sẵn sàng 100% cho mọi nền tảng Cloud hiện đại:

### A. Deploy lên Vercel (Khuyên dùng • Miễn phí)
File [`vercel.json`](file:///d:/ANTIGRAVITY%20FILE/VH%20Sports/vercel.json) đã được cấu hình sẵn SPA Rewrites và Security Headers:
```bash
# Cài đặt Vercel CLI (nếu chưa có) và deploy
npm i -g vercel
vercel --prod
```
*Hoặc chỉ cần Push mã nguồn lên GitHub/GitLab rồi import dự án tại [vercel.com](https://vercel.com) — trang web sẽ trực tuyến trong 30 giây.*

### B. Deploy lên Netlify (Kéo - Thả trong 3 giây)
File [`_redirects`](file:///d:/ANTIGRAVITY%20FILE/VH%20Sports/_redirects) đã cấu hình chuẩn SPA routing `/* /index.html 200`:
1. Truy cập [app.netlify.com/drop](https://app.netlify.com/drop).
2. Kéo toàn bộ thư mục `VH Sports` thả vào trình duyệt.
3. Nhận ngay đường link `https://vhsports-xxx.netlify.app` chia sẻ cho mọi người.

### C. Deploy lên Cloudflare Pages
1. Kết nối repository Git tại Cloudflare Dashboard.
2. Thiết lập: **Framework preset:** `None`, **Build output directory:** `./`.

### D. Truy cập mạng nội bộ Wi-Fi (Điện thoại & Máy tính cùng mạng)
Server Python [`server.py`](file:///d:/ANTIGRAVITY%20FILE/VH%20Sports/server.py) và Vite [`vite.config.ts`](file:///d:/ANTIGRAVITY%20FILE/VH%20Sports/vite.config.ts) đã mở host `0.0.0.0:3000`:
- **Trên máy tính:** Truy cập [http://localhost:3000](http://localhost:3000) hoặc [http://vhsports.local:3000](http://vhsports.local:3000)
- **Trên điện thoại iPhone / Android:** Kết nối cùng Wi-Fi với máy tính và mở trình duyệt gõ:
  `http://<IP_MÁY_TÍNH>:3000` *(Ví dụ: `http://192.168.1.15:3000`)*
- **Cấu hình tên miền máy tính (1 dòng duy nhất):** Thêm vào file `C:\Windows\System32\drivers\etc\hosts`:
  ```text
  127.0.0.1 vhsports.local
  ```

---

## 📱 2. TRẢI NGHIỆM ĐA NỀN TẢNG (EDGE-TO-EDGE & PWA)

- **Chuẩn Progressive Web App (PWA):**
  - Đã tích hợp [`manifest.json`](file:///d:/ANTIGRAVITY%20FILE/VH%20Sports/manifest.json) với `display: standalone`, `theme_color: #FF6600`.
  - **Trên iPhone (Safari):** Bấm nút **Chia sẻ** (icon vuông có mũi tên lên) ➡️ Chọn **"Thêm vào MH chính" (Add to Home Screen)** để mở app toàn màn hình không có thanh địa chỉ Safari, hỗ trợ tai thỏ / Dynamic Island và thanh vuốt Home indicator.
  - **Trên Android (Chrome):** Bấm Menu 3 chấm ➡️ Chọn **"Cài đặt ứng dụng"** (Install App).
- **Giao diện Responsive linh hoạt:**
  - **Điện thoại:** Layout Edge-to-Edge tràn viền sắc nét, lướt ngang mượt mà, thanh điều hướng đáy kính mờ (Frosted Glass).
  - **Laptop / Desktop:** Tự động mở rộng thành cổng thương mại điện tử chuyên nghiệp (Mega-Header, thanh thông báo khuyến mãi, lưới sản phẩm 4-5 cột, thanh toán 2 cột rộng rãi).

---

## 🛍️ 3. TINH HOA UI/UX: TIKTOK SHOP + SHOPEE + LAZADA

### 🎬 A. Tinh hoa TikTok Shop (Video Shorts & Livestream)
- **Dải video ngắn review đồ thể thao:** Trải nghiệm video sắc nét, hiển thị nhãn `🔴 LIVE` nhấp nháy đỏ theo thời gian thực và số lượt xem trực tiếp.
- **Nút "Giỏ hàng màu vàng" (#FFC700) ghim trực tiếp:** 
  - Đặt trực tiếp dưới chân từng video card với giá sản phẩm rõ ràng: `[ 🛒 2.450.000₫ • Mua ]`.
  - Bấm vào nút vàng sẽ **mở ngay Bottom Sheet / Modal chọn Size AI** cho sản phẩm đó, chốt đơn lập tức mà không cần qua nhiều bước trung gian.

### ⚡ B. Tinh hoa Shopee (Flash Sale & Voucher Hub)
- **Banner Flash Sale đếm ngược thời gian thực:**
  - Đồng hồ đếm ngược giờ vàng định dạng `HH : MM : SS` nhảy số từng giây.
  - Thẻ sản phẩm giảm giá cực sốc (`-32%`, `-20%`, `-50%`, `-44%`).
  - Thanh tiến độ năng động: `"🔥 SẮP CHÁY HÀNG"` hoặc `"ĐÃ BÁN 88%"` với ngọn lửa cam rực rỡ.
  - Nút viên thuốc `Chọn size & Mua` thao tác tức thì.
- **Kho Voucher Thể Thao Shopee (Lưu mã tự động):**
  - Danh sách mã giảm giá: `SPORT50K` (Giảm 50k), `FREESHIP` (Miễn phí vận chuyển toàn quốc), `HOANXU10` (Hoàn xu 10%), `VIP200K` (Giảm 200k).
  - Nút **"Lưu mã"** chuyển sang **"✓ Đã lưu"** màu xanh ngọc bích, tự động đồng bộ vào ví voucher cá nhân và trừ trực tiếp vào hóa đơn khi thanh toán.

### 🛡️ C. Tinh hoa Lazada (VH-Mall & Thanh toán 1-chạm)
- **Dải cam kết VH-Mall Chính Hãng:** Thiết kế sang trọng, tối giản, thanh lịch (`100% Chính Hãng • Hoàn tiền 200% nếu hàng giả • Đổi trả 30 ngày • Giao nhanh 2h`).
- **Thanh toán 2 cột trên Desktop:** Tối ưu hóa tỷ lệ chuyển đổi, hiển thị song song sổ địa chỉ, danh sách món hàng và bảng đối soát chi phí.
- **Cổng thanh toán VietQR / MoMo:** Mã QR động công nghệ laser scanner, đếm ngược 15:00, sao chép 1 chạm số tài khoản và nội dung chuyển khoản, kiểm tra đối soát tự động trong 3 giây.

---

## 🧠 4. BỘ TÍNH SIZE THÔNG MINH (AI SIZE FINDER)

Trong popup chọn kích cỡ, người dùng có thể kích hoạt công cụ tư vấn size tự động:
- **Thanh trượt Chiều cao:** 150 cm - 195 cm.
- **Thanh trượt Cân nặng:** 45 kg - 100 kg.
- **Tùy chọn Form bàn chân (đối với giày đá banh):** `🦶 Form thon gọn` hoặc `🦶 Bè nhiều (+1 size)`.
- **Thuật toán thông minh:**
  - Tự động tính size đề xuất (Ví dụ: Giày size 42, Áo đấu size L, Vợt 4U-G5 trợ lực).
  - Tự động đánh dấu active vào size gợi ý.
  - Giải thích trực quan: *"💡 Gợi ý chuẩn: Size 42 (Chiều cao 172cm + Chân bè tăng 1 size để êm mu bàn chân)"*.

---

## 🎨 5. BA CHẾ ĐỘ TRẢI NGHIỆM ĐỒNG BỘ 100%

Trên thanh công cụ phía trên cùng, bạn có thể chuyển đổi qua lại bất kỳ lúc nào:
1. **🛍️ Web Thật (Edge-to-Edge Responsive):** Chế độ mặc định! Trải nghiệm ứng dụng như một website / app thương mại điện tử thực thụ.
2. **🎨 Figma Canvas (8 Artboard):** Hiển thị không gian làm việc Figma với 8 màn hình cạnh nhau trên nền xám chấm bi, dây nối luồng Prototype tương tác, mini-map định vị và công cụ zoom/pan.
3. **📱 Prototype Player:** Khung mô phỏng iPhone 16 Pro viền kim loại để demo tương tác chạm thực tế.

---

## 📂 6. CẤU TRÚC TỆP DỰ ÁN

```text
d:\ANTIGRAVITY FILE\VH Sports\
├── index.html            # Khung HTML5, PWA meta tags, Tailwind CDN v3.4, React 18 UMD
├── manifest.json         # Cấu hình PWA cài đặt vào màn hình chính điện thoại
├── vercel.json           # Cấu hình deployment Vercel (SPA Rewrites & Security Headers)
├── _redirects            # Cấu hình deployment Netlify & Cloudflare Pages
├── vite.config.ts        # Cấu hình Vite host 0.0.0.0, port 3000, allowedHosts
├── server.py             # Server Python 3 HTTP hỗ trợ 0.0.0.0 cho mạng Wi-Fi nội bộ
├── start.bat             # File khởi động nhanh 1-click trên Windows
├── products.js           # Cơ sở dữ liệu: Vouchers, Flash Sales, TikTok Shorts, VH-Mall Products
├── icons.js              # Bộ icon SVG thể thao native: VietQR, MoMo, Visa, MC, TikTok, Shopee
├── artboards.js          # Chi tiết 8 màn hình tương tác thật, SafeImage, SmartSizeSheet
├── figma-components.js   # LiveEdgeToEdgeApp, DeployModal, PwaModal, Toolbar, Wires, MiniMap
└── app.js                # Quản trị State toàn cục, LocalStorage persistence, Router 3 chế độ
```
