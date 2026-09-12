import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Layers, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Lock, Mail, User as UserIcon } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const data = await api.login(email, password);
        login(data.token, data.user, data.profile, data.hasPersonalizedCurriculum);
      } else {
        const data = await api.register(name, email, password);
        login(data.token, data.user, undefined, false);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 mb-4">
          <Layers className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
          SkillUp<span className="text-blue-600"> AI</span>
        </h1>
        <p className="mt-1 text-sm text-slate-600 font-medium">
          Personalized Evolving Curriculum for Engineering Students
        </p>
        <p className="text-xs text-slate-400 mt-1 italic">
          "College gives you one curriculum. SkillUp evolves it for YOU."
        </p>
      </div>

      {/* Auth Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Tab Switcher */}
          <div className="flex border-b border-slate-200 mb-6">
            <button
              onClick={() => { setIsLogin(true); setError(null); }}
              className={`flex-1 pb-3 text-center text-sm font-semibold transition-colors relative ${
                isLogin ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
              {isLogin && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>}
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(null); }}
              className={`flex-1 pb-3 text-center text-sm font-semibold transition-colors relative ${
                !isLogin ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
              {!isLogin && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start space-x-2">
              <span className="font-semibold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Sharma"
                    className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College / Personal Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@engineering.edu"
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                <span>{isLoading ? 'Processing...' : isLogin ? 'Sign In to SkillUp' : 'Start My Evolution'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </form>

          {/* Quick Demo Hint */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500">
              Works dynamically with <strong className="text-slate-800">Mechanical, Civil, ECE, EEE, CSE, Aerospace, Biotech, Mechatronics,</strong> and any other engineering branch!
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
