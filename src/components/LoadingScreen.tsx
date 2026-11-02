import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#1e1e1e] text-white space-y-4 select-none">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center font-black text-2xl shadow-lg shadow-orange-500/20 animate-pulse">
        VH
      </div>
      <div className="text-center space-y-1">
        <h2 className="text-base font-bold tracking-tight text-white">Đang tải VH Sports Store & Figma Canvas...</h2>
        <p className="text-xs text-neutral-400">VH Sports - TikTok Shop + Shopee + Lazada Architecture (v4.0)</p>
      </div>
      <div className="w-48 h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-gradient-to-r from-orange-500 to-blue-500 animate-pulse rounded-full w-3/4"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
