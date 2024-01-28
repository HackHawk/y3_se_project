'use client';

import { Input, Spinner, Button } from '@nextui-org/react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import isAdmin from '../lib/isAdmin';

export default function LoginPage() {
  const router = useRouter();

  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchExistingSession() {
      // Fetches the currently logged in user from the existing session (if there is one)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
      setLoading(false);
    }

    fetchExistingSession();
  }, [supabase.auth]);

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        phone: phoneNo,
        password,
      });

      if (user) {
        // REMOVE
        console.log(user);
        const adminStatus = await isAdmin(supabase);

        if (adminStatus === true) {
          setCurrentUser(user);
          router.refresh();
        } else {
          supabase.auth.signOut();
          setCurrentUser(null);
          // REMOVE
          console.log(currentUser);
          throw new Error('You are not an admin');
        }
      } else {
        throw error;
      }
    } catch (error) {
      console.log('Error signing in: ', error);
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

  if (loading) {
    return (
      <Spinner
        className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'
        size='lg'
      />
    );
  }

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center px-4'>
      <div className='w-full max-w-sm text-gray-600'>
        <div className='text-center'>
          <h3 className='mb-16 mt-5 space-y-2 text-2xl font-bold text-gray-800 sm:text-3xl'>
            Log in to your account
          </h3>
        </div>
        <form className='mt-8 space-y-5'>
          <div>
            <Input
              label='Phone Number'
              type='tel'
              name='phoneNumber'
              labelPlacement='outside'
              value={phoneNo}
              radius='sm'
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder='Enter your phone number'
              required
              className='mb-12 mt-4'
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
              className=''
            />
          </div>
          <Button
            type='submit'
            onClick={(e) => handleSignIn(e)}
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
          <div className='text-center'>
            <Link
              href='/account/forgot-password'
              className='hover:text-indigo-600'
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
