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
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchExistingSession() {
      // Fetches the currently logged in user from the existing session (if there is one)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);

      if (user) {
        router.push('/');
      }

      setLoading(false);
    }

    fetchExistingSession();
  }, [supabase.auth, router]);

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // REMOVE
      console.log(user);
      console.log(error);

      if (user) {
        // REMOVE
        console.log(user);
        const customerStatus = await isCustomer(supabase);

        if (customerStatus === true) {
          setCurrentUser(user);
          router.push('/');
        } else {
          supabase.auth.signOut();
          setCurrentUser(null);
          // REMOVE
          console.log(currentUser);
          throw new Error('You are not a customer');
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
            Sign in to your account
          </h3>
        </div>
        <form className='mt-8 space-y-5'>
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
            onClick={(e) => handleSignIn(e)}
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
