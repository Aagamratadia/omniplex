'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Here you could fetch the session details from your API
      console.log('Checkout session ID:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-gray-800">
        <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-3">Payment Successful</h1>
        <p className="text-gray-300 mb-6">
          Thank you for upgrading to Pro! Your subscription is now active.
        </p>
        
        <div className="bg-gray-700/50 p-4 rounded-lg mb-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Order ID:</span>
            <span className="text-gray-200 font-mono text-sm">
              {sessionId?.substring(0, 8)}...
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Plan:</span>
            <span className="text-green-400 font-medium">Pro Plan</span>
          </div>
        </div>

        <button
          onClick={() => router.push('/')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>Continue to Dashboard</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          Need help? Contact our <a href="#" className="text-blue-400 hover:underline">support team</a>
        </p>
      </div>
    </div>
  );
}
