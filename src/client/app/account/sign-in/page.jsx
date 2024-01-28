'use client';

import { useEffect, useState } from 'react';
import { Input, Spinner, Button } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link'; // Use Next.js Link component
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import isCustomer from '@/lib/isCustomer';

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const supabase = createClientComponentClient();

  // Handle sign up logic (replace with your implementation)
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // REMOVE
    console.log(data);
    console.log(error);

    if (error) {
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
    router.push('/');
  };

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center px-4'>
      <div className='w-full max-w-sm text-gray-600'>
        <div className='text-center'>
          <h3 className='mb-16 mt-5 space-y-2 text-2xl font-bold text-gray-800 sm:text-3xl'>
            Sign in to your account
          </h3>
        </div>
        <form className='mt-8 space-y-5' onSubmit={handleSignIn}>
          <div>
            <Input
              label='Email'
              type='email'
              name='email'
              labelPlacement='outside'
              value={email}
              radius='sm'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              className='mb-12'
            />
          </div>
          <div>
            <Input
              label='Password'
              type='password'
              name='password'
              value={password}
              radius='sm'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              labelPlacement='outside'
              required
              autoComplete='on'
            />
          </div>
          <Button
            type='submit'
            className='w-full rounded-lg bg-amber-700 p-3 text-white hover:bg-gray-600 focus:outline-none'
          >
            Sign In
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
          <div className='mt-4 text-center'>
            <Link href='/account/sign-up'>
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
