'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
  Button,
} from '@nextui-org/react';
import Logo from '../public/logo-no-background.png';
import { useSession } from 'next-auth/react';

interface Logo {
  src: string;
}
const SideBar = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return null;
  }

  return (
    <Navbar className="bg-[#c1c8e4] fixed top-0 left-0 h-full w-[120px] flex flex-col">
      <NavbarContent className="flex flex-col justify-between ">
        <NavbarItem isActive>
          <Link href="/" className="hover:underline" aria-current="page">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/settings" className="hover:underline">
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default SideBar;
