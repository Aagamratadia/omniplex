'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import CheckmarkAnimation from '@/components/animations/CheckmarkAnimation';

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
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-[#161616]">
      <div className="w-full max-w-3xl p-8 rounded-lg border border-gray-700 bg-[#1e1e1e] shadow-xl">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 mb-6">
            <CheckmarkAnimation size={128} color="#4ade80" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Payment Successful</h1>
          <p className="text-gray-300 mb-8 max-w-md">
            Thank you for upgrading to Omniplex Pro! Your subscription is now active and you have access to all premium features.
          </p>
          
          <div className="w-full max-w-md bg-gray-800/50 p-6 rounded-lg mb-8 text-left border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="text-gray-200 font-mono text-sm">
                  {sessionId?.substring(0, 8)}...{sessionId?.substring(sessionId.length - 4)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="text-green-400 font-medium">Omniplex Pro</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <span>Go to Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <a
              href="#"
              className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700/50 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              View Invoice
            </a>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact our <a href="#" className="text-blue-400 hover:underline">support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}
