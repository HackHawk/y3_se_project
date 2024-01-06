'use client';

import { Input } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Spinner from '@/components/Spinner/Spinner';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const isAdmin = async (emailToCheck) => {
    const { data: admins, error } = await supabase
      .from('admin')
      .select()
      .eq('email', emailToCheck);

    if (error) {
      console.error('Not authenticated', error.message);
      return false;
    }

    if (admins?.length !== 0) {
      return true;
    }
    return false;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // const adminStatus = await isAdmin(email);
    // if (!adminStatus) {
    //   console.error("You are not an admin");
    //   toast.error("You are not an admin");
    //   return;
    // }

    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((res) => {
        // Handle successful response
        if (res.error) {
          throw res.error;
        }
        setUser(res.data.user);
        router.refresh();
      })
      .catch((error) => {
        // Handle errors
        console.error('Error signing in:', error.message);
        toast.error('Invalid Credintials', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // Add additional error handling logic here
      })
      .finally(() => {
        setPassword('');
      });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center px-4'>
      <div className='w-full max-w-sm text-gray-600'>
        <div className='text-center'>
          <div className='mt-5 space-y-2'>
            <h3 className='text-2xl font-bold text-gray-800 sm:text-3xl'>
              Log in to your account
            </h3>
          </div>
        </div>
        <form className='mt-8 space-y-5'>
          <div>
            <label className='mb-5 font-medium'>Email</label>
            <Input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
              className='mt-2'
            />
          </div>
          <div>
            <label className='font-medium'>Password</label>

            <Input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
              autoComplete='on'
              className='mt-2'
            />
          </div>
          <button
            onClick={handleSignIn}
            className='w-full rounded-md bg-gray-700 p-3 text-white hover:bg-gray-600 focus:outline-none'
          >
            Sign In
          </button>
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
            <a
              href='/account/forgot-password'
              className='hover:text-indigo-600'
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
