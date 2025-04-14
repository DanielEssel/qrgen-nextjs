// app/login/page.tsx
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertColor, setAlertColor] = useState<string>('bg-gray-500');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log('Response status:', response.status);
        throw new Error(errorMessage || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('An error occurred while signing in. Please try again.');
    }
  };

  const handleSocialLoginClick = (platform: 'Google' | 'Facebook') => {
    setAlertVisible(true);
    setAlertMessage(`${platform} login is coming soon!`);
    setAlertColor(platform === 'Google' ? 'bg-gray-500' : 'bg-gray-700');
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-screen tw-bg-gray-100 tw-px-4 sm:tw-px-6 lg:tw-px-8">
      {/* Website Logo and Name Container */}
      <div className="tw-flex tw-items-center tw-mb-4 tw-mt-4">
        <Image 
          src="/images/qrlogo-anim.gif" 
          alt="QRGen logo" 
          width={48}
          height={48}
          className="tw-mr-2"
        />
        <h1 className="tw-text-3xl tw-font-bold">QRGEN</h1>
      </div>

      {/* Sign-in Container */}
      <div className="tw-bg-white tw-py-10 tw-px-6 sm:tw-px-8 md:tw-px-10 tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-md lg:tw-max-w-xl tw-mt-2 tw-mb-16">
        <h2 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6">Welcome back</h2>

        {/* Social login buttons */}
        <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-mb-4">
          <button 
            className="tw-flex tw-items-center tw-justify-center tw-w-full sm:tw-w-1/2 tw-mb-2 sm:tw-mb-0 tw-mr-0 sm:tw-mr-2 tw-p-3 tw-bg-white tw-text-gray-700 tw-border tw-border-gray-300 tw-rounded-md hover:tw-bg-gray-50 tw-transition"
            onClick={() => handleSocialLoginClick('Google')}
          >
            <Image 
              src="/images/google-logo.png" 
              alt="Google logo" 
              width={20}
              height={20}
              className="tw-mr-2"
            />
            <span className="tw-font-medium gg">Sign in with Google</span>
          </button>
          <button 
            className="tw-flex tw-items-center tw-justify-center tw-w-full sm:tw-w-1/2 tw-ml-0 sm:tw-ml-2 tw-p-3 tw-bg-white tw-text-gray-700 tw-border tw-border-gray-300 tw-rounded-md hover:tw-bg-gray-50 tw-transition"
            onClick={() => handleSocialLoginClick('Facebook')}
          >
            <FontAwesomeIcon icon={faFacebook} className="tw-mr-2 tw-text-blue-600 tw-text-xl" />
            <span className="tw-font-medium fb">Sign in with Facebook</span>
          </button>
        </div>

        {/* Alert message */}
        {alertVisible && (
          <div className={`
            tw-flex tw-items-center tw-border tw-border-gray-300 tw-rounded-lg ${alertColor} tw-p-4 tw-mb-4 tw-text-grey-800 tw-border-t-4 tw-border-grey-300 tw-bg-grey-50 tw-dark:text-gray-500 tw-dark:bg-gray-500 tw-dark:border-gray-500`} 
            role="alert"
          >
            <span>{alertMessage}</span>
          </div>
        )}

        {/* Separator */}
        <div className="tw-relative tw-flex tw-py-4 tw-items-center">
          <div className="tw-flex-grow tw-border-t tw-border-gray-300"></div>
          <span className="tw-flex-shrink tw-mx-4 tw-text-gray-500">or</span>
          <div className="tw-flex-grow tw-border-t tw-border-gray-300"></div>
        </div>

        {/* Sign-in form */}
        <form className="tw-space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            className="tw-w-full tw-p-3 tw-bg-blue-600 tw-text-white tw-rounded-md hover:tw-bg-blue-700 tw-transition" 
            type="submit"
          >
            Sign in to your account
          </button>
        </form>

        {error && <p className="tw-text-red-500 tw-text-center">{error}</p>}

        {/* Sign Up Link */}
        <div className="tw-text-center tw-mt-4">
          <p className="tw-text-sm tw-text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="tw-text-blue-600 hover:tw-underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
