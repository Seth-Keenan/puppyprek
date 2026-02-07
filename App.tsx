
// Fix: Removed invalid triple-slash reference to esm.sh types
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import UserDashboard from './components/UserDashboard';
import AIAssistant from './components/AIAssistant';
import Auth from './components/Auth';
import { User } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'services' | 'dashboard' | 'chat' | 'login'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Persistence check on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jet_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load user session:", e);
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('jet_user', JSON.stringify(user));
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('jet_user');
    setView('home');
  };

  const handleProtectedNavigation = (targetView: 'dashboard' | 'chat') => {
    // Chat is now public. Only dashboard requires a login.
    if (targetView === 'dashboard' && !currentUser) {
      setView('login');
    } else {
      setView(targetView);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero 
              onStart={() => setView('services')} 
              onLoginClick={() => setView('login')}
            />
            
            <section className="py-24 bg-white overflow-hidden border-t border-gray-50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                      <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-50 rounded-full blur-3xl opacity-60"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800" 
                        alt="Trainer working with dog" 
                        className="rounded-[48px] shadow-2xl relative z-10 border-8 border-white"
                      />
                      <div className="absolute -bottom-10 -right-8 p-10 glass-card rounded-[32px] shadow-2xl z-20 max-w-xs border border-white/50">
                         <p className="text-brand-900 font-display font-bold italic leading-relaxed text-lg">
                           "The results were transformative. Our puppy is now the best-behaved dog on the block."
                         </p>
                         <p className="text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest">— The Miller Family</p>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                        Science-Based <br/><span className="gradient-text">Excellence</span> in Education
                      </h2>
                      <p className="text-gray-500 text-lg mb-12 font-medium leading-relaxed">
                        We prioritize positive reinforcement and developmental psychology to help your puppy reach their full potential.
                      </p>
                      <div className="space-y-10">
                         <div className="flex gap-6">
                            <div className="flex-shrink-0 w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 font-bold text-xl shadow-sm">01</div>
                            <div>
                               <h4 className="text-2xl font-bold mb-2 text-gray-900">Psychology First</h4>
                               <p className="text-gray-500 leading-relaxed font-medium">Understanding the 'why' behind the behavior allows for lasting change without intimidation.</p>
                            </div>
                         </div>
                         <div className="flex gap-6">
                            <div className="flex-shrink-0 w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 font-bold text-xl shadow-sm">02</div>
                            <div>
                               <h4 className="text-2xl font-bold mb-2 text-gray-900">Intimate Setting</h4>
                               <p className="text-gray-500 leading-relaxed font-medium">Our class sizes are limited to ensure every dog receives individual attention from our master trainers.</p>
                            </div>
                         </div>
                      </div>
                    </div>
                 </div>
               </div>
            </section>

            <Services />

            <section className="bg-brand-900 py-24 text-white overflow-hidden relative">
               <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10 text-center">
                  <div>
                    <div className="text-5xl font-display font-bold mb-3">1.2k+</div>
                    <div className="text-brand-300 font-bold uppercase tracking-widest text-xs">Graduates</div>
                  </div>
                  <div>
                    <div className="text-5xl font-display font-bold mb-3">15+</div>
                    <div className="text-brand-300 font-bold uppercase tracking-widest text-xs">Expert Trainers</div>
                  </div>
                  <div>
                    <div className="text-5xl font-display font-bold mb-3">4.9</div>
                    <div className="text-brand-300 font-bold uppercase tracking-widest text-xs">Google Star Rating</div>
                  </div>
                  <div>
                    <div className="text-5xl font-display font-bold mb-3">10y</div>
                    <div className="text-brand-300 font-bold uppercase tracking-widest text-xs">Field Experience</div>
                  </div>
               </div>
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                  <span className="text-[400px] transform -rotate-12">🐾</span>
               </div>
            </section>
          </>
        );
      case 'services':
        return (
          <div className="pt-24 min-h-screen">
            <Services />
          </div>
        );
      case 'dashboard':
        return currentUser ? <UserDashboard user={currentUser} /> : <Auth onLogin={handleLogin} onBackToHome={() => setView('home')} />;
      case 'chat':
        // Chat is now unblocked for guest users
        return <AIAssistant />;
      case 'login':
        return <Auth onLogin={handleLogin} onBackToHome={() => setView('home')} />;
      default:
        return <Hero onStart={() => setView('services')} onLoginClick={() => setView('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900 flex flex-col">
      <Navbar onNavClick={setView} activeView={view} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-gray-950 text-white py-24 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-16 border-b border-gray-800/50 pb-20 mb-12">
            <div className="col-span-2">
               <div className="flex items-center mb-8">
                <span className="text-4xl mr-3">🐕</span>
                <span className="font-display font-bold text-3xl tracking-tight">
                  Jet's <span className="text-brand-400">Puppy Pre-K</span>
                </span>
              </div>
              <p className="text-gray-400 max-w-sm mb-10 leading-relaxed text-lg font-medium">
                Premier canine education since 2014. We foster a lifelong bond between owners and their dogs through science and empathy.
              </p>
              <div className="flex space-x-6">
                 {['IG', 'FB', 'TW', 'YT'].map(social => (
                   <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-brand-600 hover:border-brand-500 transition-all font-bold text-xs">
                     {social}
                   </a>
                 ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-8 tracking-tight">Explore</h4>
              <ul className="space-y-6 text-gray-400 font-bold uppercase tracking-[0.1em] text-[11px]">
                <li><a href="#" onClick={() => setView('services')} className="hover:text-brand-400 transition-colors">Programs</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Class Schedule</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Boarding</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Our Team</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8 tracking-tight">Join Our Pack</h4>
              <p className="text-gray-400 text-sm mb-6 font-medium">Subscribe for weekly training insights and exclusive event invites.</p>
              <div className="flex group">
                <input type="email" placeholder="Email" className="bg-gray-900 border border-gray-800 px-5 py-3 rounded-l-2xl w-full focus:outline-none focus:border-brand-500 transition-colors" />
                <button className="bg-brand-600 px-6 py-3 rounded-r-2xl font-bold hover:bg-brand-700 transition-colors">Sign Up</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">
            <p>© 2024 Jet's Puppy Pre-K & Training. All Rights Reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Terms</a>
               <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>

      <button 
        onClick={() => setView('chat')}
        className={`fixed bottom-8 right-8 w-20 h-20 bg-brand-600 text-white rounded-[32px] shadow-[0_20px_40px_rgba(14,165,233,0.3)] flex items-center justify-center hover:bg-brand-700 transition-all hover:scale-110 active:scale-95 z-40 group ${view === 'chat' ? 'hidden' : ''}`}
      >
        <span className="text-3xl group-hover:animate-bounce">💬</span>
        <div className="absolute bottom-full right-0 mb-5 bg-white text-brand-900 px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 whitespace-nowrap border border-brand-100 pointer-events-none">
          Ask Jet Assistant
        </div>
      </button>
    </div>
  );
};

export default App;