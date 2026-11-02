// VH Sports - Main App Component with Multi-Address & Profile Persistence (v4.0)
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';

// Fallback data in case window.VH_DATA is not yet loaded
const fallbackData = {
  initialCart: [
    {
      id: 'prod_1',
      name: 'Áo Đấu VH Pro Elite 2026',
      price: 450000,
      originalPrice: 650000,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=80',
      size: 'L',
      color: 'Cam VH Signature',
      quantity: 1,
      selected: true
    }
  ],
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
    }
  ],
  userProfile: {
    name: 'Nguyễn Văn Dương',
    phone: '0988 123 456',
    email: 'duong.vh@vhsports.vn',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    tier: 'VIP Kim Cương',
    points: 2450,
    memberSince: 'Tháng 03/2024'
  },
  vouchers: [
    {
      code: 'VHSPECIAL',
      description: 'Giảm 10% tối đa 100K cho đơn từ 500K',
      discountPercent: 10,
      maxDiscount: 100000,
      minOrder: 500000
    }
  ],
  savedMethods: [
    { id: 'vietqr', name: 'Chuyển khoản VietQR (MB Bank)', icon: 'QrCode', isDefault: true }
  ]
};

// Safe LocalStorage Helpers
function getStorage<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.warn(`LocalStorage read error for "${key}":`, e);
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.warn(`LocalStorage write error for "${key}":`, e);
  }
}

export function App() {
  const h = React.createElement;
  const I = (typeof window !== 'undefined' && (window as any).VHIcons) || {};
  const FC = (typeof window !== 'undefined' && (window as any).FigmaComponents) || {};
  const vhData = (typeof window !== 'undefined' && (window as any).VH_DATA) || fallbackData;

  // ----------------------------------------
  // SAFE INITIALIZATION & LOADING MANAGEMENT
  // ----------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Dự phòng bắt buộc: giao diện chính BẮT BUỘC phải hiển thị sau tối đa 1.5 giây
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    try {
      // 2. Kiểm tra nếu tất cả tài nguyên module đã sẵn sàng thì mở ngay
      const checkAndReady = () => {
        if (typeof window !== 'undefined' && (window as any).VH_DATA && (window as any).FigmaComponents) {
          setIsLoading(false);
        }
      };

      checkAndReady();
      // Nhẹ nhàng chuyển cảnh sau 350ms để người dùng thấy thương hiệu VH Sports
      const readyTimer = setTimeout(() => {
        setIsLoading(false);
      }, 350);

      return () => {
        clearTimeout(fallbackTimer);
        clearTimeout(readyTimer);
      };
    } catch (error) {
      console.error('Resource loading check encountered an error, falling back to show UI:', error);
      setIsLoading(false);
    } finally {
      // Đảm bảo không bao giờ bị kẹt
    }
  }, []);

  // ----------------------------------------
  // GLOBAL STATE WITH LOCALSTORAGE PERSISTENCE
  // ----------------------------------------
  const [cart, setCart] = useState(() => getStorage('vh_cart', vhData.initialCart || fallbackData.initialCart));
  const [addresses, setAddresses] = useState(() => getStorage('vh_addresses', vhData.initialAddresses || fallbackData.initialAddresses));
  const [selectedAddressId, setSelectedAddressId] = useState(() => getStorage('vh_selected_address_id', 'addr_1'));
  const [userProfile, setUserProfile] = useState(() => getStorage('vh_profile', vhData.userProfile || fallbackData.userProfile));
  const [voucher, setVoucher] = useState(() => getStorage('vh_voucher', (vhData.vouchers && vhData.vouchers[0]) || fallbackData.vouchers[0]));
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('vietqr');
  const [savedMethods, setSavedMethods] = useState(() => getStorage('vh_saved_methods', vhData.savedMethods || fallbackData.savedMethods));
  const [cardData, setCardData] = useState({
    number: '4532 8920 1284 9912',
    name: 'NGUYEN VAN DUONG',
    expiry: '12/28',
    cvv: '888',
    saveCard: true
  });
  const [orderResult, setOrderResult] = useState({
    status: 'success',
    orderId: '#VH-89241',
    methodName: 'Chuyển khoản VietQR (MB Bank)',
    amount: 3710000
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to LocalStorage
  useEffect(() => { setStorage('vh_cart', cart); }, [cart]);
  useEffect(() => { setStorage('vh_addresses', addresses); }, [addresses]);
  useEffect(() => { setStorage('vh_selected_address_id', selectedAddressId); }, [selectedAddressId]);
  useEffect(() => { setStorage('vh_profile', userProfile); }, [userProfile]);
  useEffect(() => { setStorage('vh_saved_methods', savedMethods); }, [savedMethods]);
  useEffect(() => { setStorage('vh_voucher', voucher); }, [voucher]);

  // Toast helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 3200);
  }, []);

  // Clipboard copy helper
  const copyToClipboard = useCallback((text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    showToast(`Đã sao chép: "${text}" vào clipboard!`);
  }, [showToast]);

  // Cart Actions (Supporting variant size)
  const addToCart = useCallback((product: any) => {
    setCart((prev: any[]) => {
      const prodSize = product.size || product.defaultSize || '41';
      const exist = prev.find(item => item.id === product.id && item.size === prodSize);
      if (exist) {
        return prev.map(item => (item.id === product.id && item.size === prodSize)
          ? { ...item, quantity: item.quantity + (product.quantity || 1), selected: true }
          : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        size: prodSize,
        color: product.color || product.defaultColor || 'Xanh Electric',
        quantity: product.quantity || 1,
        selected: true
      }];
    });
    showToast(`Đã thêm "${product.name}" - Size ${product.size || product.defaultSize || '41'} vào giỏ hàng!`);
  }, [showToast]);

  const removeFromCart = useCallback((id: string, size?: string) => {
    setCart((prev: any[]) => prev.filter(i => !(i.id === id && (!size || i.size === size))));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  }, [showToast]);

  const updateQuantity = useCallback((id: string, size: string | undefined, delta: number) => {
    setCart((prev: any[]) => prev.map(item => {
      if (item.id === id && (!size || item.size === size)) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  }, []);

  const toggleItemSelect = useCallback((id: string, size?: string) => {
    setCart((prev: any[]) => prev.map(item => {
      if (item.id === id && (!size || item.size === size)) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }));
  }, []);

  const toggleSelectAll = useCallback((isSelected: boolean) => {
    setCart((prev: any[]) => prev.map(item => ({ ...item, selected: isSelected })));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast('Đã xóa toàn bộ sản phẩm khỏi giỏ.');
  }, [showToast]);

  const applyVoucher = useCallback((code: string) => {
    const list = ((window as any).VH_DATA?.vouchers) || fallbackData.vouchers;
    const found = list.find((v: any) => v.code.toUpperCase() === code.toUpperCase());
    if (found) {
      setVoucher(found);
      showToast(`Áp dụng thành công voucher: ${found.code}`);
    } else {
      showToast(`Mã giảm giá "${code}" không hợp lệ hoặc đã hết hạn.`);
    }
  }, [showToast]);

  // Financial Calculations
  const cartCount = useMemo(() => cart.reduce((sum: number, i: any) => sum + (i.quantity || 1), 0), [cart]);
  const selectedItems = useMemo(() => cart.filter((i: any) => i.selected), [cart]);
  const selectedCount = selectedItems.length;

  const cartTotal = useMemo(() => {
    return selectedItems.reduce((sum: number, i: any) => sum + (i.price || 0) * (i.quantity || 1), 0);
  }, [selectedItems]);

  const shippingFee = useMemo(() => {
    if (selectedCount === 0) return 0;
    if (voucher && voucher.freeShipping) return 0;
    return 30000;
  }, [selectedCount, voucher]);

  const discountAmount = useMemo(() => {
    if (!voucher || selectedCount === 0) return 0;
    if (voucher.discountPercent) {
      const disc = Math.round((cartTotal * voucher.discountPercent) / 100);
      return voucher.maxDiscount ? Math.min(disc, voucher.maxDiscount) : disc;
    }
    if (voucher.fixedDiscount) {
      return Math.min(voucher.fixedDiscount, cartTotal);
    }
    return 0;
  }, [voucher, cartTotal, selectedCount]);

  const finalTotal = useMemo(() => {
    if (selectedCount === 0) return 0;
    return Math.max(0, cartTotal + shippingFee - discountAmount);
  }, [cartTotal, shippingFee, discountAmount, selectedCount]);

  // App context for child screens
  const appContext = useMemo(() => ({
    cart,
    cartCount,
    selectedItems,
    selectedCount,
    cartTotal,
    shippingFee,
    discountAmount,
    finalTotal,
    addresses,
    setAddresses,
    selectedAddressId,
    setSelectedAddressId,
    userProfile,
    setUserProfile,
    voucher,
    applyVoucher,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    savedMethods,
    setSavedMethods,
    cardData,
    setCardData,
    orderResult,
    setOrderResult,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleItemSelect,
    toggleSelectAll,
    clearCart,
    showToast,
    copyToClipboard
  }), [
    cart, cartCount, selectedItems, selectedCount, cartTotal, shippingFee, discountAmount,
    finalTotal, addresses, selectedAddressId, userProfile, voucher, applyVoucher,
    selectedPaymentMethod, savedMethods, cardData, orderResult, addToCart, removeFromCart,
    updateQuantity, toggleItemSelect, toggleSelectAll, clearCart, showToast, copyToClipboard
  ]);

  // ----------------------------------------
  // FIGMA CANVAS NAVIGATION
  // ----------------------------------------
  const [viewMode, setViewMode] = useState<'live' | 'canvas' | 'prototype'>('live');
  const [currentScreenId, setCurrentScreenId] = useState(1);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [activeTool, setActiveTool] = useState<'select' | 'hand'>('select');
  const [showWires, setShowWires] = useState(true);
  const [zoom, setZoom] = useState(0.7);
  const [pan, setPan] = useState({ x: 30, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const collaborators = [
    { name: 'Dương', role: 'UI/UX Specialist', avatar: 'D', color: 'bg-blue-600' },
    { name: 'Senior Dev', role: 'Lead Architect', avatar: 'AI', color: 'bg-emerald-600' },
    { name: 'VH Sports', role: 'Product Owner', avatar: 'VH', color: 'bg-orange-500' }
  ];

  const handleFitToScreen = useCallback(() => {
    if (typeof window === 'undefined') return;
    const containerW = window.innerWidth;
    const containerH = window.innerHeight - 52;
    const contentW = 1900;
    const contentH = 2000;
    const scaleX = containerW / contentW;
    const scaleY = containerH / contentH;
    const newZoom = Math.max(0.3, Math.min(0.85, Math.min(scaleX, scaleY) * 0.95));
    setZoom(Math.round(newZoom * 100) / 100);
    setPan({ x: 40, y: 20 });
    showToast('Đã căn chỉnh vừa toàn bộ 8 Artboard!');
  }, [showToast]);

  const handleResetZoom = useCallback(() => {
    setZoom(1.0);
    setPan({ x: 40, y: 30 });
    showToast('Đã đặt tỉ lệ hiển thị chuẩn 100%');
  }, [showToast]);

  // Pan / Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'hand' || e.button === 1 || (e.target as HTMLElement).classList.contains('canvas-background')) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: pan.x,
        panY: pan.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPan({
        x: dragStartRef.current.panX + dx,
        y: dragStartRef.current.panY + dy
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomDelta = e.deltaY < 0 ? 0.05 : -0.05;
      setZoom(prev => Math.max(0.2, Math.min(2.0, Math.round((prev + zoomDelta) * 100) / 100)));
    } else if (!isDragging && activeTool === 'hand') {
      setPan(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === 'v' || e.key === 'V') setActiveTool('select');
      if (e.key === 'h' || e.key === 'H') setActiveTool('hand');
      if (e.key === 'f' || e.key === 'F') setShowWires(prev => !prev);
      if (e.key === 'p' || e.key === 'P') setViewMode(prev => prev === 'prototype' ? 'canvas' : 'prototype');
      if (e.key === 'Escape' && viewMode === 'prototype') setViewMode('canvas');
      if (e.key === 'r' || e.key === 'R') {
        if (viewMode === 'prototype') {
          setCurrentScreenId(1);
          showToast('Đã khởi động lại luồng!');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, showToast]);

  const handleFocusArtboard = (ab: any) => {
    if (typeof window === 'undefined') return;
    const targetX = -(ab.x * zoom) + (window.innerWidth / 2) - ((393 * zoom) / 2);
    const targetY = -(ab.y * zoom) + (window.innerHeight / 2) - ((852 * zoom) / 2);
    setPan({ x: targetX, y: targetY });
  };

  const handleLaunchPrototypeAt = (id: number) => {
    setCurrentScreenId(id);
    setViewMode('prototype');
  };

  // ----------------------------------------
  // CONDITIONAL RENDER: LOADING SCREEN
  // ----------------------------------------
  if (isLoading) {
    return <LoadingScreen />;
  }

  const artboardsList = (typeof window !== 'undefined' && (window as any).VH_ARTBOARDS) || [];

  return h('div', {
    className: 'w-screen h-screen flex flex-col bg-[#F5F5F5] overflow-hidden select-none font-sans',
    onMouseMove: viewMode === 'canvas' ? handleMouseMove : undefined,
    onMouseUp: viewMode === 'canvas' ? handleMouseUp : undefined
  },
    // Top Figma Toolbar (Always available for instant mode switching)
    FC.FigmaToolbar && h(FC.FigmaToolbar, {
      viewMode,
      setViewMode,
      zoom,
      setZoom,
      onFitToScreen: handleFitToScreen,
      onResetZoom: handleResetZoom,
      activeTool,
      setActiveTool,
      showWires,
      setShowWires,
      showToast,
      collaborators,
      onOpenDeploy: () => setShowDeployModal(true),
      onOpenPwa: () => setShowPwaModal(true)
    }),

    // 1. PRIMARY VIEW: LIVE EDGE-TO-EDGE E-COMMERCE APP
    viewMode === 'live' && h('div', { className: 'flex-1 overflow-y-auto custom-scrollbar' },
      FC.LiveEdgeToEdgeApp ? h(FC.LiveEdgeToEdgeApp, {
        currentScreenId,
        setCurrentScreenId,
        ctx: appContext,
        onOpenDeploy: () => setShowDeployModal(true),
        onOpenPwa: () => setShowPwaModal(true)
      }) : h('div', { className: 'p-8 text-center text-slate-500' }, 'Đang nạp ứng dụng...')
    ),

    // 2. FIGMA INFINITE CANVAS VIEWPORT (8 Artboards)
    viewMode === 'canvas' && h('div', {
      className: `flex-1 relative overflow-hidden canvas-background ${
        activeTool === 'hand' ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
      }`,
      style: {
        backgroundImage: 'radial-gradient(#d4d4d8 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
        backgroundColor: '#F5F5F5'
      },
      onMouseDown: handleMouseDown,
      onWheel: handleWheel
    },
      // Infinite Canvas Space
      h('div', {
        className: 'absolute transition-transform duration-75 ease-out origin-top-left',
        style: {
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: 2000,
          height: 2100
        }
      },
        // Prototype SVG Wires
        FC.PrototypeWires && h(FC.PrototypeWires, {
          artboards: artboardsList,
          visible: showWires
        }),

        // 8 Artboard Cards
        artboardsList.map((ab: any) => {
          const Component = ab.component;
          return h('div', {
            key: ab.id,
            className: 'absolute select-none group',
            style: {
              left: ab.x,
              top: ab.y,
              width: 393,
              height: 852
            }
          },
            // Artboard Header / Label
            h('div', {
              className: 'flex items-center justify-between pb-2 px-1 text-slate-500 font-sans'
            },
              h('div', { className: 'flex items-center space-x-2' },
                h('span', { className: 'font-extrabold text-xs text-slate-800 tracking-tight' }, ab.name),
                h('span', { className: 'text-[10px] font-mono text-slate-400 bg-white/90 px-1.5 py-0.2 rounded border border-slate-200' },
                  '393 × 852'
                )
              ),
              h('button', {
                onClick: (e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleLaunchPrototypeAt(ab.id);
                },
                title: `Chạy mô phỏng từ ${ab.name}`,
                className: 'opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md text-[10px] flex items-center space-x-1 font-bold shadow-xs cursor-pointer'
              },
                I.Play && h(I.Play, { size: 10, fill: 'currentColor' }),
                h('span', null, 'Play')
              )
            ),

            // Artboard Frame (Card with shadow & mobile screen inside)
            h('div', {
              className: 'w-full h-full bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/90 ring-1 ring-slate-900/5 relative transition-shadow hover:shadow-3xl'
            },
              Component ? h(Component, {
                ctx: appContext,
                onNavigate: (targetId: number) => {
                  showToast(`Điều hướng tới: Màn hình ${targetId}`);
                }
              }) : h('div', { className: 'p-4 text-xs text-neutral-400' }, 'Màn hình đang nạp...')
            )
          );
        })
      ),

      // Mini-Map Navigator
      FC.MiniMap && h(FC.MiniMap, {
        artboards: artboardsList,
        zoom,
        pan,
        onFocusArtboard: handleFocusArtboard
      }),

      // Quick Keyboard Legend
      h('div', {
        className: 'absolute bottom-4 left-4 hidden md:flex items-center space-x-3 bg-neutral-900/85 backdrop-blur-md text-neutral-300 text-[11px] px-3.5 py-1.5 rounded-xl border border-neutral-700 select-none shadow-lg'
      },
        h('span', { className: 'text-neutral-400' }, 'Phím tắt:'),
        h('span', null, h('kbd', { className: 'bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-white text-[10px]' }, 'V'), ' Chọn'),
        h('span', null, h('kbd', { className: 'bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-white text-[10px]' }, 'H'), ' Kéo Canvas'),
        h('span', null, h('kbd', { className: 'bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-white text-[10px]' }, 'F'), ' Dây Wires'),
        h('span', null, h('kbd', { className: 'bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-white text-[10px]' }, 'P'), ' Prototype')
      )
    ),

    // 3. INTERACTIVE PROTOTYPE PLAYER OVERLAY (iPhone Frame)
    viewMode === 'prototype' && FC.PrototypePlayer && h(FC.PrototypePlayer, {
      currentScreenId: currentScreenId,
      setCurrentScreenId: setCurrentScreenId,
      onClose: () => setViewMode('canvas'),
      ctx: appContext
    }),

    // 4. DEPLOYMENT MODAL
    showDeployModal && FC.DeployModal && h(FC.DeployModal, {
      onClose: () => setShowDeployModal(false),
      showToast
    }),

    // 5. PWA MODAL
    showPwaModal && FC.PwaModal && h(FC.PwaModal, {
      onClose: () => setShowPwaModal(false)
    }),

    // 6. GLOBAL TOAST NOTIFICATION
    toastMessage && h('div', {
      className: 'fixed bottom-6 inset-x-0 mx-auto max-w-sm bg-neutral-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-neutral-700 flex items-center justify-between space-x-3 z-50 animate-bounce'
    },
      h('div', { className: 'flex items-center space-x-2' },
        I.Sparkles ? h(I.Sparkles, { size: 16, className: 'text-orange-400 shrink-0' }) : null,
        h('span', { className: 'leading-snug' }, toastMessage)
      ),
      h('button', {
        onClick: () => setToastMessage(null),
        className: 'text-neutral-400 hover:text-white p-0.5 cursor-pointer'
      }, I.X ? h(I.X, { size: 14 }) : '✕')
    )
  );
}

export default App;

