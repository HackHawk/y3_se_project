'use client';

import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const page = () => {
  const [email, setEmail] = useState('');

  const supabase = createClientComponentClient();

  // Add a conditionality here: If the users email exists in the database, only execute the reset part.

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await supabase.auth.resetPasswordForEmail(e.target.email.value, {
        redirectTo: 'http://localhost:3000/account/update-password',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='flex h-screen w-full flex-col items-center justify-center px-4'>
      <div className='w-full max-w-sm text-gray-600'>
        <form onSubmit={handleReset}>
          <label className='font-medium'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
            className='mb-5 mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600'
          />
          <Button color='primary' type='submit'>
            Reset Password
          </Button>
        </form>
      </div>
    </main>
  );
};

export default page;
