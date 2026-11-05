import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  HeartHandshake,
  Calendar,
  Image,
  Users,
  DollarSign,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
  User
} from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

export const AdminLayout = () => {
  const { admin, isAuthenticated, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner message="Verifying admin credentials..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Causes', path: '/admin/causes', icon: HeartHandshake },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Volunteers', path: '/admin/volunteers', icon: Users },
    { name: 'Donations', path: '/admin/donations', icon: DollarSign },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-seva-600 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base">Seva Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-seva-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white block leading-tight">Seva NGO</span>
                <span className="text-[11px] text-emerald-400 font-medium block">Control Center</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-seva-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="px-3 py-2 rounded-xl bg-slate-800/80 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-emerald-400">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden text-xs">
              <p className="font-semibold text-white truncate">{admin?.name || 'Administrator'}</p>
              <p className="text-slate-400 truncate">{admin?.email || 'admin@sevango.org'}</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col space-y-1 text-xs">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
