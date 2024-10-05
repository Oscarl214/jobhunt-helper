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
const NavBar = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return null;
  }

  return (
    <Navbar className="bg-white h-[150px]">
      <NavbarBrand>
        <Image
          alt="Jon Hunter AI Logo"
          // height={100}
          // width={150}
          className="h-10 w-auto"
          src={Logo.src}
        />
      </NavbarBrand>
      {status === 'authenticated' ? (
        <>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive>
              <Link href="/" className="hover:underline" aria-current="page">
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem className="flex flex-col gap-2 justify-center items-center">
              <Image
                height={50}
                width={50}
                src={`${session.user!.image}`}
                alt="Google Picture"
                className="rounded-md"
              />
              <p className="font-bold text-md text-black">
                Welcome, {session.user!.name}
              </p>
            </NavbarItem>
            <NavbarItem isActive>
              <Link
                href="/applications"
                className="hover:underline"
                aria-current="page"
              >
                Applications
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Link href="/api/auth/signout">LogOut</Link>
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default NavBar;
