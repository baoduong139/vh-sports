// VH Sports - Complete 8 Upgraded Artboards Implementation (v3.0)
(function() {
  const React = window.React;
  const { useState, useEffect, useRef } = React;
  const h = React.createElement;
  const I = window.VHIcons;

  // Format currency VND
  window.formatVND = function(num) {
    if (typeof num !== 'number') return '0 ₫';
    return num.toLocaleString('vi-VN') + ' ₫';
  };

  // SafeImage Component with Skeleton & Error Fallback
  function SafeImage({ src, alt, fallback, className = '', containerClassName = '' }) {
    const [loaded, setLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const fallbackUrl = fallback || 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500&auto=format&fit=crop&q=80';

    return h('div', {
      className: `relative aspect-square overflow-hidden bg-slate-100 shrink-0 ${containerClassName}`
    },
      !loaded && h('div', {
        className: 'absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse z-0'
      }),
      h('img', {
        src: hasError ? fallbackUrl : (src || fallbackUrl),
        alt: alt || 'Sản phẩm thể thao VH Sports',
        onLoad: () => setLoaded(true),
        onError: () => {
          if (!hasError) setHasError(true);
        },
        className: `w-full h-full object-cover transition-opacity duration-300 relative z-1 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`
      })
    );
  }
  window.SafeImage = SafeImage;

  // Mobile Status Bar
  function MobileStatusBar({ dark = false }) {
    return h('div', {
      className: `w-full px-5 pt-3 pb-2 flex md:hidden items-center justify-between text-xs font-semibold select-none z-20 ${
        dark ? 'text-white' : 'text-slate-900'
      }`
    },
      h('div', { className: 'font-bold tracking-tight text-xs' }, '9:41'),
      h('div', {
        className: 'w-24 h-4 bg-black rounded-full flex items-center justify-center space-x-1.5 shadow-inner'
      },
        h('div', { className: 'w-2 h-2 rounded-full bg-slate-800' }),
        h('div', { className: 'w-1.5 h-1.5 rounded-full bg-blue-900/60' })
      ),
      h('div', { className: 'flex items-center space-x-1.5' },
        h('span', { className: 'text-[10px] tracking-tighter font-mono font-bold' }, '5G'),
        h('div', { className: 'w-4 h-2.5 border border-current rounded-sm p-0.5 flex items-center' },
          h('div', { className: 'h-full w-full bg-current rounded-2xs' })
        )
      )
    );
  }

  // Mobile Home Bar
  function MobileHomeBar({ dark = false }) {
    return h('div', { className: 'w-full py-1.5 flex md:hidden justify-center items-center select-none' },
      h('div', { className: `w-32 h-1 rounded-full ${dark ? 'bg-white/40' : 'bg-slate-300'}` })
    );
  }

  // Frosted Bottom Navigation
  function FrostedBottomNav({ activeTab, onNavigate, cartCount }) {
    return h('div', {
      className: 'md:hidden fixed md:static bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-3 py-1.5 flex justify-around items-center select-none z-20'
    },
      h('button', {
        onClick: () => onNavigate(1),
        className: `flex flex-col items-center py-0.5 ${activeTab === 1 ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`
      },
        h(I.ShoppingBag, { size: 19 }),
        h('span', { className: 'text-[10px] mt-0.5' }, 'Trang chủ')
      ),
      h('button', {
        onClick: () => onNavigate(2),
        className: `flex flex-col items-center py-0.5 ${activeTab === 2 ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`
      },
        h(I.Layers, { size: 19 }),
        h('span', { className: 'text-[10px] mt-0.5' }, 'Danh mục')
      ),
      h('button', {
        onClick: () => onNavigate(3),
        className: `relative flex flex-col items-center py-0.5 ${activeTab === 3 ? 'text-orange-500 font-bold' : 'text-slate-400 hover:text-orange-500'}`
      },
        h(I.ShoppingCart, { size: 19 }),
        cartCount > 0 && h('span', {
          className: 'absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs animate-bounce'
        }, cartCount),
        h('span', { className: 'text-[10px] mt-0.5' }, 'Giỏ hàng')
      ),
      h('button', {
        onClick: () => onNavigate(7),
        className: `flex flex-col items-center py-0.5 ${activeTab === 7 ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`
      },
        h(I.CreditCard, { size: 19 }),
        h('span', { className: 'text-[10px] mt-0.5' }, 'Tài khoản')
      )
    );
  }

  // ==========================================
  // SMART SIZE RECOMMENDER POPUP (Popup Chọn Kích Cỡ & Gợi Ý Tự Động)
  // ==========================================
  function SmartSizeSheet({ product, onClose, onConfirm }) {
    const [chosenSize, setChosenSize] = useState(product.defaultSize || product.availableSizes[0]);
    const [chosenColor, setChosenColor] = useState(product.defaultColor || product.availableColors[0]);
    const [chosenQty, setChosenQty] = useState(1);
    const [showSizeFinder, setShowSizeFinder] = useState(false);

    // Size Finder State
    const [height, setHeight] = useState(172); // cm
    const [weight, setWeight] = useState(65); // kg
    const [footShape, setFootShape] = useState('wide'); // 'normal' | 'wide'
    const [recommendationNote, setRecommendationNote] = useState('');

    // Thuật toán tính size tự động
    const calculateRecommendedSize = (hVal, wVal, fShape) => {
      let rec = chosenSize;
      let note = '';

      if (product.type === 'shoe') {
        // Thuật toán tính size giày đá bóng
        if (hVal <= 165) rec = '39';
        else if (hVal <= 170) rec = '40';
        else if (hVal <= 175) rec = '41';
        else if (hVal <= 180) rec = '42';
        else if (hVal <= 185) rec = '43';
        else rec = '44';

        if (fShape === 'wide') {
          // Chân bè tăng 1 size
          const num = parseInt(rec);
          if (num < 44) rec = String(num + 1);
          note = `💡 Gợi ý chuẩn: Size ${rec} (Chiều cao ${hVal}cm + Chân bè tăng 1 size để êm mu bàn chân)`;
        } else {
          note = `💡 Gợi ý chuẩn: Size ${rec} (Chiều cao ${hVal}cm + Form chân thon ôm sát)`;
        }
      } else if (product.type === 'apparel') {
        // Thuật toán tính size áo quần thi đấu
        if (wVal < 55) rec = 'S';
        else if (wVal <= 65) rec = 'M';
        else if (wVal <= 75) rec = 'L';
        else if (wVal <= 85) rec = 'XL';
        else rec = 'XXL';
        note = `💡 Gợi ý chuẩn: Size ${rec} (Chiều cao ${hVal}cm - Cân nặng ${wVal}kg ôm vừa người)`;
      } else if (product.type === 'racket') {
        rec = wVal >= 70 ? '3U-G5' : '4U-G5';
        note = `💡 Gợi ý chuẩn: ${rec} (${rec === '3U-G5' ? 'Công mạnh, đầm đầu smash' : 'Trợ lực tốt, thủ nhanh'})`;
      }

      setChosenSize(rec);
      setRecommendationNote(note);
    };

    useEffect(() => {
      if (showSizeFinder) {
        calculateRecommendedSize(height, weight, footShape);
      }
    }, [height, weight, footShape, showSizeFinder]);

    return h('div', {
      className: 'absolute inset-0 bg-black/60 backdrop-blur-2xs flex flex-col justify-end z-40 animate-fadeIn'
    },
      h('div', {
        className: 'bg-white rounded-t-3xl p-4 shadow-2xl border-t border-slate-200 max-h-[90%] overflow-y-auto custom-scrollbar'
      },
        // Header Sheet
        h('div', { className: 'flex items-start space-x-3 pb-3 border-b border-slate-100' },
          h(SafeImage, {
            src: product.image,
            alt: product.name,
            fallback: product.fallbackImage,
            containerClassName: 'w-16 h-16 rounded-xl border border-slate-200'
          }),
          h('div', { className: 'flex-1 min-w-0' },
            h('div', { className: 'flex items-center justify-between' },
              h('span', { className: 'font-black text-sm text-[#FF6600]' }, window.formatVND(product.price)),
              h('button', {
                onClick: onClose,
                className: 'p-1 text-slate-400 hover:text-slate-600'
              }, h(I.X, { size: 18 }))
            ),
            h('h4', { className: 'font-bold text-xs text-slate-800 line-clamp-1 mt-0.5' }, product.name),
            h('p', { className: 'text-[10px] text-slate-400' }, `Hãng: ${product.brand} • ${product.qualityTag || 'Chính hãng'}`)
          )
        ),

        // Size Finder Button
        h('div', { className: 'pt-2.5' },
          h('button', {
            onClick: () => setShowSizeFinder(!showSizeFinder),
            className: `w-full py-2 px-3 rounded-xl border flex items-center justify-between transition-all text-xs font-bold ${
              showSizeFinder
                ? 'bg-orange-50 border-orange-300 text-orange-700'
                : 'bg-blue-50/70 border-blue-200 text-blue-700 hover:bg-blue-100/60'
            }`
          },
            h('div', { className: 'flex items-center space-x-1.5' },
              h(I.Sparkles, { size: 15, className: 'text-amber-500' }),
              h('span', null, 'Gợi ý kích cỡ chuẩn (Size Finder AI)')
            ),
            h('span', { className: 'text-[10px] underline' }, showSizeFinder ? 'Ẩn bộ tính' : 'Mở tư vấn')
          )
        ),

        // Size Finder Inputs (Slider & Form chân)
        showSizeFinder && h('div', {
          className: 'mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs animate-fadeIn'
        },
          // Chiều cao
          h('div', null,
            h('div', { className: 'flex justify-between text-[11px] font-semibold text-slate-700 mb-1' },
              h('span', null, 'Chiều cao của bạn:'),
              h('span', { className: 'font-bold text-blue-600' }, `${height} cm`)
            ),
            h('input', {
              type: 'range',
              min: 150,
              max: 195,
              value: height,
              onChange: (e) => setHeight(Number(e.target.value)),
              className: 'w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg'
            })
          ),

          // Cân nặng
          h('div', null,
            h('div', { className: 'flex justify-between text-[11px] font-semibold text-slate-700 mb-1' },
              h('span', null, 'Cân nặng của bạn:'),
              h('span', { className: 'font-bold text-blue-600' }, `${weight} kg`)
            ),
            h('input', {
              type: 'range',
              min: 45,
              max: 100,
              value: weight,
              onChange: (e) => setWeight(Number(e.target.value)),
              className: 'w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg'
            })
          ),

          // Tùy chọn form chân (nếu là giày)
          product.type === 'shoe' && h('div', null,
            h('span', { className: 'block text-[11px] font-semibold text-slate-700 mb-1' }, 'Đặc điểm bàn chân:'),
            h('div', { className: 'grid grid-cols-2 gap-2' },
              h('button', {
                onClick: () => setFootShape('normal'),
                className: `py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                  footShape === 'normal' ? 'bg-white border-blue-600 text-blue-700 shadow-2xs' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`
              }, '🦶 Chân thon / chuẩn'),
              h('button', {
                onClick: () => setFootShape('wide'),
                className: `py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                  footShape === 'wide' ? 'bg-white border-orange-500 text-orange-700 shadow-2xs' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`
              }, '🦶 Chân bè (+1 size)')
            )
          ),

          // Recommendation Callout
          recommendationNote && h('div', {
            className: 'p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 font-semibold'
          }, recommendationNote)
        ),

        // Danh Sách Size Trực Quan
        h('div', { className: 'py-3 border-b border-slate-100' },
          h('div', { className: 'flex justify-between items-center mb-2' },
            h('span', { className: 'text-xs font-bold text-slate-800' },
              product.type === 'shoe' ? 'Kích thước giày:' :
              product.type === 'apparel' ? 'Kích cỡ áo:' : 'Phân loại:'
            ),
            h('span', { className: 'text-[11px] text-orange-600 font-extrabold' }, `Đang chọn: ${chosenSize}`)
          ),
          h('div', { className: 'flex flex-wrap gap-2' },
            product.availableSizes.map(sz => h('button', {
              key: sz,
              onClick: () => setChosenSize(sz),
              className: `px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                chosenSize === sz
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm scale-105'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`
            }, sz))
          )
        ),

        // Color Selection
        h('div', { className: 'py-2.5 border-b border-slate-100' },
          h('span', { className: 'block text-xs font-bold text-slate-800 mb-1.5' }, 'Màu sắc:'),
          h('div', { className: 'flex flex-wrap gap-2' },
            product.availableColors.map(c => h('button', {
              key: c,
              onClick: () => setChosenColor(c),
              className: `px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                chosenColor === c
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`
            }, c))
          )
        ),

        // Quantity Stepper
        h('div', { className: 'py-2.5 flex items-center justify-between' },
          h('span', { className: 'text-xs font-bold text-slate-800' }, 'Số lượng mua:'),
          h('div', { className: 'flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50' },
            h('button', {
              onClick: () => setChosenQty(prev => Math.max(1, prev - 1)),
              className: 'w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-600'
            }, h(I.Minus, { size: 12 })),
            h('span', { className: 'w-8 text-center text-xs font-bold text-slate-900' }, chosenQty),
            h('button', {
              onClick: () => setChosenQty(prev => prev + 1),
              className: 'w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-600'
            }, h(I.Plus, { size: 12 }))
          )
        ),

        // Action Button
        h('button', {
          onClick: () => onConfirm({ ...product, size: chosenSize, color: chosenColor, quantity: chosenQty }),
          className: 'w-full py-2.5 bg-[#FF6600] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-full shadow-md shadow-orange-500/20 active:scale-95 transition-all mt-1'
        }, `Xác nhận thêm • ${window.formatVND(product.price * chosenQty)}`)
      )
    );
  }

  // ==========================================
  // VOUCHER HUB BAR (Shopee Style Tự Động Lưu Mã)
  // ==========================================
  function VoucherHubBar({ ctx }) {
    const [savedVouchers, setSavedVouchers] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('vh_saved_voucher_codes') || '["FREESHIP"]');
      } catch (e) {
        return ['FREESHIP'];
      }
    });

    const handleSaveVoucher = (v) => {
      const isSaved = savedVouchers.includes(v.code);
      let updated;
      if (isSaved) {
        updated = savedVouchers.filter(c => c !== v.code);
        ctx.showToast('Đã bỏ lưu mã ' + v.code);
      } else {
        updated = [...savedVouchers, v.code];
        ctx.applyVoucher(v.code);
        ctx.showToast('Đã lưu & áp dụng mã ' + v.code + ': ' + v.title + '!');
      }
      setSavedVouchers(updated);
      try {
        localStorage.setItem('vh_saved_voucher_codes', JSON.stringify(updated));
      } catch (e) {}
    };

    return h('div', { className: 'px-3 py-2 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-y border-orange-100 my-2' },
      h('div', { className: 'flex items-center justify-between mb-1.5' },
        h('div', { className: 'flex items-center space-x-1.5' },
          h(I.Ticket, { size: 14, className: 'text-[#FF6600]' }),
          h('span', { className: 'font-extrabold text-xs text-slate-900 tracking-tight' }, 'Kho Voucher Shopee • Săn Mã Thể Thao'),
          h('span', { className: 'text-[9px] bg-[#FF6600] text-white font-black px-1.5 py-0.2 rounded-full uppercase' }, 'Hot')
        ),
        h('span', {
          onClick: () => ctx.showToast('Đã mở toàn bộ kho voucher VH Sports 2026!'),
          className: 'text-[10px] text-blue-600 font-bold cursor-pointer hover:underline'
        }, 'Xem tất cả')
      ),
      h('div', { className: 'flex space-x-2 overflow-x-auto no-scrollbar pb-1' },
        window.VH_DATA.vouchers.map(v => {
          const isSaved = savedVouchers.includes(v.code);
          return h('div', {
            key: v.code,
            className: 'bg-white rounded-xl border border-orange-200/80 p-2 min-w-[155px] shrink-0 shadow-2xs flex items-center justify-between space-x-2 relative overflow-hidden'
          },
            h('div', { className: 'min-w-0 flex-1' },
              h('div', { className: 'flex items-center space-x-1' },
                h('span', { className: 'font-mono font-black text-[11px] text-[#FF6600]' }, v.code),
                v.badge && h('span', { className: 'text-[8px] bg-red-100 text-red-700 font-bold px-1 rounded' }, v.badge)
              ),
              h('div', { className: 'font-extrabold text-[11px] text-slate-800 truncate leading-tight mt-0.5' }, v.title),
              h('div', { className: 'text-[9px] text-slate-400 truncate' }, v.subtitle)
            ),
            h('button', {
              onClick: () => handleSaveVoucher(v),
              className: 'px-2 py-1 rounded-full text-[10px] font-black transition-all shrink-0 active:scale-90 ' + (
                isSaved
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-[#FF6600] text-white hover:bg-[#EA580C] shadow-xs'
              )
            }, isSaved ? '✓ Đã lưu' : 'Lưu mã')
          );
        })
      )
    );
  }
  window.VoucherHubBar = VoucherHubBar;

  // ==========================================
  // FLASH SALE SECTION (Shopee Style Đếm Ngược)
  // ==========================================
  function FlashSaleSection({ ctx, onOpenSizeSheet }) {
    const [timeLeft, setTimeLeft] = useState(9918);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 10800));
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    const pad = (n) => String(n).padStart(2, '0');

    return h('div', { className: 'px-3 my-2.5' },
      h('div', { className: 'bg-white rounded-2xl border border-orange-200/80 p-3 shadow-xs' },
        // Header
        h('div', { className: 'flex items-center justify-between mb-2.5' },
          h('div', { className: 'flex items-center space-x-1.5' },
            h('div', { className: 'w-6 h-6 rounded-lg bg-[#FF6600] flex items-center justify-center text-white shadow-2xs' },
              h(I.Flame, { size: 14 })
            ),
            h('span', { className: 'font-black text-xs text-[#FF6600] tracking-tight uppercase' }, 'Flash Sale Thể Thao'),
            h('div', { className: 'flex items-center space-x-0.5 text-[10px] font-mono font-bold' },
              h('span', { className: 'bg-slate-900 text-white px-1.5 py-0.5 rounded' }, pad(hours)),
              h('span', { className: 'text-slate-900 font-bold' }, ':'),
              h('span', { className: 'bg-slate-900 text-white px-1.5 py-0.5 rounded' }, pad(minutes)),
              h('span', { className: 'text-slate-900 font-bold' }, ':'),
              h('span', { className: 'bg-[#FF6600] text-white px-1.5 py-0.5 rounded animate-pulse' }, pad(seconds))
            )
          ),
          h('span', {
            onClick: () => ctx.showToast('Đang xem thêm các deal Flash Sale sắp mở bán...'),
            className: 'text-[10px] text-blue-600 font-bold cursor-pointer hover:underline'
          }, 'Xem tất cả >')
        ),

        // Items Horizontal Scroll
        h('div', { className: 'flex space-x-2.5 overflow-x-auto no-scrollbar pb-1' },
          window.VH_DATA.flashSales.map(item => h('div', {
            key: item.id,
            className: 'w-36 bg-slate-50/70 border border-slate-200/70 rounded-xl p-2 shrink-0 flex flex-col justify-between hover:shadow-md transition-all group'
          },
            h('div', null,
              h('div', { className: 'relative rounded-lg overflow-hidden mb-1.5' },
                h(SafeImage, {
                  src: item.image,
                  alt: item.name,
                  containerClassName: 'w-full rounded-lg aspect-square',
                  className: 'group-hover:scale-105 transition-transform duration-300'
                }),
                h('span', {
                  className: 'absolute top-1 right-1 bg-[#FF6600] text-white font-black text-[9px] px-1.5 py-0.2 rounded-full shadow-2xs'
                }, item.discount)
              ),
              h('div', { className: 'font-black text-xs text-[#FF6600]' }, window.formatVND(item.price)),
              h('div', { className: 'text-[9px] text-slate-400 line-through' }, window.formatVND(item.originalPrice)),
              h('h5', { className: 'font-bold text-[10px] text-slate-800 line-clamp-1 leading-tight mt-0.5' }, item.name)
            ),

            // Progress bar & Action
            h('div', { className: 'mt-2' },
              h('div', { className: 'relative w-full h-3.5 bg-orange-100 rounded-full overflow-hidden flex items-center justify-center mb-1.5' },
                h('div', {
                  className: 'absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full',
                  style: { width: `${item.soldPercent}%` }
                }),
                h('span', { className: 'relative z-1 text-[8px] font-black text-white drop-shadow-2xs uppercase tracking-tight' },
                  item.soldPercent >= 90 ? '🔥 SẮP CHÁY HÀNG' : `ĐÃ BÁN ${item.soldPercent}%`
                )
              ),
              h('button', {
                onClick: () => onOpenSizeSheet(item),
                className: 'w-full py-1 bg-[#FF6600] hover:bg-[#EA580C] active:scale-95 text-white font-bold text-[10px] rounded-full flex items-center justify-center space-x-1 shadow-2xs transition-all'
              },
                h(I.ShoppingBag, { size: 10 }),
                h('span', null, 'Chọn size & Mua')
              )
            )
          ))
        )
      )
    );
  }
  window.FlashSaleSection = FlashSaleSection;

  // ==========================================
  // LAZADA VH-MALL AUTHENTIC BANNER
  // ==========================================
  function VHMallTrustBar() {
    return h('div', { className: 'mx-3 mb-2.5 p-2 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl flex items-center justify-between text-[10px] shadow-sm' },
      h('div', { className: 'flex items-center space-x-1.5 font-extrabold' },
        h('span', { className: 'bg-red-600 text-white font-black text-[9px] px-1.5 py-0.2 rounded uppercase' }, 'Mall'),
        h('span', { className: 'tracking-tight text-white' }, 'VH-MALL CHÍNH HÃNG 100%')
      ),
      h('div', { className: 'hidden sm:flex items-center space-x-3 text-slate-300 font-semibold text-[9px]' },
        h('span', null, '🛡️ Hoàn tiền 200% nếu giả'),
        h('span', null, '📦 Đổi trả 30 ngày'),
        h('span', null, '⚡ Giao nhanh 2h')
      ),
      h('span', { className: 'text-amber-400 font-bold text-[9px]' }, 'Bảo hành toàn quốc >')
    );
  }
  window.VHMallTrustBar = VHMallTrustBar;

  // ==========================================
  // ARTBOARD 1: TRANG CHỦ (Home Screen)
  // ==========================================
  function Artboard1Home({ ctx, onNavigate }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProductForSize, setSelectedProductForSize] = useState(null);

    const filtered = window.VH_DATA.products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return h('div', { className: 'w-full h-full flex flex-col bg-slate-50 text-slate-800 overflow-hidden relative' },
      h(MobileStatusBar, null),

      // Header with Logo "VH" clickable to Profile
      h('div', { className: 'px-4 pt-1 pb-3 bg-white border-b border-slate-100 shadow-xs z-10' },
        h('div', { className: 'flex items-center justify-between mb-2.5' },
          // Logo "VH" -> Navigates to Artboard 7 (Profile / Account)
          h('button', {
            title: 'Xem hồ sơ & tài khoản cá nhân',
            onClick: () => onNavigate(7),
            className: 'flex items-center space-x-2 group text-left transition-transform active:scale-95'
          },
            h('div', {
              className: 'w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform'
            }, 'VH'),
            h('div', null,
              h('div', { className: 'font-extrabold text-sm tracking-tight text-slate-900 leading-none group-hover:text-blue-600 transition-colors' }, 'VH SPORTS'),
              h('div', { className: 'text-[10px] font-semibold text-blue-600 tracking-wider uppercase mt-0.5' }, 'Hồ sơ • VIP')
            )
          ),

          // Action Icons
          h('div', { className: 'flex items-center space-x-1.5' },
            h('button', {
              title: 'Tìm kiếm bằng hình ảnh',
              onClick: () => ctx.showToast('📷 Đang mở camera nhận diện mẫu giày & áo đấu...'),
              className: 'p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors'
            }, h(I.Camera, { size: 18 })),
            h('button', {
              title: 'Tư vấn viên trực tuyến',
              onClick: () => ctx.showToast('💬 Đang kết nối tới chuyên viên tư vấn size...'),
              className: 'p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors'
            }, h(I.MessageCircle, { size: 18 })),
            h('button', {
              title: 'Mở giỏ hàng',
              onClick: () => onNavigate(3),
              className: 'relative p-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all active:scale-95'
            },
              h(I.ShoppingCart, { size: 18 }),
              ctx.cartCount > 0 && h('span', {
                className: 'absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs animate-bounce'
              }, ctx.cartCount)
            )
          )
        ),

        // Search Input
        h('div', { className: 'relative flex items-center' },
          h('div', { className: 'absolute left-3 text-slate-400' }, h(I.Search, { size: 15 })),
          h('input', {
            type: 'text',
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: 'Tìm giày cỏ nhân tạo, vợt Yonex, áo Real...',
            className: 'w-full pl-9 pr-10 py-2 bg-slate-100 text-xs rounded-full border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400'
          }),
          searchQuery && h('button', {
            onClick: () => setSearchQuery(''),
            className: 'absolute right-3 text-slate-400 hover:text-slate-600'
          }, h(I.X, { size: 14 }))
        )
      ),

      // Scrollable Content
      h('div', { className: 'flex-1 overflow-y-auto pb-16 custom-scrollbar' },
        // Hero Promo Banner
        h('div', { className: 'p-3' },
          h('div', {
            className: 'bg-gradient-to-r from-blue-700 via-indigo-700 to-orange-600 text-white rounded-2xl p-4 shadow-md relative overflow-hidden'
          },
            h('div', { className: 'relative z-10 max-w-[70%]' },
              h('span', { className: 'inline-block bg-white/20 backdrop-blur-xs text-[9px] font-bold px-2 py-0.5 rounded-full mb-1 tracking-wide' }, 'MÙA GIẢI 2026'),
              h('h3', { className: 'font-black text-sm tracking-tight leading-tight mb-1' }, 'BỨT PHÁ TỐC ĐỘ SÂN CỎ'),
              h('p', { className: 'text-[11px] text-white/90 mb-2' }, 'Giảm tới 35% tất cả giày đinh TF & vợt thi đấu'),
              h('button', {
                onClick: () => onNavigate(2),
                className: 'inline-flex items-center space-x-1 bg-white text-blue-700 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs hover:bg-blue-50 active:scale-95'
              },
                h('span', null, 'Xem danh mục'),
                h(I.ChevronRight, { size: 12 })
              )
            ),
            h('div', { className: 'absolute -right-4 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl' }),
            h('div', { className: 'absolute right-3 top-3 text-white/20' }, h(I.Trophy, { size: 48 }))
          )
        ),

        // Lazada VH-Mall Authentic Banner
        h(VHMallTrustBar, null),

        // Shopee Voucher Hub Bar (Lưu mã tự động)
        h(VoucherHubBar, { ctx }),

        // Shopee Flash Sale Section (Đếm ngược)
        h(FlashSaleSection, {
          ctx,
          onOpenSizeSheet: (item) => setSelectedProductForSize(item)
        }),

        // TikTok Shop Shorts & Livestream Carousel with Yellow Cart Button
        h('div', { className: 'mb-3 px-3' },
          h('div', { className: 'flex items-center justify-between mb-2' },
            h('div', { className: 'flex items-center space-x-1.5' },
              h('span', { className: 'flex h-2 w-2 relative' },
                h('span', { className: 'animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75' }),
                h('span', { className: 'relative inline-flex rounded-full h-2 w-2 bg-red-500' })
              ),
              h('span', { className: 'font-extrabold text-xs text-slate-900 tracking-tight' }, 'TikTok Shop Live & Video Ngắn'),
              h('span', { className: 'bg-[#FFC700] text-black text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase' }, 'Ghim giỏ')
            ),
            h('span', {
              onClick: () => ctx.showToast('Đang mở thư viện 120+ video review đồ thể thao...'),
              className: 'text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline'
            }, 'Xem tất cả')
          ),
          h('div', { className: 'flex space-x-2.5 overflow-x-auto no-scrollbar pb-1' },
            window.VH_DATA.shorts.map(s => h('div', {
              key: s.id,
              className: 'w-36 h-52 rounded-xl bg-gradient-to-b ' + s.bgGradient + ' p-2 flex flex-col justify-between shrink-0 shadow-xs relative overflow-hidden cursor-pointer group active:scale-98 transition-all',
              onClick: () => ctx.showToast('Đang phát video: "' + s.title + '"')
            },
              h('div', { className: 'flex items-center justify-between z-10' },
                s.isLive ? h('span', {
                  className: 'bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center space-x-1 shadow-xs animate-pulse'
                }, '🔴 LIVE') : h('span', {
                  className: 'bg-black/40 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded'
                }, s.tag),
                h('span', { className: 'text-[10px] text-white/90 font-medium' }, s.views)
              ),
              h('div', { className: 'my-auto flex justify-center text-white/80 group-hover:scale-110 transition-transform' },
                h('div', { className: 'w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center' },
                  h(I.Play, { size: 13 })
                )
              ),
              h('div', { className: 'z-10' },
                h('p', { className: 'text-white text-[10px] font-bold leading-tight line-clamp-1 drop-shadow-sm mb-1' }, s.title),
                h('div', { className: 'flex items-center space-x-1 mb-1.5' },
                  h('img', { src: s.avatar, className: 'w-3 h-3 rounded-full object-cover border border-white/60' }),
                  h('span', { className: 'text-[8px] text-white/80 truncate' }, s.author)
                ),
                // Nút Giỏ Hàng Màu Vàng TikTok Shop ghim trực tiếp!
                h('button', {
                  onClick: (e) => {
                    e.stopPropagation();
                    const found = window.VH_DATA.products.find(p => p.id === s.pinnedProductId) || {
                      id: s.pinnedProductId,
                      name: s.pinnedProductName,
                      price: s.pinnedProductPrice,
                      originalPrice: Math.round(s.pinnedProductPrice * 1.3),
                      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80',
                      type: 'shoe',
                      brand: 'Nike',
                      availableSizes: ['39', '40', '41', '42', '43', '44'],
                      defaultSize: '41',
                      availableColors: ['Xanh Electric', 'Cam Neon'],
                      defaultColor: 'Xanh Electric'
                    };
                    setSelectedProductForSize(found);
                  },
                  className: 'w-full py-1 px-1.5 bg-[#FFC700] hover:bg-[#FBBF24] active:scale-95 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center space-x-1 shadow-md transition-transform'
                },
                  h(I.ShoppingCart, { size: 10, className: 'text-slate-950' }),
                  h('span', { className: 'truncate' }, window.formatVND(s.pinnedProductPrice) + ' • Mua')
                )
              )
            ))
          )
        ),

        // Lưới sản phẩm 2 cột (Compact Product Card)
        h('div', { className: 'px-3' },
          h('div', { className: 'flex items-center justify-between mb-2' },
            h('div', { className: 'font-extrabold text-xs text-slate-900 tracking-tight flex items-center space-x-1' },
              h(I.Flame, { size: 15, className: 'text-[#FF6600]' }),
              h('span', null, 'Đồ Thể Thao Bán Chạy')
            ),
            h('span', { className: 'text-[11px] text-slate-400 font-medium' }, `${filtered.length} sản phẩm`)
          ),
          h('div', { className: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5' },
            filtered.map(prod => h('div', {
              key: prod.id,
              className: 'bg-white rounded-2xl border border-slate-200/70 p-2.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between'
            },
              h('div', null,
                // Image with Pill Discount Badge & Clean Quality Tag
                h('div', { className: 'relative w-full rounded-xl overflow-hidden mb-2 group' },
                  h(SafeImage, {
                    src: prod.image,
                    alt: prod.name,
                    fallback: prod.fallbackImage,
                    containerClassName: 'rounded-xl w-full',
                    className: 'group-hover:scale-105 transition-transform duration-300'
                  }),
                  // Pill-badge giảm giá siêu nhỏ gọn góc trên bên phải
                  h('span', {
                    className: 'absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6600] text-white shadow-2xs z-2'
                  }, prod.discount),
                  // Tag chất lượng tách riêng góc trái
                  prod.qualityTag && h('span', {
                    className: 'absolute top-1.5 left-1.5 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md shadow-2xs z-2'
                  }, prod.qualityTag)
                ),
                // Rating & Sold
                h('div', { className: 'flex items-center space-x-1 mb-1 text-[10px] text-slate-500' },
                  h(I.Star, { size: 11, className: 'text-amber-400', fill: '#f59e0b' }),
                  h('span', { className: 'font-bold text-slate-700' }, prod.rating),
                  h('span', null, `(${prod.sold} đã bán)`)
                ),
                // Title
                h('h4', { className: 'font-bold text-xs text-slate-800 line-clamp-2 leading-snug mb-1' }, prod.name),
                // Price
                h('div', { className: 'mb-2' },
                  h('div', { className: 'font-black text-xs text-[#FF6600]' }, window.formatVND(prod.price)),
                  h('div', { className: 'text-[9px] text-slate-400 line-through' }, window.formatVND(prod.originalPrice))
                )
              ),
              // Nút ngang thanh mảnh dạng viên thuốc (Pill Button h-8)
              h('button', {
                onClick: (e) => {
                  e.stopPropagation();
                  setSelectedProductForSize(prod);
                },
                className: 'w-full h-8 rounded-full bg-[#FF6600] hover:bg-[#EA580C] active:scale-95 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all'
              },
                h(I.ShoppingBag, { size: 13 }),
                h('span', null, 'Thêm vào giỏ')
              )
            ))
          )
        )
      ),

      // Smart Size Sheet Popup
      selectedProductForSize && h(SmartSizeSheet, {
        product: selectedProductForSize,
        onClose: () => setSelectedProductForSize(null),
        onConfirm: (item) => {
          ctx.addToCart(item);
          setSelectedProductForSize(null);
        }
      }),

      // Frosted Bottom Nav
      h(FrostedBottomNav, { activeTab: 1, onNavigate, cartCount: ctx.cartCount })
    );
  }
// ==========================================
  // ARTBOARD 2: DANH MỤC 2 CỘT (Split-View Categories)
  // ==========================================
  function Artboard2Categories({ ctx, onNavigate }) {
    const [selectedMainCat, setSelectedMainCat] = useState('football');
    const [selectedBrand, setSelectedBrand] = useState('Tất cả');
    const [selectedProductForSize, setSelectedProductForSize] = useState(null);

    const mainCats = window.VH_DATA.mainCategories;
    const subCats = window.VH_DATA.subCategories[selectedMainCat] || [];

    const catProducts = window.VH_DATA.products.filter(p => {
      const matchCat = p.category === selectedMainCat;
      const matchBrand = selectedBrand === 'Tất cả' || p.brand === selectedBrand;
      return matchCat && matchBrand;
    });

    const activeCatObj = mainCats.find(c => c.id === selectedMainCat);

    return h('div', { className: 'w-full h-full flex flex-col bg-slate-50 text-slate-800 overflow-hidden relative' },
      h(MobileStatusBar, null),

      // Header
      h('div', { className: 'px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between z-10' },
        h('div', { className: 'flex items-center space-x-2' },
          h('button', {
            onClick: () => onNavigate(1),
            className: 'p-1 -ml-1 text-slate-600 hover:text-slate-900 rounded-full'
          }, h(I.ArrowLeft, { size: 18 })),
          h('h2', { className: 'font-extrabold text-sm text-slate-900' }, 'Danh Mục Bộ Môn')
        ),
        h('button', {
          onClick: () => onNavigate(3),
          className: 'relative p-1.5 text-slate-600 hover:text-orange-600'
        },
          h(I.ShoppingCart, { size: 18 }),
          ctx.cartCount > 0 && h('span', {
            className: 'absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center'
          }, ctx.cartCount)
        )
      ),

      // Brand Filter Bar
      h('div', { className: 'px-3 py-1.5 bg-white border-b border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar' },
        h('span', { className: 'text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider' }, 'Hãng:'),
        window.VH_DATA.brands.map(b => h('button', {
          key: b,
          onClick: () => setSelectedBrand(b),
          className: `px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all shrink-0 ${
            selectedBrand === b
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`
        }, b))
      ),

      // Split-View Body
      h('div', { className: 'flex-1 flex overflow-hidden pb-14' },

        // CỘT TRÁI: Menu cuộn dọc các bộ môn thể thao
        h('div', { className: 'w-28 sm:w-32 bg-slate-100 border-r border-slate-200/80 overflow-y-auto no-scrollbar shrink-0' },
          mainCats.map(cat => {
            const isSelected = selectedMainCat === cat.id;
            const IconComponent = I[cat.icon] || I.Activity;
            return h('button', {
              key: cat.id,
              onClick: () => setSelectedMainCat(cat.id),
              className: `w-full py-3 px-2 flex flex-col items-center justify-center text-center transition-all relative border-b border-slate-200/50 ${
                isSelected
                  ? 'bg-white text-blue-600 font-extrabold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60 font-semibold'
              }`
            },
              isSelected && h('div', { className: 'absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-md' }),
              h('div', {
                className: `w-8 h-8 rounded-xl flex items-center justify-center mb-1 ${
                  isSelected ? 'bg-blue-50 text-blue-600' : 'bg-slate-200/70 text-slate-600'
                }`
              }, h(IconComponent, { size: 16 })),
              h('span', { className: 'text-[11px] leading-tight' }, cat.name),
              cat.badge && h('span', {
                className: 'mt-0.5 text-[8px] font-black bg-red-500 text-white px-1 rounded-full'
              }, cat.badge)
            );
          })
        ),

        // CỘT PHẢI: Lưới danh mục con & Sản phẩm (Tương tác đầy đủ)
        h('div', { className: 'flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar bg-white' },

          // Header Bộ Môn
          h('div', { className: 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-2.5 rounded-xl' },
            h('div', { className: 'flex items-center justify-between' },
              h('h3', { className: 'font-extrabold text-xs text-blue-950 uppercase tracking-tight' }, activeCatObj?.name),
              h('span', { className: 'text-[10px] font-bold text-blue-600' }, `${catProducts.length} sản phẩm`)
            ),
            h('p', { className: 'text-[10px] text-slate-500 mt-0.5 leading-tight' }, activeCatObj?.desc)
          ),

          // Lưới Danh Mục Con Kèm Ảnh
          h('div', null,
            h('span', { className: 'block font-extrabold text-[11px] text-slate-700 uppercase tracking-wider mb-2' }, 'Danh Mục Con'),
            h('div', { className: 'grid grid-cols-2 gap-2' },
              subCats.map(sub => h('div', {
                key: sub.id,
                onClick: () => ctx.showToast(`Đang lọc nhóm: ${sub.name}`),
                className: 'bg-slate-50 hover:bg-blue-50/50 border border-slate-200/70 hover:border-blue-300 rounded-xl p-2 flex flex-col items-center text-center cursor-pointer transition-all active:scale-95 group'
              },
                h(SafeImage, {
                  src: sub.image,
                  alt: sub.name,
                  containerClassName: 'w-14 h-14 rounded-lg mb-1.5 shadow-2xs group-hover:scale-105 transition-transform'
                }),
                h('span', { className: 'font-bold text-[10px] text-slate-800 line-clamp-1 leading-tight' }, sub.name),
                h('span', { className: 'text-[9px] text-slate-400' }, sub.items)
              ))
            )
          ),

          // Sản Phẩm Nổi Bật Thuộc Nhóm (Có nút thêm mở Size Sheet ngay tại chỗ!)
          h('div', null,
            h('span', { className: 'block font-extrabold text-[11px] text-slate-700 uppercase tracking-wider mb-2' }, 'Sản Phẩm Đang Bán'),
            catProducts.length === 0 ? h('div', { className: 'text-center py-6 text-slate-400 text-xs' },
              'Chưa có sản phẩm phù hợp với bộ lọc này.'
            ) : h('div', { className: 'space-y-2' },
              catProducts.map(p => h('div', {
                key: p.id,
                className: 'bg-slate-50 border border-slate-200/80 rounded-xl p-2 flex items-center space-x-2.5 shadow-2xs'
              },
                h(SafeImage, {
                  src: p.image,
                  alt: p.name,
                  fallback: p.fallbackImage,
                  containerClassName: 'w-14 h-14 rounded-lg'
                }),
                h('div', { className: 'flex-1 min-w-0' },
                  h('h5', { className: 'font-bold text-[11px] text-slate-800 truncate' }, p.name),
                  h('div', { className: 'flex items-center space-x-1.5 mt-0.5' },
                    h('span', { className: 'font-black text-xs text-[#FF6600]' }, window.formatVND(p.price)),
                    h('span', { className: 'text-[9px] text-slate-400 line-through' }, window.formatVND(p.originalPrice))
                  ),
                  h('div', { className: 'text-[9px] text-slate-500 mt-0.5' }, `Size chuẩn: ${p.defaultSize}`)
                ),
                // Nút mở size sheet trực tiếp tại cột phải
                h('button', {
                  onClick: () => setSelectedProductForSize(p),
                  className: 'h-7 px-3 bg-[#FF6600] hover:bg-[#EA580C] text-white font-bold text-[10px] rounded-full active:scale-95 transition-all flex items-center space-x-1 shrink-0 shadow-2xs'
                },
                  h(I.Plus, { size: 12 }),
                  h('span', null, 'Chọn size')
                )
              ))
            )
          )
        )
      ),

      // Smart Size Sheet Popup
      selectedProductForSize && h(SmartSizeSheet, {
        product: selectedProductForSize,
        onClose: () => setSelectedProductForSize(null),
        onConfirm: (item) => {
          ctx.addToCart(item);
          setSelectedProductForSize(null);
        }
      }),

      // Frosted Bottom Nav
      h(FrostedBottomNav, { activeTab: 2, onNavigate, cartCount: ctx.cartCount })
    );
  }

  // ==========================================
  // ARTBOARD 3: GIỎ HÀNG SIÊU NHỎ GỌN (Compact Cart)
  // ==========================================
  function Artboard3CompactCart({ ctx, onNavigate }) {
    const isAllSelected = ctx.cart.length > 0 && ctx.cart.every(i => i.selected);

    return h('div', { className: 'w-full h-full flex flex-col bg-slate-50 text-slate-800 overflow-hidden relative' },
      h(MobileStatusBar, null),

      // Header
      h('div', { className: 'px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between z-10 shrink-0' },
        h('div', { className: 'flex items-center space-x-2' },
          h('button', {
            onClick: () => onNavigate(1),
            className: 'p-1 -ml-1 text-slate-600 hover:text-slate-900 rounded-full'
          }, h(I.ArrowLeft, { size: 18 })),
          h('h2', { className: 'font-extrabold text-sm text-slate-900' }, `Giỏ Hàng (${ctx.cart.length})`)
        ),
        ctx.cart.length > 0 && h('button', {
          onClick: ctx.clearCart,
          className: 'text-xs text-red-500 hover:text-red-700 font-semibold'
        }, 'Xoá tất cả')
      ),

      // Freeship notice
      h('div', { className: 'bg-emerald-50 border-b border-emerald-100 px-4 py-1.5 flex items-center justify-between text-[11px] text-emerald-800' },
        h('div', { className: 'flex items-center space-x-1.5' },
          h(I.Truck, { size: 14, className: 'text-emerald-600' }),
          h('span', { className: 'font-semibold' }, 'Đã đủ điều kiện FREESHIP toàn quốc!')
        ),
        h('span', { className: 'text-[9px] font-black bg-emerald-600 text-white px-1.5 py-0.2 rounded' }, 'MIỄN PHÍ')
      ),

      // Danh Sách Hàng Ngang Nhỏ Gọn
      h('div', { className: 'flex-1 overflow-y-auto p-2.5 space-y-2 pb-24 custom-scrollbar' },
        ctx.cart.length === 0 ? h('div', { className: 'text-center py-16' },
          h('div', { className: 'w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-400' },
            h(I.ShoppingBag, { size: 24 })
          ),
          h('p', { className: 'text-xs font-bold text-slate-700 mb-1' }, 'Giỏ hàng của bạn đang trống'),
          h('button', {
            onClick: () => onNavigate(1),
            className: 'px-4 py-1.5 bg-[#FF6600] text-white rounded-lg text-xs font-bold shadow-xs'
          }, 'Mua sắm ngay')
        ) : ctx.cart.map(item => h('div', {
          key: item.id + (item.size || ''),
          className: 'bg-white rounded-xl border border-slate-200/70 p-2 shadow-2xs flex items-center space-x-2.5 transition-all hover:border-slate-300'
        },
          // Checkbox Tròn
          h('input', {
            type: 'checkbox',
            checked: !!item.selected,
            onChange: () => ctx.toggleItemSelect(item.id, item.size),
            className: 'w-4 h-4 rounded-full border-slate-300 accent-orange-500 cursor-pointer shrink-0'
          }),
          // Ảnh 64x64px
          h(SafeImage, {
            src: item.image,
            alt: item.name,
            containerClassName: 'w-16 h-16 rounded-lg border border-slate-100 shrink-0'
          }),
          // Info & Price
          h('div', { className: 'flex-1 min-w-0 py-0.5' },
            h('h4', { className: 'font-bold text-xs text-slate-800 line-clamp-1 leading-snug' }, item.name),
            h('div', { className: 'flex items-center space-x-1.5 my-0.5 text-[10px] text-slate-400' },
              item.size && h('span', { className: 'bg-slate-100 px-1 py-0.2 rounded font-medium text-slate-600' }, `Size: ${item.size}`),
              item.color && h('span', { className: 'truncate max-w-20' }, item.color)
            ),
            h('div', { className: 'flex items-center justify-between' },
              h('span', { className: 'font-black text-xs text-[#FF6600]' }, window.formatVND(item.price)),
              // Stepper
              h('div', { className: 'flex items-center space-x-1.5' },
                h('div', { className: 'flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50' },
                  h('button', {
                    onClick: () => ctx.updateQuantity(item.id, item.size, -1),
                    className: 'w-5 h-5 flex items-center justify-center hover:bg-slate-200 text-slate-600 active:scale-90'
                  }, h(I.Minus, { size: 10 })),
                  h('span', { className: 'w-6 text-center text-[11px] font-bold text-slate-800' }, item.quantity),
                  h('button', {
                    onClick: () => ctx.updateQuantity(item.id, item.size, 1),
                    className: 'w-5 h-5 flex items-center justify-center hover:bg-slate-200 text-slate-600 active:scale-90'
                  }, h(I.Plus, { size: 10 }))
                ),
                h('button', {
                  onClick: () => ctx.removeFromCart(item.id, item.size),
                  className: 'p-1 text-slate-400 hover:text-red-500 rounded'
                }, h(I.Trash2, { size: 13 }))
              )
            )
          )
        ))
      ),

      // Thanh Tổng Kết Đáy
      h('div', {
        className: 'absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-3 py-2 shadow-lg z-20'
      },
        h('div', { className: 'flex items-center justify-between' },
          h('label', { className: 'flex items-center space-x-1.5 cursor-pointer text-xs font-bold text-slate-700' },
            h('input', {
              type: 'checkbox',
              checked: isAllSelected,
              onChange: (e) => ctx.toggleSelectAll(e.target.checked),
              className: 'w-4 h-4 rounded-full border-slate-300 accent-orange-500 cursor-pointer'
            }),
            h('span', null, 'Tất cả')
          ),
          h('div', { className: 'text-right pr-2' },
            h('div', { className: 'text-[10px] text-slate-400 font-medium' }, 'Tổng thanh toán:'),
            h('div', { className: 'text-sm font-black text-[#FF6600] tracking-tight' }, window.formatVND(ctx.cartTotal))
          ),
          h('button', {
            disabled: ctx.selectedCount === 0,
            onClick: () => onNavigate(4),
            className: `px-5 py-2 rounded-full font-black text-xs flex items-center space-x-1 shadow-sm transition-all ${
              ctx.selectedCount > 0
                ? 'bg-[#FF6600] hover:bg-[#EA580C] text-white active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`
          },
            h('span', null, `Mua hàng (${ctx.selectedCount})`),
            h(I.ChevronRight, { size: 13 })
          )
        ),
        h(MobileHomeBar, null)
      )
    );
  }

  // ==========================================
  // ARTBOARD 4: XÁC NHẬN THANH TOÁN (Checkout & Sổ Địa Chỉ)
  // ==========================================
  function Artboard4Checkout({ ctx, onNavigate }) {
    const [voucherInput, setVoucherInput] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);

    // New address form state
    const [newLabel, setNewLabel] = useState('Nhà riêng');
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newStreet, setNewStreet] = useState('');

    const handleCreateAddress = () => {
      if (!newName || !newPhone || !newStreet) {
        ctx.showToast('Vui lòng điền đủ họ tên, SĐT và địa chỉ!');
        return;
      }
      const newAddr = {
        id: 'addr_' + Date.now(),
        label: newLabel,
        recipient: newName,
        phone: newPhone,
        street: newStreet,
        ward: 'Phường Bến Nghé',
        district: 'Quận 1, TP. Hồ Chí Minh',
        isDefault: false
      };
      const updated = [...ctx.addresses, newAddr];
      ctx.setAddresses(updated);
      ctx.setSelectedAddressId(newAddr.id);
      setShowNewAddressForm(false);
      setShowAddressModal(false);
      ctx.showToast('Đã thêm và áp dụng địa chỉ mới!');
    };

    const currentAddr = ctx.addresses.find(a => a.id === ctx.selectedAddressId) || ctx.addresses[0];

    return h('div', { className: 'w-full h-full flex flex-col bg-slate-50 text-slate-800 overflow-hidden relative' },
      h(MobileStatusBar, null),

      // Header
      h('div', { className: 'px-4 py-2.5 bg-white border-b border-slate-100 flex items-center space-x-2 z-10' },
        h('button', {
          onClick: () => onNavigate(3),
          className: 'p-1 -ml-1 text-slate-600 hover:text-slate-900 rounded-full'
        }, h(I.ArrowLeft, { size: 18 })),
        h('h2', { className: 'font-extrabold text-sm text-slate-900' }, 'Xác Nhận Đơn Hàng')
      ),

      // Content
      h('div', { className: 'flex-1 overflow-y-auto p-3 space-y-2.5 pb-24 custom-scrollbar' },

        // Khối Địa Chỉ Nhận Hàng Linh Hoạt
        h('div', { className: 'bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs' },
          h('div', { className: 'flex items-center justify-between mb-2' },
            h('div', { className: 'flex items-center space-x-1.5 font-bold text-xs text-slate-900' },
              h(I.MapPin, { size: 15, className: 'text-[#FF6600]' }),
              h('span', null, 'Địa chỉ nhận hàng'),
              currentAddr && h('span', {
                className: 'text-[9px] font-extrabold bg-orange-50 text-orange-600 px-1.5 py-0.2 rounded border border-orange-200'
              }, currentAddr.label)
            ),
            h('button', {
              onClick: () => setShowAddressModal(true),
              className: 'text-xs text-blue-600 font-bold hover:underline flex items-center space-x-0.5'
            },
              h(I.Edit3, { size: 11 }),
              h('span', null, 'Thay đổi')
            )
          ),

          currentAddr && h('div', { className: 'text-xs text-slate-600 pl-5 leading-snug' },
            h('div', { className: 'font-bold text-slate-900 flex items-center space-x-2' },
              h('span', null, currentAddr.recipient),
              h('span', { className: 'text-slate-300' }, '|'),
              h('span', null, currentAddr.phone)
            ),
            h('p', { className: 'text-[11px] text-slate-600 mt-0.5' },
              `${currentAddr.street}, ${currentAddr.ward}, ${currentAddr.district}`
            )
          )
        ),

        // Danh Sách Tóm Tắt Món Hàng
        h('div', { className: 'bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs' },
          h('div', { className: 'font-bold text-xs text-slate-900 mb-2 flex justify-between' },
            h('span', null, `Sản phẩm đặt mua (${ctx.selectedCount})`),
            h('span', { className: 'text-[11px] text-blue-600 cursor-pointer', onClick: () => onNavigate(3) }, 'Xem lại giỏ')
          ),
          h('div', { className: 'space-y-1.5' },
            ctx.selectedItems.map(item => h('div', {
              key: item.id + (item.size || ''),
              className: 'flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0'
            },
              h('div', { className: 'flex items-center space-x-2 min-w-0 pr-2' },
                h(SafeImage, {
                  src: item.image,
                  alt: item.name,
                  containerClassName: 'w-9 h-9 rounded-md shrink-0'
                }),
                h('div', { className: 'truncate' },
                  h('div', { className: 'font-semibold text-slate-800 truncate' }, item.name),
                  h('div', { className: 'text-[10px] text-slate-400' }, `Size: ${item.size} • SL: x${item.quantity}`)
                )
              ),
              h('span', { className: 'font-bold text-slate-900 shrink-0' }, window.formatVND(item.price * item.quantity))
            ))
          )
        ),

        // Voucher Input Section
        h('div', { className: 'bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs' },
          h('div', { className: 'font-bold text-xs text-slate-900 mb-2 flex items-center space-x-1.5' },
            h(I.Ticket, { size: 15, className: 'text-purple-600' }),
            h('span', null, 'Mã giảm giá VH Sports')
          ),
          h('div', { className: 'flex space-x-1.5 mb-2' },
            h('input', {
              type: 'text',
              value: voucherInput,
              onChange: (e) => setVoucherInput(e.target.value.toUpperCase()),
              placeholder: 'Nhập mã (VHSPORTS10, FREESHIP)...',
              className: 'flex-1 px-3 py-1.5 text-xs font-mono uppercase border border-slate-200 rounded-lg outline-none focus:border-blue-500'
            }),
            h('button', {
              onClick: () => {
                if (voucherInput) {
                  ctx.applyVoucher(voucherInput);
                  setVoucherInput('');
                }
              },
              className: 'px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg'
            }, 'Áp dụng')
          ),
          h('div', { className: 'flex flex-wrap gap-1.5' },
            window.VH_DATA.vouchers.map(v => {
              const active = ctx.voucher && ctx.voucher.code === v.code;
              return h('button', {
                key: v.code,
                onClick: () => ctx.applyVoucher(v.code),
                className: `px-2 py-0.5 rounded text-[10px] font-bold border ${
                  active ? 'bg-purple-50 text-purple-700 border-purple-400' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`
              }, `${v.code} (${v.freeShipping ? 'Freeship' : `-${v.discountPercent || 200}%`})`);
            })
          )
        ),

        // Bảng Tính Tiền
        h('div', { className: 'bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs text-xs space-y-1.5' },
          h('div', { className: 'flex justify-between text-slate-600' },
            h('span', null, 'Tiền hàng tạm tính:'),
            h('span', { className: 'font-semibold' }, window.formatVND(ctx.cartTotal))
          ),
          h('div', { className: 'flex justify-between text-slate-600' },
            h('span', null, 'Phí vận chuyển:'),
            h('span', { className: 'font-semibold' }, window.formatVND(ctx.shippingFee))
          ),
          ctx.discountAmount > 0 && h('div', { className: 'flex justify-between text-emerald-600 font-semibold' },
            h('span', null, `Giảm giá (${ctx.voucher.code}):`),
            h('span', null, `-${window.formatVND(ctx.discountAmount)}`)
          ),
          h('div', { className: 'border-t border-slate-100 pt-2 flex justify-between items-center text-sm' },
            h('span', { className: 'font-bold text-slate-900' }, 'Tổng cộng thanh toán:'),
            h('span', { className: 'font-black text-[#FF6600] text-base' }, window.formatVND(ctx.finalTotal))
          )
        )
      ),

      // Modal Sổ Địa Chỉ Giao Hàng
      showAddressModal && h('div', {
        className: 'absolute inset-0 bg-black/60 backdrop-blur-2xs flex flex-col justify-end z-40 animate-fadeIn'
      },
        h('div', {
          className: 'bg-white rounded-t-3xl p-4 shadow-2xl border-t border-slate-200 max-h-[85%] overflow-y-auto'
        },
          h('div', { className: 'flex justify-between items-center pb-2.5 border-b border-slate-100 mb-3' },
            h('h3', { className: 'font-extrabold text-sm text-slate-900' }, 'Sổ Địa Chỉ Nhận Hàng'),
            h('button', {
              onClick: () => { setShowAddressModal(false); setShowNewAddressForm(false); },
              className: 'p-1 text-slate-400 hover:text-slate-600'
            }, h(I.X, { size: 18 }))
          ),

          // Danh sách địa chỉ đã lưu
          !showNewAddressForm ? h('div', { className: 'space-y-2' },
            ctx.addresses.map(a => {
              const isSelected = a.id === ctx.selectedAddressId;
              return h('div', {
                key: a.id,
                onClick: () => {
                  ctx.setSelectedAddressId(a.id);
                  setShowAddressModal(false);
                  ctx.showToast(`Đã chọn địa chỉ: ${a.label}`);
                },
                className: `p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected ? 'border-orange-500 bg-orange-50/30 ring-1 ring-orange-500' : 'border-slate-200 hover:border-slate-300'
                }`
              },
                h('div', { className: 'flex items-center justify-between mb-1' },
                  h('div', { className: 'flex items-center space-x-2' },
                    h('input', {
                      type: 'radio',
                      name: 'pickedAddress',
                      checked: isSelected,
                      onChange: () => {},
                      className: 'accent-orange-500'
                    }),
                    h('span', { className: 'font-bold text-xs text-slate-900' }, a.label)
                  ),
                  a.isDefault && h('span', { className: 'text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded' }, 'Mặc định')
                ),
                h('div', { className: 'text-[11px] text-slate-600 pl-5' },
                  h('div', { className: 'font-semibold' }, `${a.recipient} • ${a.phone}`),
                  h('div', { className: 'text-slate-500 mt-0.5' }, `${a.street}, ${a.ward}, ${a.district}`)
                )
              );
            }),

            h('button', {
              onClick: () => setShowNewAddressForm(true),
              className: 'w-full py-2.5 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center space-x-1'
            },
              h(I.Plus, { size: 14 }),
              h('span', null, '+ Thêm địa chỉ mới')
            )
          ) : (
            // Form thêm địa chỉ mới
            h('div', { className: 'space-y-2 text-xs' },
              h('div', null,
                h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Tên gợi nhớ (VD: Nhà riêng, Công ty):'),
                h('input', {
                  type: 'text',
                  value: newLabel,
                  onChange: (e) => setNewLabel(e.target.value),
                  className: 'w-full px-2.5 py-1.5 border rounded-lg outline-none focus:border-blue-500'
                })
              ),
              h('div', null,
                h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Họ tên người nhận:'),
                h('input', {
                  type: 'text',
                  value: newName,
                  onChange: (e) => setNewName(e.target.value),
                  placeholder: 'Nguyễn Văn Dương',
                  className: 'w-full px-2.5 py-1.5 border rounded-lg outline-none focus:border-blue-500'
                })
              ),
              h('div', null,
                h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Số điện thoại:'),
                h('input', {
                  type: 'text',
                  value: newPhone,
                  onChange: (e) => setNewPhone(e.target.value),
                  placeholder: '0988 123 456',
                  className: 'w-full px-2.5 py-1.5 border rounded-lg outline-none focus:border-blue-500'
                })
              ),
              h('div', null,
                h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Địa chỉ chi tiết:'),
                h('input', {
                  type: 'text',
                  value: newStreet,
                  onChange: (e) => setNewStreet(e.target.value),
                  placeholder: 'Số 18, Lê Lợi, P. Bến Nghé, Q.1',
                  className: 'w-full px-2.5 py-1.5 border rounded-lg outline-none focus:border-blue-500'
                })
              ),
              h('div', { className: 'flex space-x-2 pt-2' },
                h('button', {
                  onClick: () => setShowNewAddressForm(false),
                  className: 'flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg'
                }, 'Hủy'),
                h('button', {
                  onClick: handleCreateAddress,
                  className: 'flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg'
                }, 'Lưu địa chỉ')
              )
            )
          )
        )
      ),

      // Bottom Button
      h('div', { className: 'absolute bottom-0 inset-x-0 bg-white border-t border-slate-200/80 p-3 shadow-lg z-20' },
        h('button', {
          onClick: () => onNavigate(5),
          className: 'w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center space-x-1.5'
        },
          h('span', null, 'Tiến hành thanh toán'),
          h(I.ChevronRight, { size: 14 })
        ),
        h(MobileHomeBar, null)
      )
    );
  }

  // ==========================================
  // ARTBOARD 5: CHỌN PHƯƠNG THỨC THANH TOÁN
  // ==========================================
  function Artboard5PaymentSelection({ ctx, onNavigate }) {
    const methods = [
      {
        id: 'vietqr',
        name: 'Chuyển khoản VietQR (Napas 247)',
        sub: 'Quét mã tức thì 24/7 từ mọi ngân hàng Việt Nam',
        badge: 'Tự động 3s',
        logo: I.VietQRLogo,
        targetScreen: 6
      },
      {
        id: 'momo',
        name: 'Ví Điện Tử MoMo',
        sub: 'Thanh toán 1 chạm, hoàn xu và voucher thể thao',
        badge: 'Khuyên dùng',
        logo: I.MoMoLogo,
        targetScreen: 6
      },
      {
        id: 'card',
        name: 'Thẻ Quốc Tế (Visa / Mastercard / JCB)',
        sub: 'Bảo mật 3D Secure OTP chuẩn PCI-DSS Level 1',
        badge: 'PCI-DSS',
        logo: () => h('div', { className: 'flex items-center space-x-1' },
          h(I.VisaLogo, null),
          h(I.MastercardLogo, null)
        ),
        targetScreen: 7
      },
      {
        id: 'cod',
        name: 'Thanh toán khi nhận hàng (COD)',
        sub: 'Kiểm tra hàng trước khi thanh toán tiền mặt cho shipper',
        badge: 'Tiền mặt',
        logo: I.CODLogo,
        targetScreen: 8
      }
    ];

    const selectMethod = (m) => {
      ctx.setSelectedPaymentMethod(m.id);
      if (m.id === 'cod') {
        ctx.setOrderResult({
          status: 'success',
          orderId: '#VH-' + Math.floor(10000 + Math.random() * 90000),
          methodName: 'Thanh toán tiền mặt khi nhận hàng (COD)',
          amount: ctx.finalTotal
        });
        if (window.confetti) {
          window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        }
      }
      onNavigate(m.targetScreen);
    };

    return h('div', { className: 'w-full h-full flex flex-col bg-slate-50 text-slate-800 overflow-hidden relative' },
      h(MobileStatusBar, null),

      // Header
      h('div', { className: 'px-4 py-2.5 bg-white border-b border-slate-100 flex items-center space-x-2 z-10' },
        h('button', {
          onClick: () => onNavigate(4),
          className: 'p-1 -ml-1 text-slate-600 hover:text-slate-900 rounded-full'
        }, h(I.ArrowLeft, { size: 18 })),
        h('h2', { className: 'font-extrabold text-sm text-slate-900' }, 'Phương Thức Thanh Toán')
      ),

      // Bill Amount Banner
      h('div', { className: 'bg-slate-900 text-white p-3.5 mx-3 mt-3 rounded-xl shadow-xs' },
        h('div', { className: 'text-[11px] text-slate-400' }, 'Số tiền cần thanh toán:'),
        h('div', { className: 'text-lg font-black text-orange-400 mt-0.5' }, window.formatVND(ctx.finalTotal)),
        h('div', { className: 'text-[10px] text-slate-400 mt-1 flex items-center space-x-1' },
          h(I.Lock, { size: 10 }),
          h('span', null, 'Bảo mật giao dịch mã hóa 256-bit SSL')
        )
      ),

      // Methods List
      h('div', { className: 'flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar' },
        methods.map(m => {
          const isSelected = ctx.selectedPaymentMethod === m.id;
          return h('div', {
            key: m.id,
            onClick: () => selectMethod(m),
            className: `bg-white rounded-xl border p-3 shadow-2xs cursor-pointer transition-all flex items-start space-x-3 hover:border-blue-400 ${
              isSelected ? 'border-blue-600 ring-1 ring-blue-600 bg-blue-50/20' : 'border-slate-200/80'
            }`
          },
            h('div', { className: 'shrink-0 mt-0.5' }, h(m.logo, null)),
            h('div', { className: 'flex-1 min-w-0' },
              h('div', { className: 'flex items-center justify-between' },
                h('h4', { className: 'font-bold text-xs text-slate-900' }, m.name),
                h('span', { className: 'text-[9px] font-extrabold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded' }, m.badge)
              ),
              h('p', { className: 'text-[10px] text-slate-500 mt-0.5 leading-tight' }, m.sub)
            ),
            h(I.ChevronRight, { size: 15, className: 'text-slate-400 self-center shrink-0' })
          );
        }),

        h('button', {
          onClick: () => onNavigate(7),
          className: 'w-full py-2 px-3 bg-white border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors'
        },
          h('div', { className: 'flex items-center space-x-2' },
            h(I.CreditCard, { size: 15, className: 'text-blue-600' }),
            h('span', null, 'Quản lý ví & thẻ đã lưu')
          ),
          h(I.ChevronRight, { size: 14, className: 'text-slate-400' })
        )
      ),

      // Footer
      h('div', { className: 'p-3 bg-white border-t border-slate-100 text-center' },
        h('p', { className: 'text-[10px] text-slate-400' }, 'Chọn phương thức để tiếp tục luồng chuyển màn hình'),
        h(MobileHomeBar, null)
      )
    );
  }

  // ==========================================
  // ARTBOARD 6: CỔNG VIETQR / MOMO GATEWAY
  // ==========================================
  function Artboard6QRGateway({ ctx, onNavigate }) {
    const [qrTab, setQrTab] = useState(ctx.selectedPaymentMethod === 'momo' ? 'momo' : 'vietqr');
    const [timeLeft, setTimeLeft] = useState(899); // 14:59
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const handleConfirm = () => {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        ctx.setOrderResult({
          status: 'success',
          orderId: '#VH-' + Math.floor(10000 + Math.random() * 90000),
          methodName: qrTab === 'vietqr' ? 'VietQR Napas 24/7 (MB Bank)' : 'Ví MoMo Pay',
          amount: ctx.finalTotal
        });
        if (window.confetti) {
          window.confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
        }
        onNavigate(8);
      }, 1300);
    };

    return h('div', { className: 'w-full h-full flex flex-col bg-slate-50 text-slate-800 overflow-hidden relative' },
      h(MobileStatusBar, null),

      // Header
      h('div', { className: 'px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between z-10' },
        h('div', { className: 'flex items-center space-x-2' },
          h('button', {
            onClick: () => onNavigate(5),
            className: 'p-1 -ml-1 text-slate-600 hover:text-slate-900 rounded-full'
          }, h(I.ArrowLeft, { size: 18 })),
          h('h2', { className: 'font-extrabold text-sm text-slate-900' }, 'Cổng Thanh Toán QR')
        ),
        h('div', { className: 'flex items-center space-x-1 font-mono font-bold text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200' },
          h(I.Clock, { size: 12 }),
          h('span', null, formatTime)
        )
      ),

      // Tab switcher
      h('div', { className: 'px-4 pt-2 pb-1 bg-white' },
        h('div', { className: 'flex bg-slate-100 p-1 rounded-xl' },
          h('button', {
            onClick: () => setQrTab('vietqr'),
            className: `flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
              qrTab === 'vietqr' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`
          },
            h(I.VietQRLogo, { className: 'text-[9px]' }),
            h('span', null, 'VietQR Napas')
          ),
          h('button', {
            onClick: () => setQrTab('momo'),
            className: `flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1 ${
              qrTab === 'momo' ? 'bg-white text-pink-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`
          },
            h(I.MoMoLogo, { className: 'w-4 h-4 text-[9px]' }),
            h('span', null, 'Ví MoMo')
          )
        )
      ),

      // QR Body
      h('div', { className: 'flex-1 overflow-y-auto p-4 space-y-3 pb-24 custom-scrollbar text-center' },
        h('div', { className: 'bg-white rounded-2xl border border-slate-200 p-4 shadow-sm inline-block w-full max-w-xs mx-auto relative overflow-hidden' },
          h('div', { className: 'relative w-44 h-44 mx-auto bg-slate-900 rounded-xl p-3 flex flex-col justify-between shadow-inner' },
            h('svg', { viewBox: '0 0 100 100', className: 'w-full h-full fill-white' },
              h('rect', { x: 5, y: 5, width: 25, height: 25, rx: 4, fill: '#fff' }),
              h('rect', { x: 9, y: 9, width: 17, height: 17, fill: '#0f172a' }),
              h('rect', { x: 13, y: 13, width: 9, height: 9, fill: '#fff' }),

              h('rect', { x: 70, y: 5, width: 25, height: 25, rx: 4, fill: '#fff' }),
              h('rect', { x: 74, y: 9, width: 17, height: 17, fill: '#0f172a' }),
              h('rect', { x: 78, y: 13, width: 9, height: 9, fill: '#fff' }),

              h('rect', { x: 5, y: 70, width: 25, height: 25, rx: 4, fill: '#fff' }),
              h('rect', { x: 9, y: 74, width: 17, height: 17, fill: '#0f172a' }),
              h('rect', { x: 13, y: 78, width: 9, height: 9, fill: '#fff' }),

              h('circle', { cx: 45, cy: 15, r: 3 }),
              h('circle', { cx: 55, cy: 15, r: 3 }),
              h('circle', { cx: 40, cy: 25, r: 3 }),
              h('circle', { cx: 60, cy: 25, r: 3 }),
              h('circle', { cx: 15, cy: 45, r: 3 }),
              h('circle', { cx: 25, cy: 45, r: 3 }),
              h('circle', { cx: 85, cy: 45, r: 3 }),
              h('circle', { cx: 45, cy: 75, r: 3 }),
              h('circle', { cx: 55, cy: 85, r: 3 }),

              h('rect', { x: 36, y: 36, width: 28, height: 28, rx: 6, fill: '#0f172a' }),
              h('rect', { x: 38, y: 38, width: 24, height: 24, rx: 4, fill: qrTab === 'vietqr' ? '#0054A6' : '#A50064' })
            ),
            h('div', { className: 'absolute inset-0 flex items-center justify-center pointer-events-none' },
              h('span', { className: 'text-white font-black text-xs' }, qrTab === 'vietqr' ? 'QR' : 'M')
            ),
            h('div', { className: 'absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/80 animate-scan' })
          ),
          h('p', { className: 'text-[11px] text-slate-500 mt-2 font-medium' },
            qrTab === 'vietqr' ? 'Mở App ngân hàng bất kỳ để quét mã' : 'Mở ứng dụng Ví MoMo để quét mã'
          )
        ),

        // Chi Tiết
        h('div', { className: 'bg-white rounded-xl border border-slate-200/80 p-3 text-left space-y-1.5 text-xs shadow-2xs' },
          h('div', { className: 'flex justify-between items-center py-0.5 border-b border-slate-100' },
            h('span', { className: 'text-slate-400 text-[11px]' }, 'Ngân hàng thụ hưởng:'),
            h('span', { className: 'font-bold text-slate-800' }, qrTab === 'vietqr' ? 'MB Bank (Quân Đội)' : 'Ví Điện Tử MoMo')
          ),
          h('div', { className: 'flex justify-between items-center py-0.5 border-b border-slate-100' },
            h('span', { className: 'text-slate-400 text-[11px]' }, 'Số tài khoản:'),
            h('div', { className: 'flex items-center space-x-1.5' },
              h('span', { className: 'font-mono font-bold text-slate-900' }, '0988123456789'),
              h('button', {
                onClick: () => ctx.copyToClipboard('0988123456789'),
                className: 'p-0.5 hover:bg-slate-100 rounded text-slate-500'
              }, h(I.Copy, { size: 12 }))
            )
          ),
          h('div', { className: 'flex justify-between items-center py-0.5 border-b border-slate-100' },
            h('span', { className: 'text-slate-400 text-[11px]' }, 'Số tiền chuẩn:'),
            h('div', { className: 'flex items-center space-x-1.5' },
              h('span', { className: 'font-black text-[#FF6600] text-sm' }, window.formatVND(ctx.finalTotal)),
              h('button', {
                onClick: () => ctx.copyToClipboard(ctx.finalTotal.toString()),
                className: 'p-0.5 hover:bg-slate-100 rounded text-slate-500'
              }, h(I.Copy, { size: 12 }))
            )
          ),
          h('div', { className: 'flex justify-between items-center py-0.5' },
            h('span', { className: 'text-slate-400 text-[11px]' }, 'Nội dung:'),
            h('div', { className: 'flex items-center space-x-1.5' },
              h('span', { className: 'font-mono font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded' }, 'VHSPORTS 89241'),
              h('button', {
                onClick: () => ctx.copyToClipboard('VHSPORTS 89241'),
                className: 'p-0.5 hover:bg-slate-100 rounded text-slate-500'
              }, h(I.Copy, { size: 12 }))
            )
          )
        )
      ),

      // Confirm Button
      h('div', { className: 'absolute bottom-0 inset-x-0 bg-white border-t border-slate-200/80 p-3 shadow-lg z-20' },
        h('button', {
          disabled: isVerifying,
          onClick: handleConfirm,
          className: 'w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all'
        },
          isVerifying ? [
            h(I.RefreshCw, { size: 14, className: 'animate-spin' }),
            h('span', null, 'Đang đối soát giao dịch ngân hàng...')
          ] : [
            h(I.CheckCircle2, { size: 15 }),
            h('span', null, 'Xác nhận đã chuyển khoản')
          ]
        ),
        h(MobileHomeBar, null)
      )
    );
  }

  // ==========================================
  // ARTBOARD 7: TRANG CÁ NHÂN & QUẢN LÝ THANH TOÁN (Profile & Payment Hub)
  // ==========================================
  function Artboard7ProfileAndManagement({ ctx, onNavigate }) {
    const [cardNum, setCardNum] = useState(ctx.cardData?.number || '4532 8920 1284 9912');
    const [cardName, setCardName] = useState(ctx.cardData?.name || 'NGUYEN VAN DUONG');
    const [cardExpiry, setCardExpiry] = useState(ctx.cardData?.expiry || '12/28');
    const [cardCvv, setCardCvv] = useState(ctx.cardData?.cvv || '888');
    const [activeSection, setActiveSection] = useState('profile'); // 'profile' | 'addresses' | 'cards'
    const [isPaying, setIsPaying] = useState(false);
    const [showNewAddrModal, setShowNewAddrModal] = useState(false);
    const [newLabel, setNewLabel] = useState('Nhà riêng');
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newStreet, setNewStreet] = useState('');

    // Auto-detect Brand
    const cleanNum = cardNum.replace(/\s+/g, '');
    let brand = 'visa';
    if (cleanNum.startsWith('5')) brand = 'mastercard';
    else if (cleanNum.startsWith('35')) brand = 'jcb';

    const handleFormatCard = (e) => {
      const v = e.target.value.replace(/\D/g, '').slice(0, 16);
      const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
      setCardNum(formatted);
    };

    const handleCreateAddress = () => {
      if (!newName || !newPhone || !newStreet) {
        ctx.showToast('Vui lòng điền đủ họ tên, SĐT và địa chỉ chi tiết!');
        return;
      }
      const newAddr = {
        id: 'addr_' + Date.now(),
        label: newLabel,
        recipient: newName,
        phone: newPhone,
        street: newStreet,
        ward: 'Phường Bến Nghé',
        district: 'Quận 1, TP. Hồ Chí Minh',
        isDefault: false
      };
      const updated = [...(ctx.addresses || []), newAddr];
      ctx.setAddresses(updated);
      setShowNewAddrModal(false);
      setNewName('');
      setNewPhone('');
      setNewStreet('');
      ctx.showToast('Đã thêm địa chỉ giao hàng mới vào sổ!');
    };

    const handlePayNow = () => {
      setIsPaying(true);
      setTimeout(() => {
        setIsPaying(false);
        ctx.setOrderResult({
          status: 'success',
          orderId: '#VH-' + Math.floor(10000 + Math.random() * 90000),
          methodName: `${brand.toUpperCase()} •••• ${cleanNum.slice(-4) || '9912'}`,
          amount: ctx.finalTotal
        });
        if (window.confetti) {
          window.confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
        }
        onNavigate(8);
      }, 1400);
    };

    const userProf = ctx.userProfile || window.VH_DATA.userProfile;
    const orderHist = window.VH_DATA.orderHistory || [];
    const addrList = ctx.addresses || window.VH_DATA.initialAddresses || [];
    const savedCards = ctx.savedMethods || window.VH_DATA.savedMethods || [];

    return h('div', { className: 'w-full min-h-[640px] flex flex-col bg-slate-50 text-slate-800 relative' },
      h(MobileStatusBar, null),

      // Header Bar (Back to Home, Title, Cart Preview)
      h('div', { className: 'px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between z-10 shrink-0' },
        h('div', { className: 'flex items-center space-x-2' },
          h('button', {
            onClick: () => onNavigate(1),
            className: 'p-1.5 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer',
            title: 'Quay lại Trang chủ'
          }, h(I.ArrowLeft, { size: 18 })),
          h('div', null,
            h('h2', { className: 'font-extrabold text-sm md:text-base text-slate-900 leading-tight' }, 'Tài Khoản & Quản Lý Thanh Toán'),
            h('p', { className: 'text-[10px] md:text-xs text-slate-500' }, 'Hồ sơ VIP, Sổ địa chỉ giao hàng & Thẻ ngân hàng 3D')
          )
        ),
        h('button', {
          onClick: () => onNavigate(3),
          className: 'relative p-2 text-slate-600 hover:text-[#FF6600] rounded-xl hover:bg-orange-50 transition-colors cursor-pointer',
          title: 'Xem giỏ hàng'
        },
          h(I.ShoppingCart, { size: 19 }),
          ctx.cartCount > 0 && h('span', {
            className: 'absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-bounce shadow-xs'
          }, ctx.cartCount)
        )
      ),

      // Mobile Navigation Pills (Tabs toggle on mobile; acts as quick filter on desktop)
      h('div', { className: 'px-4 py-2 bg-white border-b border-slate-200 flex space-x-2 shrink-0 md:hidden' },
        h('button', {
          onClick: () => setActiveSection('profile'),
          className: `flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'profile' ? 'bg-[#FF6600] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`
        }, '👤 Cá nhân'),
        h('button', {
          onClick: () => setActiveSection('addresses'),
          className: `flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'addresses' ? 'bg-[#FF6600] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`
        }, '📍 Sổ địa chỉ'),
        h('button', {
          onClick: () => setActiveSection('cards'),
          className: `flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeSection === 'cards' ? 'bg-[#FF6600] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`
        }, '💳 Thẻ & Ví')
      ),

      // Main Content Grid (Responsive: 1 col on mobile, 2 cols on Desktop)
      h('div', { className: 'flex-1 p-3 md:p-6 overflow-y-auto pb-24 md:pb-8 custom-scrollbar' },
        h('div', { className: 'max-w-6xl mx-auto md:grid md:grid-cols-12 md:gap-6 space-y-4 md:space-y-0' },

          // LEFT COLUMN: PROFILE CARD & RECENT ORDERS
          h('div', {
            className: `md:col-span-5 space-y-4 ${
              activeSection === 'profile' ? 'block' : 'hidden md:block'
            }`
          },
            // 1. VIP Profile Header Card
            h('div', { className: 'bg-white rounded-2xl border border-slate-200/90 p-4 md:p-5 shadow-xs relative overflow-hidden' },
              h('div', { className: 'flex items-center space-x-3.5 relative z-1' },
                h('div', { className: 'relative' },
                  h('img', {
                    src: userProf.avatar,
                    alt: userProf.name,
                    className: 'w-16 h-16 rounded-2xl object-cover border-2 border-[#FF6600] shadow-sm'
                  }),
                  h('span', { className: 'absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs' }, 'VIP')
                ),
                h('div', { className: 'flex-1 min-w-0' },
                  h('div', { className: 'flex items-center space-x-1.5' },
                    h('h3', { className: 'font-extrabold text-sm md:text-base text-slate-900 truncate' }, userProf.name),
                    h('span', { className: 'text-[10px] font-black bg-orange-100 text-[#FF6600] px-1.5 py-0.2 rounded-md' }, userProf.tier)
                  ),
                  h('p', { className: 'text-xs text-slate-500 mt-0.5' }, userProf.phone),
                  h('p', { className: 'text-[11px] text-slate-400 truncate' }, userProf.email),
                  h('div', { className: 'flex items-center space-x-2 mt-2 text-[11px]' },
                    h('span', { className: 'text-[#FF6600] font-black' }, `🏆 ${userProf.points} Xu`),
                    h('span', { className: 'text-slate-300' }, '•'),
                    h('span', { className: 'text-slate-400' }, `Thành viên từ ${userProf.memberSince}`)
                  )
                )
              ),
              h('div', { className: 'mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs' },
                h('div', { className: 'bg-slate-50 p-2 rounded-xl' },
                  h('div', { className: 'text-[10px] text-slate-400 font-medium' }, 'Đơn đã mua'),
                  h('div', { className: 'font-black text-slate-800 text-sm mt-0.5' }, '14')
                ),
                h('div', { className: 'bg-slate-50 p-2 rounded-xl' },
                  h('div', { className: 'text-[10px] text-slate-400 font-medium' }, 'Voucher có'),
                  h('div', { className: 'font-black text-[#FF6600] text-sm mt-0.5' }, '4 mã')
                ),
                h('div', { className: 'bg-slate-50 p-2 rounded-xl' },
                  h('div', { className: 'text-[10px] text-slate-400 font-medium' }, 'Hạng VIP'),
                  h('div', { className: 'font-black text-blue-600 text-sm mt-0.5' }, 'Kim Cương')
                )
              )
            ),

            // 2. Recent Orders History Card
            h('div', { className: 'bg-white rounded-2xl border border-slate-200/90 p-4 md:p-5 shadow-xs space-y-3' },
              h('div', { className: 'flex items-center justify-between' },
                h('h4', { className: 'font-extrabold text-xs md:text-sm text-slate-900 uppercase tracking-wider flex items-center space-x-1.5' },
                  h(I.Truck, { size: 15, className: 'text-[#FF6600]' }),
                  h('span', null, 'Lịch Sử Đơn Hàng Gần Đây')
                ),
                h('span', { className: 'text-[10px] text-blue-600 font-bold cursor-pointer hover:underline' }, 'Xem tất cả')
              ),
              orderHist.length === 0 ? h('div', { className: 'text-center py-6 text-xs text-slate-400' }, 'Chưa có đơn hàng nào') :
              h('div', { className: 'space-y-2' },
                orderHist.map(ord => h('div', {
                  key: ord.id,
                  className: 'p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/70 transition-all flex items-center justify-between text-xs space-x-2'
                },
                  h('div', { className: 'min-w-0 flex-1' },
                    h('div', { className: 'flex items-center space-x-2' },
                      h('span', { className: 'font-mono font-bold text-slate-900' }, `#${ord.id}`),
                      h('span', { className: 'text-[10px] text-slate-400' }, ord.date)
                    ),
                    h('p', { className: 'text-[11px] text-slate-600 truncate mt-0.5' }, ord.summary || `${ord.paymentMethod}`),
                    h('span', { className: 'inline-block mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded' }, ord.status)
                  ),
                  h('div', { className: 'text-right shrink-0' },
                    h('div', { className: 'font-black text-xs md:text-sm text-[#FF6600]' }, window.formatVND(ord.total))
                  )
                ))
              )
            )
          ),

          // RIGHT COLUMN: ADDRESSES & CARDS/WALLETS
          h('div', {
            className: `md:col-span-7 space-y-4 ${
              activeSection !== 'profile' ? 'block' : 'hidden md:block'
            }`
          },
            // 3. Saved Addresses Section
            (activeSection === 'addresses' || true) && h('div', {
              className: `bg-white rounded-2xl border border-slate-200/90 p-4 md:p-5 shadow-xs space-y-3 ${
                activeSection === 'addresses' ? 'block' : 'hidden md:block'
              }`
            },
              h('div', { className: 'flex justify-between items-center' },
                h('h4', { className: 'font-extrabold text-xs md:text-sm text-slate-900 uppercase tracking-wider flex items-center space-x-1.5' },
                  h(I.MapPin, { size: 15, className: 'text-[#FF6600]' }),
                  h('span', null, 'Sổ Địa Chỉ Giao Hàng'),
                  h('span', { className: 'text-[10px] font-bold text-slate-400 ml-1' }, `(${addrList.length})`)
                ),
                h('button', {
                  onClick: () => setShowNewAddrModal(true),
                  className: 'text-xs text-blue-600 font-bold hover:underline flex items-center space-x-1 cursor-pointer'
                },
                  h(I.Plus, { size: 12 }),
                  h('span', null, 'Thêm địa chỉ')
                )
              ),
              h('div', { className: 'space-y-2' },
                addrList.map(a => h('div', {
                  key: a.id,
                  className: 'bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1 hover:border-slate-300 transition-all'
                },
                  h('div', { className: 'flex items-center justify-between' },
                    h('span', { className: 'font-bold text-slate-900 flex items-center space-x-1.5' },
                      h('span', { className: 'bg-white px-2 py-0.5 rounded-md border border-slate-200 font-extrabold text-[10px] text-slate-700' }, a.label),
                      h('span', { className: 'font-semibold text-slate-700' }, `${a.recipient} • ${a.phone}`)
                    ),
                    a.isDefault ? h('span', { className: 'text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full' }, '✓ Mặc định') :
                    h('button', {
                      onClick: () => {
                        ctx.setAddresses(addrList.map(item => ({ ...item, isDefault: item.id === a.id })));
                        ctx.showToast(`Đã đặt "${a.label}" làm địa chỉ mặc định!`);
                      },
                      className: 'text-[10px] font-bold text-blue-600 hover:underline cursor-pointer'
                    }, 'Đặt mặc định')
                  ),
                  h('p', { className: 'text-[11px] md:text-xs text-slate-600 leading-snug' }, `${a.street}, ${a.ward}, ${a.district}`)
                ))
              )
            ),

            // 4. Interactive 3D Card & Wallet Management
            (activeSection === 'cards' || true) && h('div', {
              className: `bg-white rounded-2xl border border-slate-200/90 p-4 md:p-5 shadow-xs space-y-3.5 ${
                activeSection === 'cards' ? 'block' : 'hidden md:block'
              }`
            },
              h('div', { className: 'flex justify-between items-center' },
                h('h4', { className: 'font-extrabold text-xs md:text-sm text-slate-900 uppercase tracking-wider flex items-center space-x-1.5' },
                  h(I.CreditCard, { size: 15, className: 'text-blue-600' }),
                  h('span', null, 'Mô Phỏng Thẻ Ngân Hàng 3D & Quản Lý Ví')
                ),
                h('span', { className: 'text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full' }, 'PCI-DSS Sec')
              ),

              // 3D Credit Card Preview
              h('div', {
                className: 'w-full h-44 rounded-2xl p-4 md:p-5 text-white shadow-xl relative overflow-hidden flex flex-col justify-between bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 border border-slate-700/80 shadow-blue-950/20'
              },
                h('div', { className: 'flex justify-between items-start' },
                  h('div', { className: 'flex items-center space-x-2' },
                    h('div', { className: 'w-8 h-6 rounded bg-amber-400 border border-amber-300 flex items-center justify-center p-0.5 shadow-inner' },
                      h('div', { className: 'w-full h-full border border-amber-600/40' })
                    ),
                    h('span', { className: 'text-[10px] font-mono tracking-widest text-slate-300' }, 'DEBIT PLATINUM')
                  ),
                  brand === 'visa' ? h(I.VisaLogo, { className: 'text-sm' }) :
                  brand === 'mastercard' ? h(I.MastercardLogo, { className: 'w-9 h-6' }) :
                  h(I.JCBLogo, null)
                ),
                h('div', { className: 'font-mono tracking-widest text-base md:text-lg font-bold text-white drop-shadow-sm' },
                  cardNum || '•••• •••• •••• ••••'
                ),
                h('div', { className: 'flex justify-between items-end' },
                  h('div', { className: 'max-w-[70%]' },
                    h('div', { className: 'text-[9px] uppercase tracking-wider text-slate-400' }, 'CHỦ THẺ'),
                    h('div', { className: 'font-mono text-xs md:text-sm font-bold uppercase truncate' }, cardName || 'NGUYEN VAN DUONG')
                  ),
                  h('div', { className: 'text-right' },
                    h('div', { className: 'text-[9px] uppercase tracking-wider text-slate-400' }, 'HẾT HẠN'),
                    h('div', { className: 'font-mono text-xs md:text-sm font-bold' }, cardExpiry || '12/28')
                  )
                )
              ),

              // Card Form Inputs (Real-time card formatting)
              h('div', { className: 'bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5 text-xs' },
                h('div', null,
                  h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Số thẻ ngân hàng (gõ số thẻ tự đổi thời gian thực):'),
                  h('input', {
                    type: 'text',
                    value: cardNum,
                    onChange: handleFormatCard,
                    placeholder: '4532 8920 1284 9912',
                    className: 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-xs md:text-sm outline-none focus:border-blue-500'
                  })
                ),
                h('div', null,
                  h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Tên chủ thẻ (không dấu):'),
                  h('input', {
                    type: 'text',
                    value: cardName,
                    onChange: (e) => setCardName(e.target.value.toUpperCase()),
                    placeholder: 'NGUYEN VAN DUONG',
                    className: 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg uppercase font-mono text-xs md:text-sm outline-none focus:border-blue-500'
                  })
                ),
                h('div', { className: 'grid grid-cols-2 gap-3' },
                  h('div', null,
                    h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Hạn sử dụng (MM/YY):'),
                    h('input', {
                      type: 'text',
                      value: cardExpiry,
                      onChange: (e) => setCardExpiry(e.target.value),
                      placeholder: '12/28',
                      className: 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-xs outline-none focus:border-blue-500'
                    })
                  ),
                  h('div', null,
                    h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Mã CVV (3 số bí mật):'),
                    h('input', {
                      type: 'password',
                      maxLength: 3,
                      value: cardCvv,
                      onChange: (e) => setCardCvv(e.target.value.replace(/\D/g, '')),
                      placeholder: '888',
                      className: 'w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-xs outline-none focus:border-blue-500'
                    })
                  )
                )
              ),

              // Saved Methods List
              h('div', { className: 'space-y-2' },
                h('span', { className: 'block font-extrabold text-[11px] text-slate-700 uppercase tracking-wider' }, 'Ví & Thẻ Đã Liên Kết'),
                savedCards.map(item => h('div', {
                  key: item.id,
                  className: 'bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 shadow-2xs flex items-center justify-between hover:bg-white transition-all'
                },
                  h('div', { className: 'flex items-center space-x-2.5 min-w-0' },
                    item.icon === 'momo' ? h(I.MoMoLogo, { className: 'w-6 h-6 text-[10px]' }) :
                    item.icon === 'visa' ? h(I.VisaLogo, null) : h(I.MastercardLogo, { className: 'w-6 h-4' }),
                    h('div', { className: 'truncate' },
                      h('div', { className: 'font-bold text-xs md:text-sm text-slate-900 truncate' }, item.name),
                      h('div', { className: 'text-[10px] md:text-xs font-mono text-slate-400' }, item.details)
                    )
                  ),
                  h('button', {
                    onClick: () => {
                      ctx.setSavedMethods(savedCards.filter(m => m.id !== item.id));
                      ctx.showToast('Đã xóa liên kết!');
                    },
                    className: 'p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer',
                    title: 'Xóa liên kết'
                  }, h(I.Trash2, { size: 14 }))
                ))
              )
            )
          )
        )
      ),

      // Modal Thêm Địa Chỉ Nhận Hàng Mới
      showNewAddrModal && h('div', {
        className: 'fixed inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4 z-50 animate-fadeIn'
      },
        h('div', {
          className: 'bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-3'
        },
          h('div', { className: 'flex justify-between items-center pb-2 border-b border-slate-100' },
            h('h3', { className: 'font-extrabold text-sm text-slate-900' }, 'Thêm Địa Chỉ Giao Hàng'),
            h('button', {
              onClick: () => setShowNewAddrModal(false),
              className: 'p-1 text-slate-400 hover:text-slate-600 rounded-full'
            }, h(I.X, { size: 18 }))
          ),
          h('div', { className: 'space-y-2.5 text-xs' },
            h('div', null,
              h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Loại địa chỉ:'),
              h('div', { className: 'flex space-x-2' },
                ['Nhà riêng', 'Văn phòng', 'Sân bóng'].map(lbl => h('button', {
                  key: lbl,
                  onClick: () => setNewLabel(lbl),
                  className: `px-3 py-1 rounded-lg font-bold text-xs border ${
                    newLabel === lbl ? 'bg-orange-50 border-[#FF6600] text-[#FF6600]' : 'border-slate-200 text-slate-600'
                  }`
                }, lbl))
              )
            ),
            h('div', null,
              h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Họ và tên người nhận:'),
              h('input', {
                type: 'text',
                value: newName,
                onChange: (e) => setNewName(e.target.value),
                placeholder: 'Nguyễn Văn Dương',
                className: 'w-full px-3 py-2 border rounded-xl outline-none focus:border-blue-500'
              })
            ),
            h('div', null,
              h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Số điện thoại:'),
              h('input', {
                type: 'text',
                value: newPhone,
                onChange: (e) => setNewPhone(e.target.value),
                placeholder: '0988 123 456',
                className: 'w-full px-3 py-2 border rounded-xl outline-none focus:border-blue-500'
              })
            ),
            h('div', null,
              h('label', { className: 'block font-bold text-slate-700 mb-1 text-[11px]' }, 'Địa chỉ chi tiết (Số nhà, tên đường, phường, quận):'),
              h('input', {
                type: 'text',
                value: newStreet,
                onChange: (e) => setNewStreet(e.target.value),
                placeholder: 'Số 18, Lê Lợi, Phường Bến Nghé, Quận 1',
                className: 'w-full px-3 py-2 border rounded-xl outline-none focus:border-blue-500'
              })
            ),
            h('div', { className: 'flex space-x-2 pt-2' },
              h('button', {
                onClick: () => setShowNewAddrModal(false),
                className: 'flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl'
              }, 'Hủy'),
              h('button', {
                onClick: handleCreateAddress,
                className: 'flex-1 py-2 bg-[#FF6600] hover:bg-[#EA580C] text-white font-bold text-xs rounded-xl shadow-xs'
              }, 'Lưu địa chỉ')
            )
          )
        )
      ),

      // Mobile Bottom Nav
      h(FrostedBottomNav, { activeTab: 7, onNavigate, cartCount: ctx.cartCount })
    );
  }
// ==========================================
  // ARTBOARD 8: KẾT QUẢ GIAO DỊCH (Dual State)
  // ==========================================
  function Artboard8Result({ ctx, onNavigate }) {
    const [resultState, setResultState] = useState(ctx.orderResult?.status || 'success');

    return h('div', { className: 'w-full h-full flex flex-col bg-slate-50 text-slate-800 overflow-hidden relative' },
      h(MobileStatusBar, null),

      // Dual State Toggle Bar
      h('div', { className: 'px-4 py-2 bg-slate-900 text-white flex items-center justify-between text-xs z-20 shrink-0' },
        h('span', { className: 'text-[10px] text-slate-400 font-semibold uppercase' }, 'Review Trạng Thái:'),
        h('div', { className: 'flex space-x-1 bg-slate-800 p-0.5 rounded-lg' },
          h('button', {
            onClick: () => setResultState('success'),
            className: `px-2 py-0.5 rounded font-bold text-[10px] transition-all ${
              resultState === 'success' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
            }`
          }, '✅ Thành công'),
          h('button', {
            onClick: () => setResultState('failed'),
            className: `px-2 py-0.5 rounded font-bold text-[10px] transition-all ${
              resultState === 'failed' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'
            }`
          }, '❌ Thất bại')
        )
      ),

      // Content
      h('div', { className: 'flex-1 overflow-y-auto p-4 space-y-3.5 pb-20 custom-scrollbar text-center' },

        // SUCCESS STATE
        resultState === 'success' ? h('div', { className: 'space-y-3.5' },
          h('div', { className: 'w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20 animate-bounce' },
            h(I.CheckCircle2, { size: 34 })
          ),
          h('div', null,
            h('h2', { className: 'font-black text-lg text-slate-900 tracking-tight' }, 'Thanh toán thành công!'),
            h('p', { className: 'text-xs text-slate-500 mt-0.5' }, 'Cảm ơn bạn đã đồng hành cùng VH Sports')
          ),

          // Receipt Card
          h('div', { className: 'bg-white rounded-2xl border border-slate-200/80 p-3 text-left space-y-1.5 text-xs shadow-2xs' },
            h('div', { className: 'flex justify-between items-center py-0.5 border-b border-slate-100' },
              h('span', { className: 'text-slate-400 text-[11px]' }, 'Mã đơn hàng:'),
              h('div', { className: 'flex items-center space-x-1' },
                h('span', { className: 'font-mono font-bold text-slate-900' }, ctx.orderResult?.orderId || '#VH-89241'),
                h('button', {
                  onClick: () => ctx.copyToClipboard(ctx.orderResult?.orderId || '#VH-89241'),
                  className: 'p-0.5 text-slate-400 hover:text-slate-700'
                }, h(I.Copy, { size: 11 }))
              )
            ),
            h('div', { className: 'flex justify-between items-center py-0.5 border-b border-slate-100' },
              h('span', { className: 'text-slate-400 text-[11px]' }, 'Tổng tiền thanh toán:'),
              h('span', { className: 'font-black text-emerald-600 text-sm' }, window.formatVND(ctx.finalTotal))
            ),
            h('div', { className: 'flex justify-between items-center py-0.5 border-b border-slate-100' },
              h('span', { className: 'text-slate-400 text-[11px]' }, 'Phương thức:'),
              h('span', { className: 'font-bold text-slate-800' }, ctx.orderResult?.methodName || 'VietQR Napas 24/7')
            ),
            h('div', { className: 'flex justify-between items-center py-0.5' },
              h('span', { className: 'text-slate-400 text-[11px]' }, 'Dự kiến giao hàng:'),
              h('span', { className: 'font-bold text-orange-600' }, '04/11 - 05/11/2026')
            )
          ),

          // Actions
          h('div', { className: 'flex space-x-2' },
            h('button', {
              onClick: () => onNavigate(1),
              className: 'flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all'
            }, 'Tiếp tục mua sắm'),
            h('button', {
              onClick: () => onNavigate(3),
              className: 'px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl'
            }, 'Về giỏ hàng')
          ),

          // Gợi Ý Sản Phẩm Tương Tự
          h('div', { className: 'text-left pt-2' },
            h('h4', { className: 'font-bold text-xs text-slate-800 mb-2 flex items-center space-x-1.5' },
              h(I.Sparkles, { size: 14, className: 'text-amber-500' }),
              h('span', null, 'Sản phẩm tương tự bạn có thể thích:')
            ),
            h('div', { className: 'space-y-2' },
              window.VH_DATA.recommendedProducts.map(rec => h('div', {
                key: rec.id,
                className: 'bg-white rounded-xl border border-slate-200/80 p-2 flex items-center space-x-2.5 shadow-2xs hover:shadow-xs'
              },
                h(SafeImage, {
                  src: rec.image,
                  alt: rec.name,
                  containerClassName: 'w-12 h-12 rounded-lg'
                }),
                h('div', { className: 'flex-1 min-w-0' },
                  h('h5', { className: 'font-bold text-xs text-slate-800 truncate' }, rec.name),
                  h('div', { className: 'flex items-center space-x-2 mt-0.5' },
                    h('span', { className: 'font-black text-xs text-[#FF6600]' }, window.formatVND(rec.price)),
                    h('span', { className: 'text-[10px] text-slate-400 line-through' }, window.formatVND(rec.originalPrice))
                  )
                ),
                h('button', {
                  onClick: () => {
                    ctx.addToCart(rec);
                  },
                  className: 'p-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg shrink-0'
                }, h(I.Plus, { size: 14 }))
              ))
            )
          )
        ) :

        // FAILED STATE
        h('div', { className: 'space-y-3.5' },
          h('div', { className: 'w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-md shadow-red-500/20 animate-shake' },
            h(I.XCircle, { size: 34 })
          ),
          h('div', null,
            h('h2', { className: 'font-black text-lg text-slate-900 tracking-tight' }, 'Giao dịch không thành công!'),
            h('p', { className: 'text-xs text-slate-500 mt-0.5' }, 'Hệ thống thanh toán bị gián đoạn hoặc bị ngân hàng từ chối')
          ),

          h('div', { className: 'bg-red-50 border border-red-200 rounded-xl p-3 text-left space-y-1 text-xs text-red-900' },
            h('div', { className: 'font-bold flex items-center space-x-1.5 text-red-800' },
              h(I.AlertTriangle, { size: 14 }),
              h('span', null, 'Lý do từ chối từ ngân hàng:')
            ),
            h('p', { className: 'text-[11px] text-red-700 leading-relaxed' },
              'Số dư khả dụng không đủ hoặc thẻ chưa kích hoạt tính năng thanh toán trực tuyến qua Internet.'
            ),
            h('div', { className: 'text-[10px] font-mono text-red-600 pt-0.5' }, 'Mã lỗi: ERR_INSUFFICIENT_FUNDS_OR_BLOCKED')
          ),

          h('div', { className: 'space-y-2' },
            h('button', {
              onClick: () => onNavigate(5),
              className: 'w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs active:scale-95'
            }, 'Đổi phương thức thanh toán khác'),
            h('button', {
              onClick: () => onNavigate(6),
              className: 'w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl'
            }, 'Thử lại giao dịch này')
          ),

          h('div', { className: 'pt-1 text-slate-400 text-[11px]' },
            h('p', null, 'Hỗ trợ khách hàng 24/7:'),
            h('p', { className: 'font-bold text-blue-600 text-xs' }, '1900 6868 (Miễn phí cuộc gọi)')
          )
        )
      ),

      // Footer
      h('div', { className: 'p-3 bg-white border-t border-slate-100 text-center' },
        h(MobileHomeBar, null)
      )
    );
  }

  // Master Artboards Definition
  window.VH_ARTBOARDS = [
    {
      id: 1,
      name: '01. Trang chủ',
      subtitle: 'Tìm kiếm, Live Shorts, Card gọn & Nút viên thuốc',
      component: Artboard1Home,
      x: 80,
      y: 100,
      flowGroup: 'Discovery'
    },
    {
      id: 2,
      name: '02. Danh mục 2 cột',
      subtitle: 'Split-View: Menu bộ môn & Chọn size trực tiếp',
      component: Artboard2Categories,
      x: 520,
      y: 100,
      flowGroup: 'Discovery'
    },
    {
      id: 3,
      name: '03. Giỏ hàng siêu gọn',
      subtitle: 'Tối ưu padding, thẻ ngang 64px & nút viên thuốc',
      component: Artboard3CompactCart,
      x: 960,
      y: 100,
      flowGroup: 'Cart'
    },
    {
      id: 4,
      name: '04. Xác nhận đơn',
      subtitle: 'Sổ địa chỉ linh hoạt, Voucher trừ bill & Chi phí',
      component: Artboard4Checkout,
      x: 1400,
      y: 100,
      flowGroup: 'Checkout'
    },
    {
      id: 5,
      name: '05. Chọn thanh toán',
      subtitle: 'Hub điều hướng VietQR, MoMo, Thẻ & COD',
      component: Artboard5PaymentSelection,
      x: 80,
      y: 1040,
      flowGroup: 'Payment'
    },
    {
      id: 6,
      name: '06. Cổng VietQR / MoMo',
      subtitle: 'QR động laser, đếm ngược 15:00 & Sao chép STK',
      component: Artboard6QRGateway,
      x: 520,
      y: 1040,
      flowGroup: 'Payment'
    },
    {
      id: 7,
      name: '07. Tài khoản & Thẻ',
      subtitle: 'Hồ sơ VIP, Sổ địa chỉ, Thẻ 3D & Quản lý ví',
      component: Artboard7ProfileAndManagement,
      x: 960,
      y: 1040,
      flowGroup: 'Management'
    },
    {
      id: 8,
      name: '08. Kết quả đơn hàng',
      subtitle: 'Dual State: Thành công (Confetti) & Thất bại',
      component: Artboard8Result,
      x: 1400,
      y: 1040,
      flowGroup: 'Resolution'
    }
  ];
})();
