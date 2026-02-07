
import React, { useState } from 'react';
import { User } from '../types';
import { StreamChat } from 'stream-chat';

interface AuthProps {
  onLogin: (user: User) => void;
  onBackToHome: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBackToHome }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Safe access to environment variables
  const getStreamKey = () => {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.STREAM_API_KEY || '';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const STREAM_KEY = getStreamKey();
    
    if (!STREAM_KEY) {
      alert("Error: STREAM_API_KEY is not defined in your environment.");
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulated delay for auth
      await new Promise(resolve => setTimeout(resolve, 800));

      const userId = 'jet_user_' + btoa(email).substring(0, 8).toLowerCase();
      const mockToken = 'mock_jwt_token_for_stream'; 

      const authenticatedUser: User = {
        id: userId,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        avatar: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${userId}`,
        token: mockToken,
        dogs: [
          {
            id: 'dog_primary',
            name: 'Jet Jr.',
            breed: 'Belgian Malinois',
            age: '8 Months',
            status: 'Enrolled',
            image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400'
          }
        ],
        subscriptionPlan: 'Puppy Pre-K Platinum',
        lastBillingDate: '2024-06-12'
      };

      // Initialization check
      const chatClient = StreamChat.getInstance(STREAM_KEY);
      
      onLogin(authenticatedUser);
    } catch (err) {
      console.error("Auth Error:", err);
      alert("Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative">
      <div className="absolute top-8 left-8">
        <button 
          onClick={onBackToHome}
          className="flex items-center text-gray-400 hover:text-brand-600 font-bold transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Home
        </button>
      </div>

      <div className="glass-card max-w-md w-full p-10 rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
        
        <div className="text-center mb-10 relative z-10">
          <div className="w-20 h-20 bg-brand-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-xl shadow-brand-200">
            🐾
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900">
            {isLogin ? 'Client Portal' : 'Enroll Your Puppy'}
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Manage your dog's training and boarding schedule
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-6 py-4 bg-gray-100/50 border border-transparent focus:bg-white focus:border-brand-500 rounded-2xl transition-all outline-none font-medium"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-6 py-4 bg-gray-100/50 border border-transparent focus:bg-white focus:border-brand-500 rounded-2xl transition-all outline-none font-medium"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-brand-600 text-white rounded-2xl font-bold shadow-2xl shadow-brand-200 hover:bg-brand-700 transition-all flex items-center justify-center transform active:scale-95 mt-4"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isLogin ? 'Sign In to Portal' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center relative z-10">
           <button 
             onClick={() => setIsLogin(!isLogin)}
             className="text-brand-600 font-bold hover:text-brand-800 transition-colors"
           >
             {isLogin ? "New to Jet's? Enroll here" : "Already registered? Log in"}
           </button>
        </div>

        {/* <div className="mt-6 p-4 bg-brand-50 rounded-2xl border border-brand-100">
          <p className="text-[10px] text-brand-700 leading-relaxed font-medium">
            <strong>Security Tip:</strong> Your session is authenticated via JWT. The Stream API key is required to initialize the messaging client.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Auth;
