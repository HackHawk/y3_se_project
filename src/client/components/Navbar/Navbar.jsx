'use client';

import { useState, useEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Badge,
  Image,
  Avatar,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarMenuToggle,
  NavbarMenu,
} from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { CartIcon } from '../Icons/CartIcon';

export default function DisplayNavbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className=' flex items-center rounded bg-amber-700/50'
    >
      <NavbarBrand className='flex flex-row gap-2'>
        <Image src='/Eneho_books_logo.png' alt='Bookstore logo' width={70} />
        <p className='text-xl font-bold'>እነሆ መጻሕፍት</p>
      </NavbarBrand>

      <NavbarContent className='flex flex-row gap-5'>
        {/* TODO modify this when users add/remove items to/from cart  */}

        <NavbarContent as='div' justify='end'>
          <Badge color='danger' content={50} shape='circle'>
            <Button
              radius='full'
              isIconOnly
              aria-label='more than 99 notifications'
              variant='light'
            >
              <CartIcon size={30} />
            </Button>
          </Badge>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                isBordered
                as='button'
                className='transition-transform'
                color='secondary'
                name='Test User'
                size='sm'
                src=''
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              {/* FIXME  add menu options that depend on whether the user is logged in. */}
              <DropdownItem key='sign-in'>
                <div className='font'>
                  {(currentUser && (
                    <p className='font-semibold'>
                      Signed in as {currentUser.email}
                    </p>
                  )) || (
                    <Link color='foreground' href='/account/sign-in'>
                      Sign in
                    </Link>
                  )}
                </div>
              </DropdownItem>
              <DropdownItem key='sign-up'>
                <Link color='foreground' href='/account/sign-pu'>
                  Sign up
                </Link>
              </DropdownItem>
              {/* FIXME settings option is not the same size as the others. */}
              <DropdownItem key='settings'>Account Settings</DropdownItem>
              <DropdownItem key='logout' color='danger'>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className='sm:hidden'
      />
    </Navbar>
  );
}
