
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
  const [password, setPassword] = useState(''); // This is for your own backend, not Stream.
  const [isLoading, setIsLoading] = useState(false);

  // This key is for the CLIENT. Your SECRET should only ever be on your Node.js server.
  const STREAM_KEY = process.env.STREAM_API_KEY || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!STREAM_KEY) {
      alert("Missing STREAM_API_KEY in environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      /**
       * HOW AUTHENTICATION WORKS WITH STREAM:
       * 
       * 1. You send (email, password) to YOUR server (e.g., a Next.js API Route).
       * 2. YOUR server checks the password against your database.
       * 3. If correct, YOUR server uses the Stream Node SDK:
       *    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
       *    const token = serverClient.createToken(userId);
       * 4. YOUR server returns the 'token' to this frontend.
       */
      
      // --- SIMULATING BACKEND CALL ---
      console.log(`Authenticating ${email} with your private backend...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this token comes from your server's response.
      const mockBackendToken = 'su_jwt_' + btoa(email).substring(0, 20); 
      const userId = 'jet_' + btoa(email).substring(0, 8).toLowerCase().replace(/[^a-z0-9]/g, '');

      // Initialize the client
      const chatClient = StreamChat.getInstance(STREAM_KEY);

      // Construct the local user object
      const userPayload: User = {
        id: userId,
        name: email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        dogs: [
          // If this were a real app, you'd fetch these from your DB or Stream custom fields
          {
            id: 'dog_1',
            name: 'Buddy',
            breed: 'Golden Retriever',
            age: '6 months',
            status: 'Enrolled',
            image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200'
          }
        ],
        token: mockBackendToken,
        lastBillingDate: new Date().toLocaleDateString(),
        subscriptionPlan: 'Puppy Pre-K Platinum'
      };

      /**
       * STREAM CONNECTION:
       * This connects the user to Stream's real-time servers using the token provided by your backend.
       * 
       * await chatClient.connectUser(
       *   { id: userPayload.id, name: userPayload.name, image: userPayload.avatar }, 
       *   userPayload.token
       * );
       */

      onLogin(userPayload);
    } catch (error) {
      console.error("Auth process failed:", error);
      alert("Verification failed. Ensure your backend is reachable and STREAM_API_KEY is correct.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative">
      <div className="absolute top-8 left-8">
        <button 
          onClick={onBackToHome}
          className="flex items-center text-gray-400 hover:text-brand-600 font-bold transition-colors group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back to Home
        </button>
      </div>

      <div className="glass-card max-w-md w-full p-10 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden border border-gray-100">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-50 rounded-full -mr-24 -mt-24 blur-3xl opacity-60"></div>
        
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex p-5 bg-brand-50 rounded-3xl mb-6 shadow-sm border border-brand-100">
             <span className="text-5xl">🐕</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
            {isLogin ? 'Client Login' : 'Register Puppy'}
          </h2>
          <p className="text-gray-500 mt-3 font-medium">
            {isLogin ? 'Log in to your private training portal' : 'Enroll in our next Pre-K session'}
          </p>
          
          {/* <div className="mt-6 flex flex-col gap-2 p-4 bg-orange-50 rounded-2xl border border-orange-100 text-left">
            <span className="text-[10px] text-orange-700 font-black uppercase tracking-widest flex items-center">
              <span className="mr-2">💡</span> Tech Note
            </span>
            <p className="text-[11px] text-orange-800 leading-relaxed">
              Stream doesn't store passwords. This form simulates a login to <strong>your own backend</strong>, which then generates a Stream JWT.
            </p>
          </div> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50/50 transition-all font-medium"
              placeholder="puppy@example.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50/50 transition-all font-medium"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-brand-600 text-white rounded-2xl font-bold shadow-2xl shadow-brand-100 hover:bg-brand-700 transition-all flex items-center justify-center transform active:scale-[0.98]"
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-gray-500 relative z-10">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-600 font-bold hover:text-brand-700 transition-colors"
          >
            {isLogin ? "Don't have an account? Enroll" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
