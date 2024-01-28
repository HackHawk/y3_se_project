'use client';

import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import isAdmin from '@/lib/isAdmin';

export default function ForgotPassword() {
  const router = useRouter();
  const [phoneNo, setPhoneNo] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState();

  const supabase = createClientComponentClient();

  async function handleReset(e) {
    e.preventDefault();

    try {
      // Send OTP to phone number
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNo,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        throw error;
      }

      setOtpSent(true);
    } catch (error) {
      console.log('Error: ', error);
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  async function handleOtpSubmission(e) {
    e.preventDefault();

    try {
      // Verify OTP from user
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNo,
        token: otpCode,
        type: 'sms',
      });

      if (error) {
        throw error;
      }

      // Check whether the user is an admin
      const adminStatus = await isAdmin(supabase);

      if (adminStatus === false) {
        supabase.auth.signOut();
        throw new Error('You are not an admin');
      }

      // Redirect to update-password page
      router.push('/account/update-password');
    } catch (error) {
      console.log('Error: ', error);
      setOtpSent(false);
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center px-4'>
      <div className='w-full max-w-sm text-gray-600'>
        <div className='text-center'>
          <h3 className='mb-16 mt-5 space-y-2 text-2xl font-bold text-gray-800 sm:text-3xl'>
            {otpSent ? 'Verify OTP' : 'Reset Password'}
          </h3>
        </div>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme='light'
        />
        <form className='space-y-1kw mt-8'>
          <div className='mb-12 mt-4'>
            <Input
              label={otpSent ? 'OTP Code' : 'Phone Number'}
              type={otpSent ? 'number' : 'tel'}
              name='phoneNumber'
              labelPlacement='outside'
              value={otpSent ? otpCode : phoneNo}
              radius='sm'
              onChange={
                otpSent
                  ? (e) => setOtpCode(e.target.value)
                  : (e) => setPhoneNo(e.target.value)
              }
              placeholder={otpSent ? '------' : 'Enter your phone number'}
              required
              className='w-full rounded-sm bg-transparent text-gray-500 focus:border-indigo-600'
            />
          </div>
          <Button
            type='submit'
            onClick={
              otpSent ? (e) => handleOtpSubmission(e) : (e) => handleReset(e)
            }
            className='w-full rounded-lg bg-amber-700 p-3 text-white hover:bg-gray-600 focus:outline-none'
          >
            {otpSent ? 'Submit OTP' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </main>
  );
}
