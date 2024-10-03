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
    <Navbar className="bg-white">
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
            <NavbarItem>
              <Link color="foreground" href="#">
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Applications
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent>
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
