// VH Sports - Complete Icon Set (React SVG Components v2.0)
(function() {
  const React = window.React;
  const h = React.createElement;

  function IconBase({ size = 20, className = '', children, ...props }) {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: `inline-block shrink-0 ${className}`,
      ...props
    }, children);
  }

  window.VHIcons = {
    // Camera Icon (Visual Search)
    Camera: (p) => h(IconBase, p,
      h('path', { d: 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z' }),
      h('circle', { cx: '12', cy: '13', r: '3' })
    ),

    // Support Chat Icon
    MessageCircle: (p) => h(IconBase, p,
      h('path', { d: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z' })
    ),

    // Sliders Filter
    SlidersHorizontal: (p) => h(IconBase, p,
      h('line', { x1: '21', y1: '4', x2: '14', y2: '4' }),
      h('line', { x1: '10', y1: '4', x2: '3', y2: '4' }),
      h('line', { x1: '21', y1: '12', x2: '12', y2: '12' }),
      h('line', { x1: '8', y1: '12', x2: '3', y2: '12' }),
      h('line', { x1: '21', y1: '20', x2: '16', y2: '20' }),
      h('line', { x1: '12', y1: '20', x2: '3', y2: '20' }),
      h('line', { x1: '14', y1: '2', x2: '14', y2: '6' }),
      h('line', { x1: '8', y1: '10', x2: '8', y2: '14' }),
      h('line', { x1: '16', y1: '18', x2: '16', y2: '22' })
    ),

    // Figma & Canvas UI
    FigmaLogo: (p) => h('svg', { width: p.size || 24, height: p.size || 24, viewBox: '0 0 38 57', fill: 'none', className: p.className },
      h('path', { d: 'M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z', fill: '#1ABCFE' }),
      h('path', { d: 'M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z', fill: '#0ACF83' }),
      h('path', { d: 'M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z', fill: '#FF7262' }),
      h('path', { d: 'M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z', fill: '#F24E1E' }),
      h('path', { d: 'M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z', fill: '#A259FF' })
    ),
    MovePointer: (p) => h(IconBase, p,
      h('path', { d: 'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z' }),
      h('path', { d: 'M13 13l6 6' })
    ),
    Hand: (p) => h(IconBase, p,
      h('path', { d: 'M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0' }),
      h('path', { d: 'M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2' }),
      h('path', { d: 'M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8' }),
      h('path', { d: 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15' })
    ),
    WireConnector: (p) => h(IconBase, p,
      h('circle', { cx: '5', cy: '6', r: '3' }),
      h('path', { d: 'M5 9v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V9' }),
      h('circle', { cx: '19', cy: '6', r: '3' })
    ),
    Play: (p) => h(IconBase, p, h('polygon', { points: '5 3 19 12 5 21 5 3', fill: 'currentColor' })),
    ZoomIn: (p) => h(IconBase, p,
      h('circle', { cx: '11', cy: '11', r: '8' }),
      h('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' }),
      h('line', { x1: '11', y1: '8', x2: '11', y2: '14' }),
      h('line', { x1: '8', y1: '11', x2: '14', y2: '11' })
    ),
    ZoomOut: (p) => h(IconBase, p,
      h('circle', { cx: '11', cy: '11', r: '8' }),
      h('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' }),
      h('line', { x1: '8', y1: '11', x2: '14', y2: '11' })
    ),
    Maximize2: (p) => h(IconBase, p,
      h('polyline', { points: '15 3 21 3 21 9' }),
      h('polyline', { points: '9 21 3 21 3 15' }),
      h('line', { x1: '21', y1: '3', x2: '14', y2: '10' }),
      h('line', { x1: '3', y1: '21', x2: '10', y2: '14' })
    ),
    RotateCcw: (p) => h(IconBase, p,
      h('polyline', { points: '1 4 1 10 7 10' }),
      h('path', { d: 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10' })
    ),
    Share2: (p) => h(IconBase, p,
      h('circle', { cx: '18', cy: '5', r: '3' }),
      h('circle', { cx: '6', cy: '12', r: '3' }),
      h('circle', { cx: '18', cy: '19', r: '3' }),
      h('line', { x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' }),
      h('line', { x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' })
    ),

    // App Navigation & Shop
    Search: (p) => h(IconBase, p,
      h('circle', { cx: '11', cy: '11', r: '8' }),
      h('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' })
    ),
    Bell: (p) => h(IconBase, p,
      h('path', { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }),
      h('path', { d: 'M13.73 21a2 2 0 0 1-3.46 0' })
    ),
    Home: (p) => h(IconBase, p,
      h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
      h('polyline', { points: '9 22 9 12 15 12 15 22' })
    ),
    User: (p) => h(IconBase, p,
      h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '12', cy: '7', r: '4' })
    ),
    ShoppingCart: (p) => h(IconBase, p,
      h('circle', { cx: '9', cy: '21', r: '1' }),
      h('circle', { cx: '20', cy: '21', r: '1' }),
      h('path', { d: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' })
    ),
    ShoppingBag: (p) => h(IconBase, p,
      h('path', { d: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' }),
      h('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
      h('path', { d: 'M16 10a4 4 0 0 1-8 0' })
    ),
    Heart: (p) => h(IconBase, p,
      h('path', { d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' })
    ),
    Mic: (p) => h(IconBase, p,
      h('path', { d: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' }),
      h('path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2' }),
      h('line', { x1: '12', y1: '19', x2: '12', y2: '23' }),
      h('line', { x1: '8', y1: '23', x2: '16', y2: '23' })
    ),
    Filter: (p) => h(IconBase, p,
      h('polygon', { points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' })
    ),
    ArrowLeft: (p) => h(IconBase, p,
      h('line', { x1: '19', y1: '12', x2: '5', y2: '12' }),
      h('polyline', { points: '12 19 5 12 12 5' })
    ),
    ArrowRight: (p) => h(IconBase, p,
      h('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
      h('polyline', { points: '12 5 19 12 12 19' })
    ),
    ChevronRight: (p) => h(IconBase, p,
      h('polyline', { points: '9 18 15 12 9 6' })
    ),
    ChevronDown: (p) => h(IconBase, p,
      h('polyline', { points: '6 9 12 15 18 9' })
    ),
    Check: (p) => h(IconBase, p,
      h('polyline', { points: '20 6 9 17 4 12' })
    ),
    X: (p) => h(IconBase, p,
      h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
      h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
    ),
    CheckCircle2: (p) => h(IconBase, p,
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('path', { d: 'm9 12 2 2 4-4' })
    ),
    XCircle: (p) => h(IconBase, p,
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('path', { d: 'm15 9-6 6' }),
      h('path', { d: 'm9 9 6 6' })
    ),
    AlertTriangle: (p) => h(IconBase, p,
      h('path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' }),
      h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
      h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
    ),
    MapPin: (p) => h(IconBase, p,
      h('path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }),
      h('circle', { cx: '12', cy: '10', r: '3' })
    ),
    Truck: (p) => h(IconBase, p,
      h('rect', { width: '16', height: '13', x: '1', y: '5', rx: '2' }),
      h('polygon', { points: '16 8 20 8 23 11 23 16 16 16 16 8' }),
      h('circle', { cx: '5.5', cy: '18.5', r: '2.5' }),
      h('circle', { cx: '18.5', cy: '18.5', r: '2.5' })
    ),
    Ticket: (p) => h(IconBase, p,
      h('path', { d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z' }),
      h('path', { d: 'M13 5v2' }),
      h('path', { d: 'M13 17v2' }),
      h('path', { d: 'M13 11v2' })
    ),
    Trash2: (p) => h(IconBase, p,
      h('path', { d: 'M3 6h18' }),
      h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
      h('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
      h('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
      h('line', { x1: '14', y1: '11', x2: '14', y2: '17' })
    ),
    Plus: (p) => h(IconBase, p,
      h('line', { x1: '12', y1: '5', x2: '12', y2: '19' }),
      h('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
    ),
    Minus: (p) => h(IconBase, p,
      h('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
    ),
    Copy: (p) => h(IconBase, p,
      h('rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }),
      h('path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' })
    ),
    RefreshCw: (p) => h(IconBase, p,
      h('path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' }),
      h('path', { d: 'M21 3v5h-5' }),
      h('path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' }),
      h('path', { d: 'M8 16H3v5' })
    ),
    ShieldCheck: (p) => h(IconBase, p,
      h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' }),
      h('path', { d: 'm9 12 2 2 4-4' })
    ),
    Lock: (p) => h(IconBase, p,
      h('rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2' }),
      h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
    ),
    CreditCard: (p) => h(IconBase, p,
      h('rect', { width: '20', height: '14', x: '2', y: '5', rx: '2' }),
      h('line', { x1: '2', y1: '10', x2: '22', y2: '10' })
    ),
    QrCode: (p) => h(IconBase, p,
      h('rect', { width: '5', height: '5', x: '3', y: '3', rx: '1' }),
      h('rect', { width: '5', height: '5', x: '16', y: '3', rx: '1' }),
      h('rect', { width: '5', height: '5', x: '3', y: '16', rx: '1' }),
      h('path', { d: 'M21 16h-3a2 2 0 0 0-2 2v3' }),
      h('path', { d: 'M21 21v.01' }),
      h('path', { d: 'M12 7v3a2 2 0 0 1-2 2H7' }),
      h('path', { d: 'M3 12h.01' }),
      h('path', { d: 'M12 3h.01' }),
      h('path', { d: 'M12 16v.01' }),
      h('path', { d: 'M16 12h1' }),
      h('path', { d: 'M21 12v.01' }),
      h('path', { d: 'M12 21v-1' })
    ),
    Clock: (p) => h(IconBase, p,
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('polyline', { points: '12 6 12 12 16 14' })
    ),
    Smartphone: (p) => h(IconBase, p,
      h('rect', { width: '14', height: '20', x: '5', y: '2', rx: '2', ry: '2' }),
      h('path', { d: 'M12 18h.01' })
    ),
    Laptop: (p) => h(IconBase, p,
      h('path', { d: 'M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' })
    ),
    Sparkles: (p) => h(IconBase, p,
      h('path', { d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' })
    ),
    Trophy: (p) => h(IconBase, p,
      h('path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6' }),
      h('path', { d: 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18' }),
      h('path', { d: 'M4 22h16' }),
      h('path', { d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' }),
      h('path', { d: 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' }),
      h('path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2Z' })
    ),
    Zap: (p) => h(IconBase, p,
      h('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })
    ),
    Flame: (p) => h(IconBase, p,
      h('path', { d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' })
    ),
    Activity: (p) => h(IconBase, p,
      h('polyline', { points: '22 12 18 12 15 21 9 3 6 12 2 12' })
    ),
    Dumbbell: (p) => h(IconBase, p,
      h('path', { d: 'm6.5 6.5 11 11' }),
      h('path', { d: 'm21 21-1-1a4 4 0 0 0-5.66 0l-.84.84a4 4 0 0 0 0 5.66l1 1' }),
      h('path', { d: 'm3 3 1 1a4 4 0 0 0 5.66 0l.84-.84a4 4 0 0 0 0-5.66L9.5 2.5' })
    ),
    Star: (p) => h(IconBase, { ...p, fill: p.fill || 'currentColor' },
      h('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
    ),
    Edit3: (p) => h(IconBase, p,
      h('path', { d: 'M12 20h9' }),
      h('path', { d: 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' })
    ),
    Layers: (p) => h(IconBase, p,
      h('polygon', { points: '12 2 2 7 12 12 22 7 12 2' }),
      h('polyline', { points: '2 17 12 22 22 17' }),
      h('polyline', { points: '2 12 12 17 22 12' })
    ),
    Volume2: (p) => h(IconBase, p,
      h('polygon', { points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }),
      h('path', { d: 'M15.54 8.46a5 5 0 0 1 0 7.07' }),
      h('path', { d: 'M19.07 4.93a10 10 0 0 1 0 14.14' })
    ),
    VolumeX: (p) => h(IconBase, p,
      h('polygon', { points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }),
      h('line', { x1: '23', y1: '9', x2: '17', y2: '15' }),
      h('line', { x1: '17', y1: '9', x2: '23', y2: '15' })
    ),
    Share2: (p) => h(IconBase, p,
      h('circle', { cx: '18', cy: '5', r: '3' }),
      h('circle', { cx: '6', cy: '12', r: '3' }),
      h('circle', { cx: '18', cy: '19', r: '3' }),
      h('line', { x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' }),
      h('line', { x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' })
    ),
    Gift: (p) => h(IconBase, p,
      h('polyline', { points: '20 12 20 22 4 22 4 12' }),
      h('rect', { width: '20', height: '5', x: '2', y: '7' }),
      h('line', { x1: '12', y1: '22', x2: '12', y2: '7' }),
      h('path', { d: 'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' }),
      h('path', { d: 'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' })
    ),

    // Payment Provider Logos
    MoMoLogo: (p) => h('div', {
      className: `inline-flex items-center justify-center font-black rounded-lg text-white bg-gradient-to-tr from-[#A50064] to-[#D82D8B] select-none shadow-xs ${p.className || 'w-8 h-8 text-xs'}`
    }, 'm'),

    VietQRLogo: (p) => h('div', {
      className: `inline-flex items-center justify-center font-bold rounded-lg text-white bg-gradient-to-r from-[#0054A6] to-[#009FE3] select-none px-2 py-0.5 tracking-tighter text-xs shadow-xs ${p.className || ''}`
    }, 'VietQR'),

    VisaLogo: (p) => h('div', {
      className: `inline-flex items-center justify-center font-black italic tracking-tighter text-[#1A1F71] bg-white rounded border border-slate-200 px-1.5 py-0.5 text-xs select-none shadow-xs ${p.className || ''}`
    }, 'VISA'),

    MastercardLogo: (p) => h('div', {
      className: `inline-flex items-center justify-center relative select-none ${p.className || 'w-8 h-5'}`
    },
      h('div', { className: 'w-4 h-4 rounded-full bg-[#EB001B] opacity-90' }),
      h('div', { className: 'w-4 h-4 rounded-full bg-[#F79E1B] opacity-90 -ml-2' })
    ),

    JCBLogo: (p) => h('div', {
      className: `inline-flex items-center justify-center font-bold text-white rounded bg-[#0A3D91] px-1.5 py-0.5 text-[10px] select-none shadow-xs ${p.className || ''}`
    }, 'JCB'),

    CODLogo: (p) => h('div', {
      className: `inline-flex items-center justify-center font-extrabold text-emerald-700 bg-emerald-100 rounded px-1.5 py-0.5 text-xs select-none ${p.className || ''}`
    }, 'COD')
  };
})();
