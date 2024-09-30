import React from 'react';
import Image from 'next/image';

import Cat from '../public/404Cat.webp';
const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Image height={200} width={200} src={Cat} alt="cat error 404" />
    </div>
  );
};

export default NotFoundPage;
