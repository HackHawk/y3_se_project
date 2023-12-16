// Component to be displayed to authenticate user

// SignInRedirect.jsx
"use client";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";

const SignInRedirect = () => {
  return (
    <div className="text-center mt-10">
      <p className="text-lg text-primary-dark font-primary">
        Please Sign In
      </p>
      <a>
        <Button
          onClick={redirect("/login")}
          color="primary"
        >
          Sign In
        </Button>
      </a>
    </div>
  );
};

export default SignInRedirect;
