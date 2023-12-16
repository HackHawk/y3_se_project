"use client";

import { Input } from "@nextui-org/react";
import Spinner from "@/components/Spinner/Spinner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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


  const handleSignIn = (e) => {
    e.preventDefault();
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
        console.error("Error signing in:", error.message);
        toast.error("Invalid Credintials", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Add additional error handling logic here
      })
      .finally(() => {
        setPassword("");
      });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };


  // Remove stuff later
  
  if (user) {
    return (
      <>
        <p>You are logged in.{user.email}</p>
        <button onClick={handleLogout}>Logout</button>
        {/* {redirect("/")} */}
      </>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form className="mt-8 space-y-5">
          <div>
            <label className="font-medium mb-5">Email</label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-2"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>

            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="mt-2"
            />
          </div>
          <button
            onClick={handleSignIn}
            className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
          >
            Sign In
          </button>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <div className="text-center">
            <a href="/account/forgot-password" className="hover:text-indigo-600">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
