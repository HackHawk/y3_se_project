'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import { useState } from 'react';
import UserDropdown from './UserDropdown.jsx';

function DisplayNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Profile', 'Log Out'];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className='pr-3 sm:hidden' justify='center'>
        <NavbarBrand>
          <p className='font-bold text-inherit'>Enho Books</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        <NavbarBrand>
          <p className='font-bold text-inherit'>Enho Books</p>
        </NavbarBrand>
        <NavbarItem>
          <Link href='#'>Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/admin/add-books' aria-current='page'>
            Add Books
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='#'>Sales</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className='w-full' href='#' size='lg'>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default DisplayNavbar;
