import React from 'react';
import Image from 'next/image';
import InputB from './Input';
import SignUpButton from './SignUpButton';
import CatLaptop from '../../public/CatLaptop.png';
const SignUpPage = () => {
  return (
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
          <InputB />
          <SignUpButton />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
