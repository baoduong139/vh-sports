// VH Sports - Master E-Commerce Data (TikTok Shop + Shopee + Lazada Architecture v4.0)
window.VH_DATA = {
  // Thông tin người dùng mẫu & Hạng thành viên
  userProfile: {
    name: 'Nguyễn Văn Dương',
    phone: '0988 123 456',
    email: 'duong.vh@vhsports.vn',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    tier: 'VIP Kim Cương',
    points: 2450,
    memberSince: 'Tháng 03/2024'
  },

  // Sổ địa chỉ giao hàng linh hoạt (Lazada Style)
  initialAddresses: [
    {
      id: 'addr_1',
      label: 'Nhà riêng',
      recipient: 'Nguyễn Văn Dương',
      phone: '0988 123 456',
      street: 'Số 18, Đường Lê Lợi',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1, TP. Hồ Chí Minh',
      isDefault: true
    },
    {
      id: 'addr_2',
      label: 'Văn phòng',
      recipient: 'Nguyễn Văn Dương',
      phone: '0909 888 999',
      street: 'Tầng 12, Tòa nhà Bitexco, 2 Hải Triều',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1, TP. Hồ Chí Minh',
      isDefault: false
    },
    {
      id: 'addr_3',
      label: 'Sân bóng VH Club',
      recipient: 'Dương (Đội trưởng)',
      phone: '0988 123 456',
      street: 'Sân bóng Chuyên Việt, 206/4 Đào Duy Anh',
      ward: 'Phường 9',
      district: 'Quận Phú Nhuận, TP. Hồ Chí Minh',
      isDefault: false
    }
  ],

  // Voucher Shopee Style (Lưu mã tự động)
  vouchers: [
    {
      code: 'SPORT50K',
      title: 'Giảm 50.000₫',
      subtitle: 'Đơn từ 500k',
      discountAmount: 50000,
      minOrder: 500000,
      type: 'fixed',
      color: 'from-orange-500 to-amber-500',
      badge: 'Bán chạy'
    },
    {
      code: 'FREESHIP',
      title: 'Freeship 30k',
      subtitle: 'Toàn quốc',
      freeShipping: true,
      discountAmount: 30000,
      minOrder: 0,
      type: 'shipping',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Hot'
    },
    {
      code: 'HOANXU10',
      title: 'Hoàn Xu 10%',
      subtitle: 'Tối đa 100k',
      discountPercent: 10,
      maxDiscount: 100000,
      minOrder: 300000,
      type: 'percent',
      color: 'from-purple-600 to-indigo-600',
      badge: 'Thành viên'
    },
    {
      code: 'VIP200K',
      title: 'Giảm 200.000₫',
      subtitle: 'Đơn từ 2 triệu',
      discountAmount: 200000,
      minOrder: 2000000,
      type: 'fixed',
      color: 'from-blue-600 to-cyan-600',
      badge: 'VIP Kim Cương'
    }
  ],

  // Sản phẩm Flash Sale Thể Thao Đếm Ngược (Shopee Style)
  flashSales: [
    {
      id: 'fs1',
      name: 'Giày Đá Banh Nike Mercurial Vapor 16 Pro TF',
      price: 2190000,
      originalPrice: 3200000,
      discount: '-32%',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80',
      soldPercent: 88,
      stockLeft: 6,
      category: 'football',
      brand: 'Nike',
      type: 'shoe',
      availableSizes: ['39', '40', '41', '42', '43', '44'],
      defaultSize: '41',
      availableColors: ['Xanh Electric', 'Cam Neon'],
      defaultColor: 'Xanh Electric'
    },
    {
      id: 'fs2',
      name: 'Vợt Cầu Lông Yonex Astrox 88D Pro 2026',
      price: 3590000,
      originalPrice: 4500000,
      discount: '-20%',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
      soldPercent: 94,
      stockLeft: 3,
      category: 'badminton',
      brand: 'Yonex',
      type: 'racket',
      availableSizes: ['3U-G5', '4U-G5'],
      defaultSize: '4U-G5',
      availableColors: ['Đen Đỏ Cam'],
      defaultColor: 'Đen Đỏ Cam'
    },
    {
      id: 'fs3',
      name: 'Băng Đầu Gối Trợ Lực Thể Thao 3D Pro-Fit',
      price: 210000,
      originalPrice: 420000,
      discount: '-50%',
      image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=600&auto=format&fit=crop&q=80',
      soldPercent: 78,
      stockLeft: 12,
      category: 'protection',
      brand: 'Mizuno',
      type: 'gear',
      availableSizes: ['M (50-65kg)', 'L (65-80kg)', 'XL (>80kg)'],
      defaultSize: 'L (65-80kg)',
      availableColors: ['Đen Viền Cam'],
      defaultColor: 'Đen Viền Cam'
    },
    {
      id: 'fs4',
      name: 'Áo Đấu CLB Real Madrid Home 2026 Heat.Rdy',
      price: 699000,
      originalPrice: 1250000,
      discount: '-44%',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
      soldPercent: 82,
      stockLeft: 9,
      category: 'football',
      brand: 'Adidas',
      type: 'apparel',
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      defaultSize: 'L',
      availableColors: ['Trắng Hoàng Gia'],
      defaultColor: 'Trắng Hoàng Gia'
    }
  ],

  // Shorts Video & Livestream Thể Thao (TikTok Shop Style)
  shorts: [
    {
      id: 1,
      title: 'Review Giày cỏ nhân tạo Nike Mercurial Vapor 16 Pro TF bám sân cực tốt',
      author: 'Reviewer Long Vũ ⚽',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      views: '4.8k',
      isLive: true,
      tag: '🔴 LIVE TEST',
      bgGradient: 'from-orange-600 via-rose-600 to-purple-900',
      pinnedProductId: 'p1',
      pinnedProductName: 'Nike Vapor 16 Pro TF',
      pinnedProductPrice: 2450000
    },
    {
      id: 2,
      title: 'Căng cước Vợt Yonex Astrox 100ZZ lực 11.5kg chuẩn thi đấu',
      author: 'Tuấn Đan Vợt 🏸',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      views: '28.4k',
      isLive: false,
      tag: 'KỸ THUẬT',
      bgGradient: 'from-blue-600 via-indigo-600 to-cyan-800',
      pinnedProductId: 'p2',
      pinnedProductName: 'Yonex Astrox 88D Pro',
      pinnedProductPrice: 3890000
    },
    {
      id: 3,
      title: 'Mẹo xỏ dây giày chạy bộ Pegasus 41 không bao giờ tuột khi thi đấu',
      author: 'Coach Mai Hương 🏃',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      views: '2.1k',
      isLive: true,
      tag: '🔴 LIVE CHẠY',
      bgGradient: 'from-emerald-600 via-teal-700 to-slate-900',
      pinnedProductId: 'p4',
      pinnedProductName: 'Nike Pegasus 41 ReactX',
      pinnedProductPrice: 2850000
    },
    {
      id: 4,
      title: 'Bọc ống đồng sợi Carbon siêu nhẹ chỉ 32 gram bảo vệ va chạm tối đa',
      author: 'VH Sports Lab 🛡️',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
      views: '43.1k',
      isLive: false,
      tag: 'TEST GEAR',
      bgGradient: 'from-amber-600 via-red-600 to-zinc-900',
      pinnedProductId: 'p5',
      pinnedProductName: 'Băng Gối Pro-Fit 3D',
      pinnedProductPrice: 290000
    }
  ],

  // Danh mục bộ môn (Split-View Categories)
  mainCategories: [
    {
      id: 'football',
      name: 'Bóng đá',
      icon: 'Trophy',
      badge: 'Hot',
      desc: 'Giày cỏ nhân tạo TF, áo đấu, bóng & bọc ống đồng',
      count: 24
    },
    {
      id: 'badminton',
      name: 'Cầu lông',
      icon: 'Zap',
      badge: 'Sale',
      desc: 'Vợt thi đấu, giày đế Non-marking, quấn cán & cầu',
      count: 18
    },
    {
      id: 'running',
      name: 'Chạy bộ',
      icon: 'Flame',
      desc: 'Giày marathon, áo phản quang & đai đeo chạy bộ',
      count: 19
    },
    {
      id: 'gym',
      name: 'Gym & Fitness',
      icon: 'Dumbbell',
      desc: 'Đồ tập co giãn 4 chiều, đai gánh tạ, dây kháng lực',
      count: 15
    },
    {
      id: 'basketball',
      name: 'Bóng rổ',
      icon: 'Activity',
      desc: 'Giày cổ cao đệm khí, bóng da Molten thi đấu',
      count: 11
    },
    {
      id: 'protection',
      name: 'Đồ bảo hộ',
      icon: 'ShieldCheck',
      badge: 'Y tế',
      desc: 'Băng trợ lực khớp gối 3D, bọc mắt cá & xịt lạnh',
      count: 16
    }
  ],

  // Danh mục con
  subCategories: {
    football: [
      { id: 'fb_shoes', name: 'Giày đinh TF sân cỏ', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=240&auto=format&fit=crop&q=80', items: '24 mẫu' },
      { id: 'fb_jersey', name: 'Áo đấu CLB 2026', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=240&auto=format&fit=crop&q=80', items: '38 mẫu' },
      { id: 'fb_ball', name: 'Bóng thi đấu FIFA', image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=240&auto=format&fit=crop&q=80', items: '12 mẫu' },
      { id: 'fb_shin', name: 'Bọc ống đồng carbon', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=240&auto=format&fit=crop&q=80', items: '9 mẫu' }
    ],
    badminton: [
      { id: 'bm_racket', name: 'Vợt công thủ toàn diện', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=240&auto=format&fit=crop&q=80', items: '18 cây' },
      { id: 'bm_shoes', name: 'Giày cầu lông trợ lực', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=240&auto=format&fit=crop&q=80', items: '15 đôi' },
      { id: 'bm_shuttle', name: 'Ống cầu lông thi đấu', image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=240&auto=format&fit=crop&q=80', items: '8 loại' },
      { id: 'bm_grip', name: 'Quấn cán thấm mồ hôi', image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=240&auto=format&fit=crop&q=80', items: '14 màu' }
    ],
    running: [
      { id: 'rn_shoes', name: 'Giày chạy bộ đế React', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=240&auto=format&fit=crop&q=80', items: '22 mẫu' },
      { id: 'rn_wear', name: 'Quần short 2 lớp chạy', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=240&auto=format&fit=crop&q=80', items: '16 mẫu' },
      { id: 'rn_belt', name: 'Đai giữ bình nước chạy', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=240&auto=format&fit=crop&q=80', items: '6 mẫu' }
    ],
    gym: [
      { id: 'gm_shirt', name: 'Áo thun BodyFit co giãn', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=240&auto=format&fit=crop&q=80', items: '19 mẫu' },
      { id: 'gm_belt', name: 'Đai lưng gánh tạ da bò', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=240&auto=format&fit=crop&q=80', items: '7 mẫu' },
      { id: 'gm_band', name: 'Bộ dây mini-band kháng lực', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=240&auto=format&fit=crop&q=80', items: '11 bộ' }
    ],
    basketball: [
      { id: 'bb_shoes', name: 'Giày bóng rổ High-Top', image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=240&auto=format&fit=crop&q=80', items: '13 mẫu' },
      { id: 'bb_ball', name: 'Bóng Molten BG5000', image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=240&auto=format&fit=crop&q=80', items: '5 mẫu' }
    ],
    protection: [
      { id: 'pt_knee', name: 'Băng gối trợ lực lò xo 3D', image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=240&auto=format&fit=crop&q=80', items: '8 loại' },
      { id: 'pt_ankle', name: 'Bọc mắt cá chân lật sơ-mi', image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=240&auto=format&fit=crop&q=80', items: '6 loại' },
      { id: 'pt_spray', name: 'Chai xịt lạnh chấn thương', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=240&auto=format&fit=crop&q=80', items: '4 loại' }
    ]
  },

  brands: ['Tất cả', 'Nike', 'Adidas', 'Yonex', 'Mizuno', 'Lining'],

  // Toàn bộ sản phẩm chính hãng VH-Mall
  products: [
    {
      id: 'p1',
      name: 'Giày Đá Banh Nike Mercurial Vapor 16 Pro TF Sân Cỏ',
      category: 'football',
      brand: 'Nike',
      price: 2450000,
      originalPrice: 3200000,
      discount: '-23%',
      rating: 4.9,
      reviews: 1420,
      sold: '1.4k',
      isMall: true,
      qualityTag: 'Chính Hãng',
      type: 'shoe',
      availableSizes: ['39', '40', '41', '42', '43', '44'],
      defaultSize: '41',
      availableColors: ['Xanh Electric', 'Đen Neon', 'Trắng Bạc'],
      defaultColor: 'Xanh Electric',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      desc: 'Đế đinh dăm TF bám sân cao tốc, đệm Air Zoom đàn hồi giảm chấn khớp gối.'
    },
    {
      id: 'p2',
      name: 'Vợt Cầu Lông Yonex Astrox 88D Pro 2026 Chuyên Smash',
      category: 'badminton',
      brand: 'Yonex',
      price: 3890000,
      originalPrice: 4500000,
      discount: '-14%',
      rating: 5.0,
      reviews: 890,
      sold: '890',
      isMall: true,
      qualityTag: 'Cao Cấp',
      type: 'racket',
      availableSizes: ['3U-G5', '4U-G5'],
      defaultSize: '4U-G5',
      availableColors: ['Đen Đỏ Cam', 'Xanh Ngọc'],
      defaultColor: 'Đen Đỏ Cam',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
      desc: 'Công nghệ Rotational Generator gia tăng tốc độ đập cắm sàn cho cầu sau.'
    },
    {
      id: 'p3',
      name: 'Áo Đấu CLB Real Madrid Home 2026 Heat.Rdy Thi Đấu',
      category: 'football',
      brand: 'Adidas',
      price: 890000,
      originalPrice: 1250000,
      discount: '-29%',
      rating: 4.9,
      reviews: 2890,
      sold: '2.8k',
      isMall: true,
      qualityTag: 'Player Issue',
      type: 'apparel',
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      defaultSize: 'L',
      availableColors: ['Trắng Hoàng Gia', 'Đen Thi Đấu'],
      defaultColor: 'Trắng Hoàng Gia',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
      desc: 'Vải dệt kim Heat.Rdy làm mát tức thì, logo ép nhiệt 3D siêu bền.'
    },
    {
      id: 'p4',
      name: 'Giày Chạy Bộ Nike Pegasus 41 Đệm ReactX Siêu Êm',
      category: 'running',
      brand: 'Nike',
      price: 2850000,
      originalPrice: 3500000,
      discount: '-19%',
      rating: 4.8,
      reviews: 1750,
      sold: '1.7k',
      isMall: true,
      qualityTag: 'Marathon 21k',
      type: 'shoe',
      availableSizes: ['39', '40', '41', '42', '43', '44'],
      defaultSize: '42',
      availableColors: ['Đỏ Cam Volt', 'Xanh Than', 'Trắng Tinh'],
      defaultColor: 'Đỏ Cam Volt',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80',
      desc: 'Đệm ReactX trả lực đàn hồi cao hơn 13%, bảo vệ cổ chân trên cự ly dài.'
    },
    {
      id: 'p5',
      name: 'Băng Đầu Gối Trợ Lực Thể Thao 3D Lò Xo Kép Pro-Fit',
      category: 'protection',
      brand: 'Mizuno',
      price: 290000,
      originalPrice: 420000,
      discount: '-31%',
      rating: 4.8,
      reviews: 3410,
      sold: '3.4k',
      isMall: true,
      qualityTag: 'Y Tế Thể Thao',
      type: 'gear',
      availableSizes: ['M (50-65kg)', 'L (65-80kg)', 'XL (>80kg)'],
      defaultSize: 'L (65-80kg)',
      availableColors: ['Đen Viền Cam', 'Xám Bạc'],
      defaultColor: 'Đen Viền Cam',
      image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=600&auto=format&fit=crop&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80',
      desc: 'Đệm silicon bảo vệ xương bánh chè, thanh trợ lực kép 2 bên nâng đỡ khớp.'
    },
    {
      id: 'p6',
      name: 'Quả Bóng Thi Đấu Ngoại Hạng Anh Nike Flight FIFA Quality',
      category: 'football',
      brand: 'Nike',
      price: 1450000,
      originalPrice: 1800000,
      discount: '-19%',
      rating: 4.9,
      reviews: 620,
      sold: '620',
      isMall: true,
      qualityTag: 'FIFA Quality',
      type: 'ball',
      availableSizes: ['Size 5 Tiêu chuẩn'],
      defaultSize: 'Size 5 Tiêu chuẩn',
      availableColors: ['Trắng Cam Volt'],
      defaultColor: 'Trắng Cam Volt',
      image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=600&auto=format&fit=crop&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
      desc: 'Rãnh Aerowsculpt giảm chao đảo quỹ đạo bay 30%, da vân chống trơn.'
    }
  ],

  // Dữ liệu giỏ hàng ban đầu
  initialCart: [
    {
      id: 'p1',
      name: 'Giày Đá Banh Nike Mercurial Vapor 16 Pro TF',
      price: 2450000,
      originalPrice: 3200000,
      size: '41',
      color: 'Xanh Electric',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=240&auto=format&fit=crop&q=80',
      quantity: 1,
      selected: true
    },
    {
      id: 'p5',
      name: 'Băng Đầu Gối Trợ Lực Thể Thao Pro-Fit 3D',
      price: 290000,
      originalPrice: 420000,
      size: 'L (65-80kg)',
      color: 'Đen Viền Cam',
      image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=240&auto=format&fit=crop&q=80',
      quantity: 2,
      selected: true
    }
  ],

  // Danh sách thẻ và ví đã liên kết
  savedMethods: [
    {
      id: 'm1',
      type: 'momo',
      name: 'Ví Điện Tử MoMo',
      details: 'Liên kết SĐT 0988 ••• 456',
      icon: 'momo',
      isDefault: true
    },
    {
      id: 'm2',
      type: 'card',
      brand: 'visa',
      name: 'Thẻ Ghi Nợ Vietcombank Visa',
      details: '•••• •••• •••• 4242 | Hết hạn: 08/28',
      icon: 'visa',
      isDefault: false
    },
    {
      id: 'm3',
      type: 'card',
      brand: 'mastercard',
      name: 'Thẻ Tín Dụng Techcombank MC',
      details: '•••• •••• •••• 8899 | Hết hạn: 11/27',
      icon: 'mastercard',
      isDefault: false
    }
  ],

  // Lịch sử đơn hàng gần đây
  orderHistory: [
    {
      id: 'VH-89241',
      date: '02/11/2026 14:30',
      paymentMethod: 'VietQR Napas 24/7 (MB Bank)',
      total: 3710000,
      status: 'Đang giao hàng (Hỏa tốc 2h)',
      itemsCount: 2,
      summary: 'Giày Nike Vapor 16 Pro TF (Size 41) + Băng gối Pro-Fit'
    },
    {
      id: 'VH-76120',
      date: '28/10/2026 09:15',
      paymentMethod: 'Ví Điện Tử MoMo',
      total: 3890000,
      status: 'Giao thành công',
      itemsCount: 1,
      summary: 'Vợt Cầu Lông Yonex Astrox 88D Pro 2026 (4U-G5)'
    },
    {
      id: 'VH-65019',
      date: '15/10/2026 18:45',
      paymentMethod: 'Thanh toán khi nhận hàng (COD)',
      total: 890000,
      status: 'Giao thành công',
      itemsCount: 1,
      summary: 'Áo Đấu CLB Real Madrid Home 2026 (Size L)'
    }
  ],

  // Sản phẩm gợi ý sau thanh toán
  recommendedProducts: [
    {
      id: 'r1',
      name: 'Vớ Thể Thao Dệt Kim Chống Trượt VH Grip Pro',
      price: 45000,
      originalPrice: 75000,
      image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=300&auto=format&fit=crop&q=80',
      rating: 4.9,
      sold: '15.4k'
    },
    {
      id: 'r2',
      name: 'Bình Nước Thể Thao Giữ Nhiệt 800ml Nhôm Anodize',
      price: 180000,
      originalPrice: 260000,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&auto=format&fit=crop&q=80',
      rating: 4.8,
      sold: '8.2k'
    },
    {
      id: 'r3',
      name: 'Chai Xịt Lạnh Giảm Đau Chấn Thương Cấp Tốc 150ml',
      price: 120000,
      originalPrice: 160000,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80',
      rating: 4.9,
      sold: '9.1k'
    }
  ]
};
