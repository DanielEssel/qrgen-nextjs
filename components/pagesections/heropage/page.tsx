// components/PageSections/Heropage.tsx
'use client'; // Required for client-side interactivity

import { useState, useEffect } from 'react';
import { auth } from '../../../src/firebase';
import { sendEmailVerification, onAuthStateChanged, User } from 'firebase/auth';
import { toast } from 'react-toastify';

const Heropage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cooldown, setCooldown] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        toast.dismiss();
      }
    });

    return () => unsubscribe();
  }, []);

  // Email verification checker
  useEffect(() => {
    const interval = setInterval(async () => {
      if (user && !user.emailVerified) {
        await user.reload();
        const updatedUser = auth.currentUser;
        
        if (updatedUser?.emailVerified) {
          toast.success('Email verified successfully!');
          setUser(updatedUser);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [user]);

  const handleResendVerification = async () => {
    if (cooldown) {
      toast.warn(`Please wait ${timeLeft} seconds before trying again.`);
      return;
    }

    try {
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        toast.success('Verification email has been sent!');
        
        setCooldown(true);
        setTimeLeft(60);
        
        const countdown = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              setCooldown(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error: any) {
      console.error("Error resending verification email:", error);
      if (error.code === 'auth/too-many-requests') {
        toast.error('Too many requests. Please try again later.');
      } else {
        toast.error('Failed to resend verification email. Please try again.');
      }
    }
  };

  return (
    <section
      className="d-flex flex-column justify-content-center align-items-center text-center bg-light"
      style={{ minHeight: '60vh', paddingTop: '20px', paddingBottom: '20px' }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold my-3" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          Create Your Own QR Codes Instantly
        </h1>
        <p className="ms-2 me-2 lead mb-1">
          Generate unique and customizable QR codes for your business, events, or personal use in seconds. It&apos;s fast, easy, and free!
        </p>

        {user && !user.emailVerified && (
          <div className="alert alert-warning mt-4" role="alert">
            <p className="mb-2">Your email is not verified. Please check your inbox.</p>
            <button 
              onClick={handleResendVerification} 
              disabled={cooldown} 
              className={`btn ${cooldown ? 'btn-secondary' : 'btn-primary'}`}
            >
              {cooldown ? `Resend in ${timeLeft}s` : 'Resend Verification Email'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Heropage;