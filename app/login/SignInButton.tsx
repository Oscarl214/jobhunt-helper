import React from 'react';
import Link from 'next/link';
const SignInButton = () => {
  return (
    <div>
      {' '}
      <Link href="/api/auth/signin" className="btn btn-secondary">
        Login
      </Link>
    </div>
  );
};

export default SignInButton;
