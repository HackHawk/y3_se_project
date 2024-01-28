"use client";

import { useState, useEffect } from "react";
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
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { CartIcon } from "../Icons/CartIcon";
import { useCart } from "../Cart/contexts/CartContext";
import UserDropdown from "./UserDropdown";

export default function DisplayNavbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { totalQuantity } = useCart();

  const supabase = createClientComponentClient();

  async function handleSignOut(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();

    console.log(error);
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className=" flex items-center rounded bg-amber-700/50"
    >
      <NavbarBrand className="flex flex-row gap-2">
        <Image src="/Eneho_books_logo.png" alt="Bookstore logo" width={70} />
        <p className="text-xl font-bold">እነሆ መጻሕፍት</p>
      </NavbarBrand>

      <NavbarItem>
        <Link href="/" className="text-black text-lg font-bold hidden sm:block">
          Home
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link
          href="/search"
          className="text-black text-lg font-bold hidden sm:block"
        >
          Search
        </Link>
      </NavbarItem>

      <NavbarContent className="flex flex-row gap-5">
        <NavbarMenu isOpen={isMenuOpen} className="sm:hidden">
          <NavbarItem>
            <Link href="/" className="text-black text-lg font-bold">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/search" className="text-black text-lg font-bold">
              Search
            </Link>
          </NavbarItem>
        </NavbarMenu>

        <NavbarContent as="div" justify="end">
          <Link href="/cart">
            <Badge color="danger" content={totalQuantity} shape="circle">
              <Button
                radius="full"
                isIconOnly
                aria-label={`${totalQuantity} items in cart`}
                variant="light"
              >
                <CartIcon size={30} />
              </Button>
            </Badge>
          </Link>
          <UserDropdown />
        </NavbarContent>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
    </Navbar>
  );
}
