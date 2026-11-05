import React from 'react';

export const ProgressBar = ({ current = 0, target = 100, height = 'h-2.5', showText = true }) => {
  const percentage = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;

  return (
    <div className="w-full">
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}>
        <div
          className="bg-gradient-to-r from-seva-500 to-seva-600 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-500 mt-2">
          <span>
            <strong className="text-slate-800">₹{Number(current).toLocaleString('en-IN')}</strong> raised
          </span>
          <span className="text-seva-700 font-bold">{percentage}%</span>
          <span>
            Goal: <strong className="text-slate-800">₹{Number(target).toLocaleString('en-IN')}</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
