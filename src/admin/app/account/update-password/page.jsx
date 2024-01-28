'use client';

// CONSIDER Adding a second passowrd input field that asks you to match the new password.

import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

export default function Page() {
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handlePasswordChange = () => {
    supabase.auth
      .updateUser({
        password: newPassword,
      })
      .then((res) => {
        // Handle successful response
        if (res.error) {
          throw res.error;
        }

        if (!res.error) {
          toast.success('Password changed successfully');
          router.push('/');
        }
      })
      .catch((error) => {
        // Handle errors
        console.error('Error with creating new Password:', error.message);
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
      });
  };

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center px-4'>
      <div className='w-full max-w-sm text-gray-600'>
        <label className='font-medium'>Enter New Password</label>
        <input
          type='password'
          name='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='password'
          required
          className='mb-5 mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
        />
        <Button color='primary' onClick={handlePasswordChange}>
          Reset Password
        </Button>
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
      </div>
    </main>
  );
}
