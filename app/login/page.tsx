import React from 'react';
import Image from 'next/image';
import InputS from './InputS';
import CatLaptop from '../../public/CatLaptop.png';
import SignInButton from './SignInButton';
const LoginPage = () => {
  return (
    <div>
      {' '}
      <div className="flex justify-center items-center h-screen w-screen">
        <form className="flex flex-col justify-center items-center gap-2 bg-white rounded-md ">
          <Image
            alt="CatPic"
            className=""
            src={CatLaptop}
            height={200}
            width={200}
          />
          <div className="flex flex-col justify-center items-center gap-2">
            <InputS />
            <SignInButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
