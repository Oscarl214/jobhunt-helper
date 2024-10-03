import React from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import CatLaptop from '../../public/CatLaptop.png';
import Image from 'next/image';
const SignInButton = () => {
  return (
    <div>
      {' '}
      <Link
        href="/api/auth/signin"
        className="flex justify-center items-center flex-col gap-2"
      >
        <form className="flex flex-col justify-center items-center gap-2 bg-white rounded-md ">
          <Image
            alt="CatPic"
            className=""
            src={CatLaptop}
            height={200}
            width={200}
          />
          <FcGoogle className="text-4xl text-center" />
          <p className="font-bold text-xl text-center">Log in</p>
        </form>
      </Link>
    </div>
  );
};

export default SignInButton;
