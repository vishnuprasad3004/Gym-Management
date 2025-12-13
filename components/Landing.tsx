import React from 'react';
import { ViewState } from '../types';
import { Dumbbell, ArrowRight, BarChart3, Users, LayoutDashboard } from 'lucide-react';

interface LandingProps {
  onNavigate: (view: ViewState) => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Dumbbell size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Fitness Pro</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate(ViewState.LOGIN)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2"
          >
            Admin Login
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[85vh]">
        <div className="absolute top-0 w-full h-full bg-center bg-cover opacity-20" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')"
          }}>
          <span className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        
        <div className="container relative mx-auto px-6">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <div className="inline-block px-4 py-2 mb-6 bg-blue-900/50 border border-blue-500 rounded-full text-blue-200 text-sm font-semibold tracking-wide uppercase">
                   Professional Management Suite
                </div>
                <h1 className="text-white font-bold text-5xl sm:text-7xl tracking-tight leading-tight mb-6">
                  Data-Driven <span className="text-blue-500">Fitness Management</span>
                </h1>
                <p className="mt-4 text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  The ultimate dashboard for gym owners and administrators. Track revenue, monitor attendance, and optimize operations with real-time analytics.
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => onNavigate(ViewState.LOGIN)}
                    className="bg-white hover:bg-gray-100 text-slate-900 text-lg font-bold px-8 py-4 rounded-xl transition-all shadow-xl flex items-center gap-2"
                  >
                    Enter Dashboard
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="pb-20 bg-slate-900 -mt-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-colors shadow-lg">
              <div className="text-white p-3 inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-xl bg-blue-600">
                <LayoutDashboard size={28} />
              </div>
              <h6 className="text-xl font-bold text-white mb-2">Central Admin</h6>
              <p className="mt-2 text-slate-400">
                A single, powerful interface to control every aspect of your fitness center, from staff to memberships.
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-colors shadow-lg">
              <div className="text-white p-3 inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-xl bg-purple-600">
                <BarChart3 size={28} />
              </div>
              <h6 className="text-xl font-bold text-white mb-2">Advanced Analytics</h6>
              <p className="mt-2 text-slate-400">
                Visualize growth trends, revenue reports, and member retention rates with interactive charts.
              </p>
            </div>

             <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-green-500/50 transition-colors shadow-lg">
              <div className="text-white p-3 inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-xl bg-green-600">
                <Users size={28} />
              </div>
              <h6 className="text-xl font-bold text-white mb-2">Member Growth</h6>
              <p className="mt-2 text-slate-400">
                Track BMI, attendance, and fitness goals to provide personalized value and reduce churn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-8 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500">© 2024 Fitness Pro Admin. Built for Analytics & Performance.</p>
        </div>
      </footer>
    </div>
  );
};
