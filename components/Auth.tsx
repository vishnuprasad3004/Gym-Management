import React, { useState } from 'react';
import { ViewState, User } from '../types';
import { Dumbbell, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

interface AuthProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ currentView, onNavigate, onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = () => {
    setLoading(true);
    // Simulate secure admin handshake
    setTimeout(() => {
      setLoading(false);
      onLogin({
        id: 'admin-001',
        email: 'admin@fitnesspro.com',
        name: 'Administrator',
        role: 'admin',
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={() => onNavigate(ViewState.LANDING)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Landing</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 z-10 mx-4 border-t-4 border-blue-600">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-6 shadow-sm">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 mt-3 text-lg">
            Secure access for Fitness Pro management.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 text-center">
              <strong>Note:</strong> You are accessing sensitive analytics and member data. Please ensure you are authorized.
            </p>
          </div>

          <button
            onClick={handleAdminLogin}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 transform hover:-translate-y-1"
          >
            {loading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                <Dumbbell size={20} />
                Access Dashboard
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest">
            Fitness Pro v2.0 • Data Analytics Suite
          </p>
        </div>
      </div>
    </div>
  );
};
