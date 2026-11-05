import React from 'react';

const categoryColorMap = {
  Education: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Food Distribution': 'bg-amber-50 text-amber-700 border-amber-200',
  Healthcare: 'bg-teal-50 text-teal-700 border-teal-200',
  'Women Empowerment': 'bg-rose-50 text-rose-700 border-rose-200',
  'Rural Development': 'bg-lime-50 text-lime-700 border-lime-200',
  'Elderly Care': 'bg-orange-50 text-orange-700 border-orange-200',
  'Community Service': 'bg-sky-50 text-sky-700 border-sky-200',
  Environment: 'bg-green-50 text-green-700 border-green-200',
  upcoming: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  ongoing: 'bg-sky-50 text-sky-700 border-sky-200',
  completed: 'bg-slate-100 text-slate-700 border-slate-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  successful: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  failed: 'bg-rose-50 text-rose-700 border-rose-200',
  contacted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  rejected: 'bg-slate-100 text-slate-600 border-slate-200',
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  paused: 'bg-amber-50 text-amber-700 border-amber-200'
};

export const Badge = ({ children, variant, size = 'sm', className = '' }) => {
  const colorClass = categoryColorMap[variant || children] || 'bg-slate-100 text-slate-700 border-slate-200';
  const sizeClass = size === 'xs' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${colorClass} ${sizeClass} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
