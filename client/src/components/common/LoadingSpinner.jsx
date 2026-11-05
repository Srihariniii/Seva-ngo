import React from 'react';

export const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[160px]">
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-full border-slate-200 border-t-seva-600 animate-spin`}
      />
      {message && <p className="mt-3 text-sm font-medium text-slate-500">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
