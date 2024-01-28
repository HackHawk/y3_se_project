"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const page = () => {
  const [email, setEmail] = useState("");

  const supabase = createClientComponentClient();

  // Add a conditionality here: If the users email exists in the database, only execute the reset part.

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await supabase.auth.resetPasswordForEmail(e.target.email.value, {
        redirectTo: `${process.env.REDIRECT_URL_FOR_FORGOT_PASSWORD}/account/update-password`,
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
    <form onSubmit={handleReset}>
      <label className="font-medium">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full mt-2 mb-5 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
      <Button color="primary" type="submit">
        Reset Password
      </Button>
      </form>
      </div>
      </main>
    </>
  );
};

export default page;
