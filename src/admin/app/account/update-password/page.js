"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const [newPassword, setNewPassword] = useState("");
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
            alert("Password Changed Successfully!")
            router.push("/")
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error with creating new Password:", error.message);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  };

  return (
    <>

      <label className="font-medium">Enter New Password</label>
      <input
        type="password"
        name="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="password"
        required
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
      <Button color="primary" onClick={handlePasswordChange}>
        Reset Password
      </Button>
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
    </>
  );
};

export default page;
