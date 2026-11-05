import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft, Key } from 'lucide-react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@sevango.org');
    setPassword('Admin@12345');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Seva NGO Public Site</span>
        </Link>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-seva-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-seva-600/30">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Admin Portal
        </h2>
        <p className="text-xs text-slate-400">
          Seva NGO Control Center &bull; Secure JWT Authentication
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-2xl border border-slate-100 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@sevango.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm flex items-center justify-center space-x-2 shadow-lg shadow-seva-600/20"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-seva-700 hover:text-seva-800 font-semibold inline-flex items-center space-x-1.5 bg-seva-50 px-3 py-1.5 rounded-lg border border-seva-100 transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Autofill Default Admin Credentials</span>
            </button>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              admin@sevango.org / Admin@12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
