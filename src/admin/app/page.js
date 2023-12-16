import SignInRedirect from "@/components/SignInRedirect/SignInRedirect";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore})

  const {data: {user}} = await supabase.auth.getUser();

  if (!user) {
    return <SignInRedirect />
  }

  return (
    <>
      <p>You are authenticated and seeing a protected page</p>
    </>
  );
}
