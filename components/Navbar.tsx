
import React, { useState } from 'react';

interface NavbarProps {
  onNavClick: (view: 'home' | 'services' | 'dashboard' | 'chat') => void;
  activeView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: ('home' | 'services' | 'dashboard' | 'chat')[] = ['home', 'services', 'dashboard', 'chat'];

  const handleLinkClick = (view: 'home' | 'services' | 'dashboard' | 'chat') => {
    onNavClick(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleLinkClick('home')}
          >
            <span className="text-3xl mr-2 group-hover:scale-110 transition-transform">🐕</span>
            <span className="font-display font-bold text-2xl tracking-tight text-brand-900">
              Jet's <span className="text-brand-600">Puppy Pre-K</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleLinkClick(item)}
                className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-brand-600 ${
                  activeView === item ? 'text-brand-600' : 'text-gray-500'
                }`}
              >
                {item}
                <div className={`h-0.5 bg-brand-600 transition-all duration-300 ${activeView === item ? 'w-full mt-1' : 'w-0'}`}></div>
              </button>
            ))}
            <button className="bg-brand-600 text-white px-7 py-3 rounded-2xl text-sm font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 active:scale-95">
              Book a Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 p-2 focus:outline-none"
                aria-label="Toggle menu"
             >
               {isMenuOpen ? (
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               ) : (
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                 </svg>
               )}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Drawer Content */}
        <div className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-[0_0_50px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out p-8 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-display font-bold text-xl text-brand-900">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleLinkClick(item)}
                className={`flex items-center justify-between p-5 rounded-2xl text-lg font-bold transition-all ${
                  activeView === item ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="capitalize">{item}</span>
                {activeView === item && <span className="w-2 h-2 bg-brand-600 rounded-full"></span>}
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <button className="w-full bg-brand-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-100 active:scale-95">
              Book a Trial
            </button>
            <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest pt-4">
              Jet's Puppy Pre-K © 2024
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
