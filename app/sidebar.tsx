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
import { FaClipboard } from 'react-icons/fa';
import { CiCircleList } from 'react-icons/ci';
interface Logo {
  src: string;
}
const SideBar = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return null;
  }

  return (
    <Navbar className="bg-[#001F3F] fixed top-0 left-0 h-full w-[120px] flex flex-col">
      {status === 'authenticated' ? (
        <>
          <NavbarContent className="flex flex-col justify-around items-center">
            <NavbarItem isActive>
              <Link href="/" className="hover:underline" aria-current="page">
                <FaClipboard className="text-indigo-300 text-5xl" />
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/settings" className="hover:underline">
                <CiCircleList className="text-indigo-300 text-5xl" />
              </Link>
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <NavbarContent justify="end">
          <NavbarBrand></NavbarBrand>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default SideBar;
