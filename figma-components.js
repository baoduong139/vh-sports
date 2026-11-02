// VH Sports - Figma Workspace Components (v2.0)
(function() {
  const React = window.React;
  const { useState, useEffect, useRef } = React;
  const h = React.createElement;
  const I = window.VHIcons;

  // ==========================================
  // TOP TOOLBAR (Figma Style Dark Header)
  // ==========================================
  function FigmaToolbar({
    viewMode,
    setViewMode,
    zoom,
    setZoom,
    onFitToScreen,
    onResetZoom,
    activeTool,
    setActiveTool,
    showWires,
    setShowWires,
    showToast,
    collaborators,
    onOpenDeploy,
    onOpenPwa
  }) {
    const [showZoomMenu, setShowZoomMenu] = useState(false);

    return h('div', {
      className: 'h-13 bg-[#1e1e1e] text-white border-b border-neutral-800 px-3 flex items-center justify-between select-none z-40 shrink-0 shadow-md font-sans'
    },
      // LEFT SECTION: Menu, File Name, Tools
      h('div', { className: 'flex items-center space-x-2.5' },
        // Figma Logo Button
        h('button', {
          onClick: () => showToast('VH Sports - Design System & E-Commerce Flow v4.0'),
          className: 'p-1.5 hover:bg-neutral-800 rounded-lg transition-colors'
        }, h(I.FigmaLogo, { size: 18 })),

        // File Title & Breadcrumb
        h('div', { className: 'hidden sm:flex flex-col' },
          h('div', { className: 'flex items-center space-x-1.5' },
            h('span', { className: 'font-bold text-xs text-neutral-100 tracking-tight hover:underline cursor-pointer' },
              'VH Sports - E-Commerce App & Figma Canvas'
            ),
            h('span', { className: 'text-[9px] bg-neutral-800 text-amber-400 font-semibold px-1.5 py-0.2 rounded border border-neutral-700' }, 'v4.0')
          ),
          h('div', { className: 'text-[10px] text-neutral-400 flex items-center space-x-1' },
            h('span', null, 'TikTok + Shopee + Lazada Architecture'),
            h('span', null, '•'),
            h('span', { className: 'text-emerald-400 font-medium' }, 'Live Store Ready')
          )
        ),

        // Vertical divider
        h('div', { className: 'h-5 w-px bg-neutral-800 hidden md:block' }),

        // Figma Canvas Tools: Move (V), Hand (H), Wire toggle (only relevant when on canvas)
        viewMode === 'canvas' && h('div', { className: 'hidden lg:flex items-center bg-neutral-900 rounded-lg p-0.5 border border-neutral-800' },
          h('button', {
            title: 'Công cụ Chọn / Tương tác (V)',
            onClick: () => setActiveTool('select'),
            className: `p-1.5 rounded-md text-xs transition-all ${
              activeTool === 'select' ? 'bg-blue-600 text-white shadow-2xs' : 'text-neutral-400 hover:text-white'
            }`
          }, h(I.MovePointer, { size: 15 })),
          h('button', {
            title: 'Công cụ Kéo Canvas (H)',
            onClick: () => setActiveTool('hand'),
            className: `p-1.5 rounded-md text-xs transition-all ${
              activeTool === 'hand' ? 'bg-blue-600 text-white shadow-2xs' : 'text-neutral-400 hover:text-white'
            }`
          }, h(I.Hand, { size: 15 })),
          h('button', {
            title: showWires ? 'Ẩn dây nối luồng Prototype' : 'Hiện dây nối luồng Prototype (F)',
            onClick: () => setShowWires(!showWires),
            className: `px-2 py-1 rounded-md text-[11px] font-bold transition-all flex items-center space-x-1 ${
              showWires ? 'bg-purple-600 text-white shadow-2xs' : 'text-neutral-400 hover:text-white'
            }`
          },
            h(I.WireConnector, { size: 14 }),
            h('span', { className: 'hidden xl:inline' }, 'Dây nối Flow')
          )
        )
      ),

      // CENTER SECTION: View Mode Switcher (Web Thật vs Canvas vs Prototype)
      h('div', { className: 'flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800 shadow-inner' },
        // 1. Web Thật (Edge-to-Edge E-Commerce App)
        h('button', {
          onClick: () => {
            setViewMode('live');
            showToast('Chuyển sang: Trải nghiệm Web Thật (Edge-to-Edge Responsive)');
          },
          className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
            viewMode === 'live'
              ? 'bg-[#FF6600] text-white shadow-md shadow-orange-500/20 ring-1 ring-orange-400/40'
              : 'text-orange-400 hover:text-orange-300 hover:bg-neutral-800/60'
          }`
        },
          h(I.ShoppingBag, { size: 13 }),
          h('span', { className: 'hidden sm:inline font-extrabold' }, '🛍️ Web Thật'),
          h('span', { className: 'sm:hidden font-extrabold' }, 'Web')
        ),

        // 2. Figma Canvas (8 Artboards)
        h('button', {
          onClick: () => {
            setViewMode('canvas');
            showToast('Chuyển sang: Không gian Figma Canvas (8 Artboard)');
          },
          className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
            viewMode === 'canvas'
              ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-neutral-700'
              : 'text-neutral-400 hover:text-neutral-200'
          }`
        },
          h(I.Layers, { size: 13 }),
          h('span', { className: 'hidden md:inline' }, '🎨 Canvas (8 Artboard)'),
          h('span', { className: 'md:hidden' }, 'Canvas')
        ),

        // 3. Interactive Prototype (iPhone frame)
        h('button', {
          onClick: () => {
            setViewMode('prototype');
            showToast('Chuyển sang: Trình phát Prototype (Mô phỏng điện thoại)');
          },
          className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
            viewMode === 'prototype'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
              : 'text-blue-400 hover:text-blue-300 hover:bg-neutral-800/60'
          }`
        },
          h(I.Play, { size: 12, fill: 'currentColor' }),
          h('span', { className: 'hidden md:inline' }, '📱 Prototype'),
          h('span', { className: 'md:hidden' }, 'App')
        )
      ),

      // RIGHT SECTION: Deploy, PWA, Zoom, Collaborators
      h('div', { className: 'flex items-center space-x-2' },
        // Online Deploy Button
        h('button', {
          onClick: onOpenDeploy,
          title: 'Xem hướng dẫn đưa web lên mạng (Vercel, Netlify, Cloudflare)',
          className: 'px-2.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-lg transition-all shadow-xs flex items-center space-x-1'
        },
          h(I.Sparkles, { size: 13 }),
          h('span', { className: 'hidden lg:inline' }, 'Deploy Online'),
          h('span', { className: 'lg:hidden' }, 'Deploy')
        ),

        // PWA Install Button
        h('button', {
          onClick: onOpenPwa,
          title: 'Cài đặt thành ứng dụng di động PWA (Add to Home Screen)',
          className: 'hidden sm:flex px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white font-bold text-xs rounded-lg transition-all items-center space-x-1'
        },
          h(I.Smartphone, { size: 13 }),
          h('span', { className: 'hidden xl:inline' }, 'Cài PWA')
        ),

        // Zoom controls (Only when on Canvas)
        viewMode === 'canvas' && h('div', { className: 'relative flex items-center bg-neutral-900 rounded-lg p-0.5 border border-neutral-800 text-xs hidden md:flex' },
          h('button', {
            onClick: () => setZoom(prev => Math.max(0.25, Math.round((prev - 0.1) * 10) / 10)),
            className: 'p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800',
            title: 'Thu nhỏ (-)'
          }, h(I.ZoomOut, { size: 14 })),
          h('button', {
            onClick: () => setShowZoomMenu(!showZoomMenu),
            className: 'px-2 py-1 font-mono font-bold text-neutral-300 hover:text-white min-w-14 text-center'
          }, `${Math.round(zoom * 100)}%`),
          h('button', {
            onClick: () => setZoom(prev => Math.min(2.5, Math.round((prev + 0.1) * 10) / 10)),
            className: 'p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800',
            title: 'Phóng to (+)'
          }, h(I.ZoomIn, { size: 14 })),

          // Zoom Dropdown Presets
          showZoomMenu && h('div', {
            className: 'absolute top-full right-0 mt-1 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl py-1.5 w-36 z-50 text-xs'
          },
            [0.25, 0.5, 0.75, 1.0, 1.25].map(val => h('button', {
              key: val,
              onClick: () => { setZoom(val); setShowZoomMenu(false); },
              className: `w-full text-left px-3 py-1 hover:bg-neutral-800 font-mono ${
                Math.round(zoom * 100) === Math.round(val * 100) ? 'text-blue-400 font-bold' : 'text-neutral-300'
              }`
            }, `${Math.round(val * 100)}%`)),
            h('div', { className: 'border-t border-neutral-800 my-1' }),
            h('button', {
              onClick: () => { onFitToScreen(); setShowZoomMenu(false); },
              className: 'w-full text-left px-3 py-1 hover:bg-neutral-800 text-neutral-300 flex items-center justify-between'
            },
              h('span', null, 'Vừa màn hình'),
              h('span', { className: 'text-[10px] text-neutral-500' }, 'Shift+1')
            ),
            h('button', {
              onClick: () => { onResetZoom(); setShowZoomMenu(false); },
              className: 'w-full text-left px-3 py-1 hover:bg-neutral-800 text-neutral-300 flex items-center justify-between'
            },
              h('span', null, 'Chuẩn 100%'),
              h('span', { className: 'text-[10px] text-neutral-500' }, 'Shift+0')
            )
          )
        ),

        // Share Link Button
        h('button', {
          onClick: () => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
            }
            showToast('Đã sao chép link truy cập vào Clipboard!');
          },
          title: 'Sao chép liên kết web',
          className: 'p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white rounded-lg transition-colors'
        }, h(I.Share2, { size: 14 }))
      )
    );
  }
// PROTOTYPE WIRES (Interactive SVG Connectors)
  // ==========================================
  function PrototypeWires({ artboards, visible }) {
    if (!visible) return null;

    // Connections between the 8 screens:
    // 1 (Trang chủ) -> 2 (Danh mục) & 3 (Giỏ hàng)
    // 2 (Danh mục) -> 3 (Giỏ hàng)
    // 3 (Giỏ hàng) -> 4 (Xác nhận đơn)
    // 4 (Xác nhận đơn) -> 5 (Chọn thanh toán)
    // 5 -> 6 (Cổng VietQR/MoMo)
    // 5 -> 7 (Nhập thẻ & Quản lý)
    // 5 -> 8 (COD Thành công)
    // 6 -> 8 (Xác nhận đã chuyển)
    // 7 -> 8 (Thanh toán thẻ thành công)
    // 8 -> 1 (Tiếp tục mua sắm)
    const connections = [
      {
        from: 1, to: 2,
        label: 'Khám phá Danh mục',
        color: '#0D99FF',
        start: { x: 80 + 393, y: 100 + 400 },
        end: { x: 520, y: 100 + 400 }
      },
      {
        from: 1, to: 3,
        label: 'Thêm vào giỏ',
        color: '#F97316',
        start: { x: 80 + 393, y: 100 + 600 },
        end: { x: 960, y: 100 + 400 }
      },
      {
        from: 2, to: 3,
        label: 'Chọn món -> Giỏ',
        color: '#0D99FF',
        start: { x: 520 + 393, y: 100 + 400 },
        end: { x: 960, y: 100 + 400 }
      },
      {
        from: 3, to: 4,
        label: 'Bấm Mua hàng',
        color: '#F97316',
        start: { x: 960 + 393, y: 100 + 780 },
        end: { x: 1400, y: 100 + 400 }
      },
      {
        from: 4, to: 5,
        label: 'Tiến hành thanh toán',
        color: '#0D99FF',
        start: { x: 1400 + 100, y: 100 + 852 },
        end: { x: 80 + 200, y: 1040 }
      },
      {
        from: 5, to: 6,
        label: 'Chọn VietQR / MoMo',
        color: '#EC4899',
        start: { x: 80 + 393, y: 1040 + 400 },
        end: { x: 520, y: 1040 + 400 }
      },
      {
        from: 5, to: 7,
        label: 'Chọn Thẻ Quốc Tế',
        color: '#6366F1',
        start: { x: 80 + 393, y: 1040 + 600 },
        end: { x: 960, y: 1040 + 400 }
      },
      {
        from: 5, to: 8,
        label: 'Chọn COD (Tiền mặt)',
        color: '#10B981',
        start: { x: 80 + 350, y: 1040 + 852 },
        end: { x: 1400 + 200, y: 1040 + 852 }
      },
      {
        from: 6, to: 8,
        label: 'Xác nhận chuyển QR',
        color: '#10B981',
        start: { x: 520 + 393, y: 1040 + 780 },
        end: { x: 1400, y: 1040 + 450 }
      },
      {
        from: 7, to: 8,
        label: 'Thanh toán thẻ thành công',
        color: '#10B981',
        start: { x: 960 + 393, y: 1040 + 780 },
        end: { x: 1400, y: 1040 + 550 }
      },
      {
        from: 8, to: 1,
        label: 'Tiếp tục mua sắm (Về trang chủ)',
        color: '#F97316',
        dashed: true,
        start: { x: 1400 + 200, y: 1040 },
        end: { x: 80 + 350, y: 100 + 852 }
      }
    ];

    return h('svg', {
      className: 'absolute inset-0 pointer-events-none z-15 overflow-visible',
      style: { width: 2200, height: 2100 }
    },
      h('defs', null,
        h('marker', {
          id: 'wire-arrow',
          viewBox: '0 0 10 10',
          refX: '6',
          refY: '5',
          markerWidth: '6',
          markerHeight: '6',
          orient: 'auto-start-reverse'
        },
          h('path', { d: 'M 0 1 L 8 5 L 0 9 z', fill: '#0D99FF' })
        ),
        h('marker', {
          id: 'wire-arrow-green',
          viewBox: '0 0 10 10',
          refX: '6',
          refY: '5',
          markerWidth: '6',
          markerHeight: '6',
          orient: 'auto-start-reverse'
        },
          h('path', { d: 'M 0 1 L 8 5 L 0 9 z', fill: '#10B981' })
        )
      ),

      connections.map((c, i) => {
        const dx = c.end.x - c.start.x;
        const dy = c.end.y - c.start.y;
        const cx1 = c.start.x + (dx > 0 ? Math.min(dx * 0.5, 200) : dx * 0.2);
        const cy1 = c.start.y + dy * 0.2;
        const cx2 = c.end.x - (dx > 0 ? Math.min(dx * 0.5, 200) : dx * 0.2);
        const cy2 = c.end.y - dy * 0.2;

        const pathD = `M ${c.start.x} ${c.start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${c.end.x} ${c.end.y}`;
        const midX = (c.start.x + c.end.x) / 2;
        const midY = (c.start.y + c.end.y) / 2;

        return h('g', { key: i, className: 'prototype-wire-group' },
          // Glow curve
          h('path', {
            d: pathD,
            fill: 'none',
            stroke: c.color,
            strokeWidth: 4,
            strokeOpacity: 0.15,
            strokeLinecap: 'round'
          }),
          // Main line
          h('path', {
            d: pathD,
            fill: 'none',
            stroke: c.color,
            strokeWidth: 2,
            strokeDasharray: c.dashed ? '6 6' : undefined,
            strokeOpacity: 0.85,
            markerEnd: c.color === '#10B981' ? 'url(#wire-arrow-green)' : 'url(#wire-arrow)'
          }),
          // Pulse dot
          h('circle', {
            r: 3.5,
            fill: c.color,
            className: 'animate-pulse'
          },
            h('animateMotion', {
              path: pathD,
              dur: '4s',
              repeatCount: 'indefinite'
            })
          ),
          // Connection Label Pill
          h('foreignObject', {
            x: midX - 70,
            y: midY - 12,
            width: 140,
            height: 24,
            className: 'overflow-visible pointer-events-auto'
          },
            h('div', {
              className: 'bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-300 shadow-xs text-center truncate select-none hover:scale-105 transition-transform'
            }, c.label)
          )
        );
      })
    );
  }

  // ==========================================
  // MINIMAP (Canvas Navigator in Bottom-Right)
  // ==========================================
  function MiniMap({ artboards, zoom, pan, onFocusArtboard }) {
    const [collapsed, setCollapsed] = useState(false);

    if (collapsed) {
      return h('button', {
        onClick: () => setCollapsed(false),
        className: 'absolute bottom-4 right-4 bg-neutral-900 text-neutral-300 hover:text-white p-2.5 rounded-xl border border-neutral-700 shadow-xl z-30 transition-all flex items-center space-x-1.5 text-xs font-bold'
      },
        h(I.Maximize2, { size: 14 }),
        h('span', null, 'Bản đồ Canvas')
      );
    }

    const scale = 0.08;
    const mapW = 1800 * scale;
    const mapH = 2000 * scale;

    return h('div', {
      className: 'absolute bottom-4 right-4 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-2xl p-2.5 shadow-2xl z-30 select-none text-white'
    },
      h('div', { className: 'flex items-center justify-between pb-1.5 border-b border-neutral-800 mb-2' },
        h('span', { className: 'text-[11px] font-bold text-neutral-300' }, 'Mini-Map (8 Màn hình)'),
        h('button', {
          onClick: () => setCollapsed(true),
          className: 'text-neutral-500 hover:text-neutral-300 p-0.5'
        }, h(I.X, { size: 13 }))
      ),
      h('div', {
        className: 'relative bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800',
        style: { width: mapW, height: mapH }
      },
        artboards.map(ab => h('div', {
          key: ab.id,
          onClick: () => onFocusArtboard(ab),
          title: ab.name,
          className: 'absolute rounded-xs bg-neutral-700 hover:bg-blue-500 cursor-pointer transition-colors border border-neutral-600',
          style: {
            left: ab.x * scale,
            top: ab.y * scale,
            width: 393 * scale,
            height: 852 * scale
          }
        },
          h('span', { className: 'text-[7px] text-white font-mono p-0.5 block leading-none truncate' }, ab.id)
        ))
      )
    );
  }

  // ==========================================
  // PROTOTYPE PLAYER (iPhone 16 Pro & Desktop View Switcher)
  // ==========================================
  function PrototypePlayer({
    currentScreenId,
    setCurrentScreenId,
    onClose,
    ctx
  }) {
    const [deviceType, setDeviceType] = useState('iphone'); // iphone | desktop | frameless

    const currentArtboard = window.VH_ARTBOARDS.find(a => a.id === currentScreenId) || window.VH_ARTBOARDS[0];
    const Component = currentArtboard.component;

    return h('div', {
      className: 'fixed inset-0 top-13 bg-[#0d0f12] z-50 flex flex-col overflow-hidden animate-fadeIn'
    },
      // Top Presentation Bar
      h('div', {
        className: 'h-12 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between text-white shrink-0 z-20'
      },
        // Left info
        h('div', { className: 'flex items-center space-x-3' },
          h('div', { className: 'flex items-center space-x-2' },
            h('span', { className: 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse' }),
            h('span', { className: 'font-bold text-xs text-neutral-200' }, 'Interactive Prototype'),
            h('span', { className: 'text-neutral-600' }, '•'),
            h('span', { className: 'text-xs text-blue-400 font-semibold' },
              `Màn hình ${currentArtboard.id}/8: ${currentArtboard.name}`
            )
          )
        ),

        // Center: Device Mockup Switcher (iPhone 16 Pro vs Desktop vs Không viền)
        h('div', { className: 'flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800' },
          h('button', {
            onClick: () => setDeviceType('iphone'),
            className: `px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              deviceType === 'iphone' ? 'bg-neutral-800 text-white shadow-2xs' : 'text-neutral-400 hover:text-white'
            }`
          },
            h(I.Smartphone, { size: 14 }),
            h('span', null, 'iPhone 16 Pro')
          ),
          h('button', {
            onClick: () => setDeviceType('desktop'),
            className: `px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              deviceType === 'desktop' ? 'bg-neutral-800 text-white shadow-2xs' : 'text-neutral-400 hover:text-white'
            }`
          },
            h(I.Laptop, { size: 14 }),
            h('span', null, 'Desktop View')
          ),
          h('button', {
            onClick: () => setDeviceType('frameless'),
            className: `px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              deviceType === 'frameless' ? 'bg-neutral-800 text-white shadow-2xs' : 'text-neutral-400 hover:text-white'
            }`
          },
            h(I.Maximize2, { size: 14 }),
            h('span', null, 'Không viền')
          )
        ),

        // Right actions: Restart, Exit
        h('div', { className: 'flex items-center space-x-2' },
          h('button', {
            onClick: () => {
              setCurrentScreenId(1);
              ctx.showToast('Đã khởi động lại luồng từ Trang chủ!');
            },
            title: 'Khởi động lại từ đầu (R)',
            className: 'px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg text-xs font-bold flex items-center space-x-1 transition-colors'
          },
            h(I.RotateCcw, { size: 13 }),
            h('span', { className: 'hidden sm:inline' }, 'Reset Flow')
          ),
          h('button', {
            onClick: onClose,
            className: 'p-1.5 bg-neutral-800 hover:bg-red-600 text-neutral-300 hover:text-white rounded-lg transition-colors'
          }, h(I.X, { size: 16 }))
        )
      ),

      // Device Stage Container
      h('div', {
        className: 'flex-1 overflow-y-auto flex items-center justify-center p-4 sm:p-6 custom-scrollbar'
      },
        deviceType === 'iphone' ? (
          // Realistic iPhone 16 Pro Chassis
          h('div', {
            className: 'relative my-auto rounded-[54px] p-3 shadow-2xl bg-gradient-to-b from-[#2a2d32] via-[#1a1c20] to-[#121316] border-4 border-[#3c3f46] ring-1 ring-white/10 transition-all select-none',
            style: { width: 420, height: 890 }
          },
            // Left Side buttons (Volume, Action)
            h('div', { className: 'absolute -left-5 top-28 w-1 h-12 bg-neutral-700 rounded-l-md' }),
            h('div', { className: 'absolute -left-5 top-44 w-1 h-14 bg-neutral-700 rounded-l-md' }),
            h('div', { className: 'absolute -left-5 top-62 w-1 h-14 bg-neutral-700 rounded-l-md' }),
            // Right Side button (Power)
            h('div', { className: 'absolute -right-5 top-36 w-1 h-20 bg-neutral-700 rounded-r-md' }),

            // Screen Inner Bezel
            h('div', {
              className: 'w-full h-full rounded-[44px] overflow-hidden bg-white relative shadow-inner'
            },
              h(Component, { ctx, onNavigate: (id) => setCurrentScreenId(id) })
            )
          )
        ) : deviceType === 'desktop' ? (
          // Realistic Desktop Macbook / Browser Mockup
          h('div', {
            className: 'relative my-auto rounded-2xl shadow-2xl bg-white border border-neutral-700/80 overflow-hidden flex flex-col',
            style: { width: '92%', maxWidth: 1080, height: '88%', maxHeight: 780 }
          },
            // Browser Chrome / Top Bar
            h('div', { className: 'h-10 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between shrink-0 select-none' },
              h('div', { className: 'flex items-center space-x-2' },
                h('div', { className: 'w-3 h-3 rounded-full bg-red-500/80' }),
                h('div', { className: 'w-3 h-3 rounded-full bg-amber-500/80' }),
                h('div', { className: 'w-3 h-3 rounded-full bg-emerald-500/80' })
              ),
              // URL Bar
              h('div', { className: 'bg-neutral-800/80 text-neutral-300 text-[11px] font-mono px-6 py-1 rounded-md border border-neutral-700 flex items-center space-x-2' },
                h(I.Lock, { size: 10, className: 'text-emerald-400' }),
                h('span', null, 'https://vhsports.local:3000/app')
              ),
              h('div', { className: 'text-neutral-500 text-xs' }, 'Desktop Safari')
            ),
            // Desktop Content Container
            h('div', { className: 'flex-1 overflow-hidden bg-slate-50 flex justify-center' },
              h('div', { className: 'w-full max-w-md h-full bg-white shadow-xl relative' },
                h(Component, { ctx, onNavigate: (id) => setCurrentScreenId(id) })
              )
            )
          )
        ) : (
          // Frameless Clean Screen
          h('div', {
            className: 'w-[400px] h-[860px] rounded-3xl overflow-hidden bg-white shadow-2xl border border-neutral-700 relative'
          },
            h(Component, { ctx, onNavigate: (id) => setCurrentScreenId(id) })
          )
        )
      ),

      // Bottom Screen Jump Navigator
      h('div', {
        className: 'h-14 bg-neutral-900 border-t border-neutral-800 px-4 flex items-center justify-between text-xs text-neutral-300 shrink-0 z-20 overflow-x-auto no-scrollbar'
      },
        h('span', { className: 'font-bold text-[11px] text-neutral-500 uppercase tracking-wider shrink-0 mr-3' }, 'Chuyển nhanh màn hình:'),
        h('div', { className: 'flex items-center space-x-1.5' },
          window.VH_ARTBOARDS.map(ab => h('button', {
            key: ab.id,
            onClick: () => setCurrentScreenId(ab.id),
            className: `px-2.5 py-1 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
              currentScreenId === ab.id
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`
          }, `${ab.id}. ${ab.name.split('.')[1] || ab.name}`))
        )
      )
    );
  }

  
  // ==========================================
  // DEPLOYMENT MODAL (Vercel, Netlify, Cloudflare, Localhost)
  // ==========================================
  function DeployModal({ onClose, showToast }) {
    const copyCmd = (txt, label) => {
      if (navigator.clipboard) navigator.clipboard.writeText(txt);
      showToast(`Đã sao chép lệnh: "${txt}"!`);
    };

    return h('div', {
      className: 'fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn font-sans'
    },
      h('div', {
        className: 'bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar'
      },
        // Modal Header
        h('div', { className: 'flex items-center justify-between pb-3 border-b border-slate-100' },
          h('div', { className: 'flex items-center space-x-2.5' },
            h('div', { className: 'w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20' },
              h(I.Sparkles, { size: 20 })
            ),
            h('div', null,
              h('h3', { className: 'font-extrabold text-base text-slate-900 tracking-tight' }, 'Hướng Dẫn Deploy Web Online'),
              h('p', { className: 'text-xs text-slate-500' }, 'Để bất kỳ ai, ở bất kỳ đâu cũng truy cập được VH Sports')
            )
          ),
          h('button', {
            onClick: onClose,
            className: 'p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100'
          }, h(I.X, { size: 18 }))
        ),

        // Method 1: Vercel
        h('div', { className: 'bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2' },
          h('div', { className: 'flex items-center justify-between' },
            h('div', { className: 'flex items-center space-x-2' },
              h('span', { className: 'w-5 h-5 rounded-md bg-black text-white text-[10px] font-black flex items-center justify-center' }, '▲'),
              h('h4', { className: 'font-extrabold text-xs text-slate-900' }, 'Cách 1: Deploy lên Vercel (Khuyên Dùng • Miễn Phí)')
            ),
            h('span', { className: 'text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded' }, 'Đã có vercel.json')
          ),
          h('p', { className: 'text-[11px] text-slate-600' },
            'Dự án đã có sẵn file vercel.json cấu hình SPA rewrite. Bạn chỉ cần mở terminal và chạy lệnh:'
          ),
          h('div', { className: 'flex items-center justify-between bg-slate-900 text-emerald-400 font-mono text-xs px-3 py-2 rounded-xl' },
            h('code', null, 'npx vercel --prod'),
            h('button', {
              onClick: () => copyCmd('npx vercel --prod', 'Vercel command'),
              className: 'p-1 hover:bg-slate-800 text-slate-300 rounded'
            }, h(I.Copy, { size: 14 }))
          ),
          h('p', { className: 'text-[10px] text-slate-500' }, 'Hoặc push code lên GitHub rồi kết nối tại vercel.com là xong ngay!')
        ),

        // Method 2: Netlify
        h('div', { className: 'bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2' },
          h('div', { className: 'flex items-center justify-between' },
            h('div', { className: 'flex items-center space-x-2' },
              h('span', { className: 'w-5 h-5 rounded-md bg-teal-600 text-white text-[10px] font-black flex items-center justify-center' }, 'N'),
              h('h4', { className: 'font-extrabold text-xs text-slate-900' }, 'Cách 2: Deploy lên Netlify (Kéo Thả 1 Giây)')
            ),
            h('span', { className: 'text-[9px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded' }, 'Đã có _redirects')
          ),
          h('p', { className: 'text-[11px] text-slate-600' },
            'Truy cập netlify.com ➡️ Kéo cả thư mục dự án "VH Sports" thả vào mục Deploy. Trang web sẽ trực tuyến trong 3 giây!'
          )
        ),

        // Method 3: Local Network (Android / iPhone chung Wi-Fi)
        h('div', { className: 'bg-blue-50/60 border border-blue-200 rounded-2xl p-3.5 space-y-2' },
          h('div', { className: 'flex items-center justify-between' },
            h('div', { className: 'flex items-center space-x-2' },
              h('span', { className: 'w-5 h-5 rounded-md bg-blue-600 text-white text-[10px] font-black flex items-center justify-center' }, 'Wi-Fi'),
              h('h4', { className: 'font-extrabold text-xs text-blue-900' }, 'Cách 3: Mở Ngay Trên Điện Thoại Cùng Mạng Wi-Fi')
            ),
            h('span', { className: 'text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded' }, '0.0.0.0:3000 Active')
          ),
          h('p', { className: 'text-[11px] text-blue-800' },
            'Server đang mở host 0.0.0.0. Trên điện thoại iOS/Android kết nối cùng Wi-Fi với máy tính, chỉ cần mở trình duyệt và gõ IP máy tính kèm cổng :3000.'
          ),
          h('div', { className: 'flex items-center justify-between bg-white text-slate-900 font-mono text-xs px-3 py-2 rounded-xl border border-blue-200' },
            h('code', null, 'http://vhsports.local:3000  hoặc  http://[IP-MAY-TINH]:3000'),
            h('button', {
              onClick: () => copyCmd('http://vhsports.local:3000', 'Local domain'),
              className: 'p-1 hover:bg-slate-100 text-slate-600 rounded'
            }, h(I.Copy, { size: 14 }))
          )
        ),

        // Bottom close button
        h('button', {
          onClick: onClose,
          className: 'w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all'
        }, 'Đã hiểu, đóng cửa sổ')
      )
    );
  }

  // ==========================================
  // PWA INSTALL MODAL (Add to Home Screen)
  // ==========================================
  function PwaModal({ onClose }) {
    return h('div', {
      className: 'fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn font-sans'
    },
      h('div', {
        className: 'bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4'
      },
        // Header
        h('div', { className: 'flex items-center justify-between pb-3 border-b border-slate-100' },
          h('div', { className: 'flex items-center space-x-2.5' },
            h('div', { className: 'w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20' },
              h(I.Smartphone, { size: 20 })
            ),
            h('div', null,
              h('h3', { className: 'font-extrabold text-base text-slate-900 tracking-tight' }, 'Cài Đặt App VH Sports (PWA)'),
              h('p', { className: 'text-xs text-slate-500' }, 'Trải nghiệm tràn viền toàn màn hình không có thanh địa chỉ')
            )
          ),
          h('button', {
            onClick: onClose,
            className: 'p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100'
          }, h(I.X, { size: 18 }))
        ),

        // iOS Instructions
        h('div', { className: 'bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2' },
          h('div', { className: 'font-extrabold text-xs text-slate-900 flex items-center space-x-1.5' },
            h('span', null, '🍎 Dành Cho iPhone / iPad (Safari):')
          ),
          h('ol', { className: 'list-decimal list-inside text-xs text-slate-600 space-y-1.5' },
            h('li', null, 'Bấm vào nút Chia sẻ (icon hình vuông có mũi tên chỉ lên ở đáy Safari).'),
            h('li', null, 'Cuộn xuống và chọn "Thêm vào MH chính" (Add to Home Screen).'),
            h('li', null, 'Bấm "Thêm" ở góc trên bên phải.')
          )
        ),

        // Android Instructions
        h('div', { className: 'bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2' },
          h('div', { className: 'font-extrabold text-xs text-slate-900 flex items-center space-x-1.5' },
            h('span', null, '🤖 Dành Cho Android (Google Chrome):')
          ),
          h('ol', { className: 'list-decimal list-inside text-xs text-slate-600 space-y-1.5' },
            h('li', null, 'Bấm vào icon menu 3 chấm ở góc trên bên phải Chrome.'),
            h('li', null, 'Chọn "Cài đặt ứng dụng" (Install app) hoặc "Thêm vào màn hình chính".'),
            h('li', null, 'Xác nhận để icon VH Sports xuất hiện trên màn hình điện thoại.')
          )
        ),

        h('button', {
          onClick: onClose,
          className: 'w-full py-2.5 bg-[#FF6600] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all'
        }, 'Đã hiểu')
      )
    );
  }

  // ==========================================
  // LIVE EDGE-TO-EDGE E-COMMERCE APP COMPONENT
  // ==========================================
  function LiveEdgeToEdgeApp({
    currentScreenId,
    setCurrentScreenId,
    ctx,
    onOpenDeploy,
    onOpenPwa
  }) {
    const [searchVal, setSearchVal] = useState('');
    const currentArtboard = window.VH_ARTBOARDS.find(a => a.id === currentScreenId) || window.VH_ARTBOARDS[0];
    const Component = currentArtboard.component;

    return h('div', { className: 'w-full min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans overflow-x-hidden' },
      // 1. Top Announcement Bar
      h('div', { className: 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-[11px] font-bold py-1.5 px-4 tracking-wide flex items-center justify-between shadow-2xs' },
        h('span', { className: 'hidden md:inline' }, '🔥 MÙA GIẢI 2026: GIẢM ĐẾN 44% CHO ĐỒ ĐÁ BANH & CẦU LÔNG'),
        h('div', { className: 'mx-auto flex items-center space-x-2' },
          h(I.Sparkles, { size: 14, className: 'text-amber-200' }),
          h('span', null, 'MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC CHO ĐƠN TỪ 0Đ • TẶNG VOUCHER SPORT50K'),
          h(I.Sparkles, { size: 14, className: 'text-amber-200' })
        ),
        h('div', { className: 'hidden lg:flex items-center space-x-3 text-[10px]' },
          h('button', { onClick: onOpenDeploy, className: 'hover:underline text-amber-100 flex items-center space-x-1 cursor-pointer' },
            h('span', null, '🚀 Deploy Web Online')
          ),
          h('span', null, '•'),
          h('button', { onClick: onOpenPwa, className: 'hover:underline text-amber-100 flex items-center space-x-1 cursor-pointer' },
            h('span', null, '📲 Cài PWA Mobile')
          )
        )
      ),

      // 2. Desktop Mega-Header (Visible on md and up)
      h('header', { className: 'hidden md:block bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs' },
        h('div', { className: 'max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6' },
          // Logo & Mall Tag
          h('div', {
            onClick: () => setCurrentScreenId(1),
            className: 'flex items-center space-x-3 cursor-pointer group'
          },
            h('div', { className: 'w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center text-white font-black text-base shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform' },
              'VH'
            ),
            h('div', null,
              h('div', { className: 'flex items-center space-x-1.5' },
                h('span', { className: 'font-black text-lg text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors' }, 'VH SPORTS'),
                h('span', { className: 'bg-red-600 text-white font-black text-[9px] px-1.5 py-0.2 rounded uppercase tracking-wider' }, 'Mall')
              ),
              h('div', { className: 'text-[11px] text-slate-500 font-medium' }, 'Official Flagship Store • 100% Chính Hãng')
            )
          ),

          // Search Bar with Auto-suggestions
          h('div', { className: 'flex-1 max-w-xl relative' },
            h('div', { className: 'relative flex items-center' },
              h('input', {
                type: 'text',
                value: searchVal,
                onChange: (e) => setSearchVal(e.target.value),
                placeholder: 'Tìm giày cỏ nhân tạo Nike, vợt Yonex Astrox 88D, áo Real...',
                className: 'w-full pl-4 pr-24 py-2 text-xs bg-slate-100 rounded-full border border-slate-200 focus:bg-white focus:border-blue-500 outline-none transition-all'
              }),
              h('button', {
                onClick: () => {
                  if (searchVal) ctx.showToast(`Đang tìm sản phẩm: "${searchVal}"`);
                },
                className: 'absolute right-1 top-1 bottom-1 px-4 bg-[#FF6600] hover:bg-[#EA580C] text-white rounded-full text-xs font-bold flex items-center space-x-1 shadow-2xs transition-all'
              },
                h(I.Search, { size: 14 }),
                h('span', null, 'Tìm')
              )
            ),
            // Hot keyword tags
            h('div', { className: 'flex items-center space-x-3 mt-1.5 text-[10px] text-slate-500' },
              h('span', { className: 'font-semibold text-slate-400' }, 'Gợi ý:'),
              ['Nike Vapor 16', 'Yonex Astrox', 'Áo Real 2026', 'Băng gối Pro-Fit'].map(kw => h('span', {
                key: kw,
                onClick: () => { setSearchVal(kw); ctx.showToast(`Đã chọn từ khóa: ${kw}`); },
                className: 'hover:text-[#FF6600] cursor-pointer'
              }, kw))
            )
          ),

          // Direct Actions & Profile
          h('div', { className: 'flex items-center space-x-4' },
            // Hotline
            h('div', { className: 'hidden xl:flex items-center space-x-2 text-xs' },
              h('div', { className: 'w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center' },
                h(I.MessageCircle, { size: 16 })
              ),
              h('div', null,
                h('div', { className: 'text-[10px] text-slate-400' }, 'Hotline 24/7'),
                h('div', { className: 'font-bold text-slate-800' }, '1900 6868')
              )
            ),

            // User Profile Pill (Clicks to Screen 7)
            h('button', {
              onClick: () => setCurrentScreenId(7),
              className: 'flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left'
            },
              h('img', {
                src: ctx.userProfile.avatar,
                className: 'w-8 h-8 rounded-full object-cover border border-slate-200'
              }),
              h('div', { className: 'hidden lg:block' },
                h('div', { className: 'text-xs font-bold text-slate-800' }, ctx.userProfile.name),
                h('div', { className: 'text-[10px] font-semibold text-blue-600' }, ctx.userProfile.tier)
              )
            ),

            // Cart Button (Clicks to Screen 3)
            h('button', {
              onClick: () => setCurrentScreenId(3),
              className: 'relative flex items-center space-x-2 bg-orange-50 hover:bg-orange-100 text-[#FF6600] px-3.5 py-2 rounded-xl transition-all shadow-2xs group cursor-pointer'
            },
              h('div', { className: 'relative' },
                h(I.ShoppingCart, { size: 20 }),
                ctx.cartCount > 0 && h('span', {
                  className: 'absolute -top-2 -right-2 bg-red-500 text-white font-black text-[9px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-bounce shadow-xs'
                }, ctx.cartCount)
              ),
              h('div', { className: 'text-left' },
                h('div', { className: 'text-[9px] text-slate-400 leading-tight font-medium' }, 'Giỏ hàng:'),
                h('div', { className: 'text-xs font-black text-[#FF6600]' }, window.formatVND(ctx.cartTotal))
              )
            )
          )
        ),

        // Secondary Navigation Tabs (Artboard Switcher bar)
        h('nav', { className: 'bg-slate-900 text-white px-4' },
          h('div', { className: 'max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2 text-xs font-bold' },
            h('div', { className: 'flex items-center space-x-1' },
              window.VH_ARTBOARDS.map(ab => {
                const active = currentScreenId === ab.id;
                return h('button', {
                  key: ab.id,
                  onClick: () => setCurrentScreenId(ab.id),
                  className: `px-3 py-1 rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#FF6600] text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                },
                  h('span', null, ab.name)
                );
              })
            ),
            h('div', { className: 'hidden lg:flex items-center space-x-3 text-[11px] text-slate-400' },
              h('span', { className: 'flex items-center space-x-1 text-emerald-400' },
                h(I.CheckCircle2, { size: 13 }),
                h('span', null, 'Đổi trả 30 ngày')
              ),
              h('span', { className: 'flex items-center space-x-1 text-amber-400' },
                h(I.Truck, { size: 13 }),
                h('span', null, 'Giao 2h nội thành')
              )
            )
          )
        )
      ),

      // 3. MAIN CONTENT AREA (Responsive Desktop or Mobile Bleed)
      h('main', { className: 'flex-1 max-w-7xl w-full mx-auto md:py-4 md:px-4' },
        // Breadcrumb on desktop
        h('div', { className: 'hidden md:flex items-center space-x-2 text-xs text-slate-500 mb-3 px-1' },
          h('span', { onClick: () => setCurrentScreenId(1), className: 'hover:text-blue-600 cursor-pointer' }, 'Trang chủ'),
          h('span', null, '/'),
          h('span', { className: 'font-bold text-slate-800' }, currentArtboard.name),
          h('span', { className: 'text-[10px] text-slate-400 font-mono ml-2' }, `[${currentArtboard.subtitle}]`)
        ),

        // Screen Frame
        h('div', { className: 'w-full bg-white md:rounded-3xl md:shadow-md md:border md:border-slate-200/80 overflow-hidden relative min-h-[640px]' },
          h(Component, {
            ctx,
            onNavigate: (targetId) => {
              setCurrentScreenId(targetId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          })
        )
      ),

      // 4. Desktop Footer
      h('footer', { className: 'hidden md:block bg-white border-t border-slate-200 mt-8 pt-8 pb-6 text-xs text-slate-600' },
        h('div', { className: 'max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100' },
          // Col 1
          h('div', null,
            h('div', { className: 'flex items-center space-x-2 mb-3' },
              h('div', { className: 'w-7 h-7 rounded-lg bg-[#FF6600] flex items-center justify-center text-white font-black text-xs' }, 'VH'),
              h('span', { className: 'font-black text-base text-slate-900 tracking-tight' }, 'VH SPORTS')
            ),
            h('p', { className: 'text-[11px] text-slate-500 leading-relaxed mb-3' },
              'Hệ thống phân phối trang thiết bị & thời trang thể thao chính hãng số 1 Việt Nam. Chuyên giày đá bóng sân cỏ nhân tạo, vợt cầu lông thi đấu, áo đấu câu lạc bộ Dri-Fit và phụ kiện bảo hộ thể thao.'
            ),
            h('div', { className: 'text-[11px] font-semibold text-slate-700' }, 'Hotline: 1900 6868 • Email: support@vhsports.vn')
          ),

          // Col 2
          h('div', null,
            h('h4', { className: 'font-extrabold text-sm text-slate-900 mb-3' }, 'Về VH Sports'),
            h('ul', { className: 'space-y-1.5 text-[11px] text-slate-500' },
              h('li', { className: 'hover:text-[#FF6600] cursor-pointer' }, 'Giới thiệu về VH-Mall'),
              h('li', { className: 'hover:text-[#FF6600] cursor-pointer' }, 'Cam kết chính hãng 100%'),
              h('li', { className: 'hover:text-[#FF6600] cursor-pointer' }, 'Hệ thống 18 cửa hàng toàn quốc'),
              h('li', { className: 'hover:text-[#FF6600] cursor-pointer' }, 'Chính sách bảo mật thanh toán PCI-DSS')
            )
          ),

          // Col 3
          h('div', null,
            h('h4', { className: 'font-extrabold text-sm text-slate-900 mb-3' }, 'Hỗ Trợ Khách Hàng'),
            h('ul', { className: 'space-y-1.5 text-[11px] text-slate-500' },
              h('li', { className: 'hover:text-[#FF6600] cursor-pointer' }, 'Hướng dẫn chọn size AI chuẩn xác'),
              h('li', { className: 'hover:text-[#FF6600] cursor-pointer' }, 'Chính sách đổi trả 30 ngày miễn phí'),
              h('li', { className: 'hover:text-[#FF6600] cursor-pointer' }, 'Chính sách bảo hành đan vợt & dán keo'),
              h('li', { className: 'hover:text-[#FF6600] cursor-pointer' }, 'Quy chế giao hàng 2h Express')
            )
          ),

          // Col 4
          h('div', null,
            h('h4', { className: 'font-extrabold text-sm text-slate-900 mb-3' }, 'Phương Thức Thanh Toán'),
            h('div', { className: 'flex flex-wrap gap-2 mb-3' },
              h('div', { className: 'p-1.5 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center' }, h(I.VietQRLogo, { size: 14 })),
              h('div', { className: 'p-1.5 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center' }, h(I.MoMoLogo, { size: 14 })),
              h('div', { className: 'p-1.5 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center' }, h(I.VisaLogo, { size: 14 })),
              h('div', { className: 'p-1.5 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center' }, h(I.MastercardLogo, { size: 14 }))
            ),
            h('div', { className: 'text-[11px] text-slate-500' }, 'Chứng nhận an toàn giao dịch Napas 24/7 & MoMo Business.')
          )
        ),

        // Bottom copyright
        h('div', { className: 'max-w-7xl mx-auto px-4 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400' },
          h('span', null, '© 2026 VH SPORTS. Thiết kế theo kiến trúc TikTok Shop + Shopee + Lazada & Figma Canvas.'),
          h('div', { className: 'flex space-x-4 mt-2 sm:mt-0' },
            h('span', null, 'Phiên bản v4.0 Edge-to-Edge Responsive'),
            h('span', null, '•'),
            h('span', { className: 'text-emerald-600 font-semibold' }, 'Trạng thái: Sẵn sàng Deploy Online')
          )
        )
      )
    );
  }
  window.FigmaComponents = {
    FigmaToolbar,
    PrototypeWires,
    MiniMap,
    PrototypePlayer,
    DeployModal,
    PwaModal,
    LiveEdgeToEdgeApp
  };
})();
