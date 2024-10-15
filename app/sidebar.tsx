'use client';
import React from 'react';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
  Button,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { FaClipboard } from 'react-icons/fa';
import { CiCircleList } from 'react-icons/ci';
import logo from '../public/logo-white.png';
import { Interface } from 'readline';

interface logo {
  src: string;
}
const SideBar = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (!session || !session.user) {
    return (
      <div>
        <Navbar className="bg-[rgb(0,31,63)] fixed top-0 left-0 h-full w-[250px] ">
          {' '}
          <div className="flex flex-col justify-start items-start ">
            <Image
              src={logo.src}
              alt="User Picture"
              className=" text-center w-[350px] h-[100px]"
            />
          </div>
        </Navbar>
      </div>
    );
  }
  return (
    <Navbar className="bg-[rgb(0,31,63)] fixed top-0 left-0 h-full w-[250px] ">
      <div className="flex flex-col justify-evenly">
        {status === 'authenticated' ? (
          <>
            <div className="flex flex-col justify-start items-start ">
              <Image
                src={logo.src}
                alt="User Picture"
                className=" text-center w-[350px] h-[100px]"
              />
            </div>
            <div className="p-4">
              <NavbarContent
                justify="start"
                className="flex flex-col items-center"
              >
                <NavbarItem>
                  <Image
                    height={50}
                    width={50}
                    src={session.user.image || '/path/to/default/image.png'}
                    alt="User Picture"
                    className="rounded-md text-center"
                  />
                </NavbarItem>
                <NavbarItem>
                  <p className="font-bold text-md text-white mt-2">
                    Welcome, {session.user.name}
                  </p>
                </NavbarItem>
              </NavbarContent>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center">
              <NavbarContent>
                <NavbarItem isActive>
                  <Link
                    href="/jobboards"
                    className="hover:underline"
                    aria-current="page"
                  >
                    <FaClipboard className="text-indigo-300 text-5xl" />
                  </Link>
                </NavbarItem>
                <NavbarItem className="mt-4">
                  <Link href="/" className="hover:underline">
                    <CiCircleList className="text-indigo-300 text-5xl" />
                  </Link>
                </NavbarItem>
              </NavbarContent>
            </div>

            <div className="p-4">
              <NavbarContent
                justify="end"
                className="flex flex-col items-center"
              >
                <NavbarItem>
                  <Button as="a" href="/api/auth/signout" color="danger">
                    Log Out
                  </Button>
                </NavbarItem>
              </NavbarContent>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center ">
            <Image
              src={logo.src}
              alt="User Picture"
              className=" text-center w-[350px] h-[100px]"
            />
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default SideBar;
