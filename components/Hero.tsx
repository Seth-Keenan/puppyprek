
import React from 'react';

interface HeroProps {
  onStart: () => void;
  onLoginClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onLoginClick }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 -mr-20 mt-20 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-50"></div>
         <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-6 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
              Now Enrolling: Summer Puppy Programs
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 leading-tight mb-6">
              Elite Training for Your <span className="text-brand-600 italic">Best Friend</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Jet's Puppy Pre-K provides science-based, luxury education for the modern dog. Our positive-reinforcement methods ensure a lifelong bond.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-brand-600 text-white rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 transform hover:-translate-y-1"
              >
                Explore Programs
              </button>
              <button 
                onClick={onLoginClick}
                className="px-8 py-4 bg-white text-brand-700 border-2 border-brand-100 rounded-xl font-bold text-lg hover:border-brand-300 transition-all flex items-center justify-center shadow-sm"
              >
                Client Portal
              </button>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 grayscale opacity-60">
                <div className="flex flex-col items-center">
                   <span className="text-xs font-bold uppercase tracking-tighter text-gray-400 mb-1">Top Rated</span>
                   <img src="https://picsum.photos/seed/award1/80/30" alt="Award 1" className="h-6" />
                </div>
                <div className="flex flex-col items-center">
                   <span className="text-xs font-bold uppercase tracking-tighter text-gray-400 mb-1">Certified</span>
                   <img src="https://picsum.photos/seed/award2/80/30" alt="Award 2" className="h-6" />
                </div>
                <div className="flex flex-col items-center">
                   <span className="text-xs font-bold uppercase tracking-tighter text-gray-400 mb-1">Elite Care</span>
                   <img src="https://picsum.photos/seed/award3/80/30" alt="Award 3" className="h-6" />
                </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-500 rounded-[40px] transform rotate-3 scale-95 opacity-10 transition-transform group-hover:rotate-1"></div>
            <img 
              src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800" 
              alt="Happy Puppy" 
              className="relative rounded-[40px] shadow-2xl transform transition-transform group-hover:-translate-y-2 object-cover aspect-[4/5] w-full border-4 border-white"
            />
            <div className="absolute -bottom-6 -left-6 glass-card p-5 rounded-2xl shadow-2xl animate-bounce-slow">
              <div className="flex items-center">
                 <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mr-4 text-xl">✓</div>
                 <div>
                    <p className="font-bold text-gray-900">Proven Methodology</p>
                    <p className="text-xs text-gray-500">Over 1,200 Happy Graduates</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
