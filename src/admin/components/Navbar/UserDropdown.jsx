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

const UserDropdown = () => {
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Error Signing Out. Try again');
    }
    router.push('/');
  };

  return (
    // <Dropdown>
    //   <NavbarItem>
    //     <DropdownTrigger>
    //       <Avatar as="button" color="secondary" size="md" src="" />
    //     </DropdownTrigger>
    //   </NavbarItem>
    //   <DropdownMenu
    //     aria-label="User menu actions"
    //     onAction={(actionKey) => console.log({ actionKey })}
    //   >
    //     <DropdownItem
    //       key="profile"
    //       className="flex flex-col justify-start w-full items-start"
    //     >
    //       <p>Signed in as</p>
    //       <p>zoey@example.com</p>
    //     </DropdownItem>
    //     <DropdownItem key="settings">My Settings</DropdownItem>
    //     <DropdownItem
    //       key="logout"
    //       color="danger"
    //       className="text-danger "
    //       onClick={handleSignOut}
    //     >
    //       Log Out
    //     </DropdownItem>
    //   </DropdownMenu>
    // </Dropdown>

    <Button onClick={handleSignOut} color='danger'>
      Sign out
    </Button>
  );
};

export default UserDropdown;
