'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, setUser] = useState('');
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

  const handleSignUp = async () => {
    try {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      setUser(res.data.user);
      router.refresh();
    } catch (error) {
      console.error('PROBLEMS');
    }
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(res.data.user);
    router.refresh();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  console.log({ loading, user });

  if (user) {
    return (
      <>
        <p>You are logged in.{user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  }

  return (
    <>
      <main className='flex h-screen items-center justify-center bg-gray-800 p-6'>
        <div className='w-96 rounded-lg bg-gray-900 p-8 shadow-md'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='mb-4 w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none'
          />
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='mb-4 w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none'
          />
          <button
            onClick={handleSignUp}
            className='mb-2 w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700 focus:outline-none'
          >
            Sign Up
          </button>
          <button
            onClick={handleSignIn}
            className='w-full rounded-md bg-gray-700 p-3 text-white hover:bg-gray-600 focus:outline-none'
          >
            Sign In
          </button>
        </div>
      </main>

      {/* NEEW */}
      <main className='flex h-screen w-full flex-col items-center justify-center px-4'>
        <div className='w-full max-w-sm text-gray-600'>
          <div className='text-center'>
            <img
              src='https://floatui.com/logo.svg'
              width={150}
              className='mx-auto'
            />
            <div className='mt-5 space-y-2'>
              <h3 className='text-2xl font-bold text-gray-800 sm:text-3xl'>
                Log in to your account
              </h3>
            </div>
          </div>
          <form className='mt-8 space-y-5'>
            <div>
              <label className='font-medium'>Email</label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
                className='mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>
            <div>
              <label className='font-medium'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
                className='mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
              />
            </div>
            <button
              onClick={handleSignIn}
              className='w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600'
            >
              Sign in
            </button>
            <div className='text-center'>
              <a href='/forgotPassword' className='hover:text-indigo-600'>
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
