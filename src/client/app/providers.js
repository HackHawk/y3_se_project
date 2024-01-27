  'use client';

  // This UI library uses createContext and doesn't have 'use client' directive. 
  // As a result, it needs a 'use client' from a parent component to make all its components client too.
  // Now this whole component is a client component. This component can only recieve server components as a children.
  import { NextUIProvider } from "@nextui-org/react";

  const Providers = ({ children }) => {

    return (
      <NextUIProvider>{children}</NextUIProvider>
    )
  }

  export default Providers