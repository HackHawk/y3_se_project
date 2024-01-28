import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    NavbarItem,
  } from '@nextui-org/react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';


const UserDropdown = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const supabase = createClientComponentClient();
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser(); // Adjusted to use supabase.auth.getUser()
  
        setCurrentUser(user);
      };
  
      fetchUser();
    }, []);
  
    const handleSignOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setCurrentUser(null); // Ensure the currentUser is set to null after sign out
        router.push('/'); // Use router.push for navigation
      } else {
        alert('Error Signing Out. Try again');
      }
    };
  
    return (
        <div className="relative">
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Icon or Avatar */}
            <span className="text-xl">👤</span>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-50">
              {currentUser ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => e.preventDefault()}
                  >
                    Signed in as {currentUser.email}
                  </Link>
                  <button
                
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignOut();
                    }}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/account/sign-in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign in
                  </Link>
                  <Link href="/account/sign-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      );
    };
    
  
  export default UserDropdown;