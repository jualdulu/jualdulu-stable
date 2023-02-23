import React from 'react';

interface Props {
  children: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

function SocialLoginButton({children, onClick}: Props) {
  return (
    <button
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
    >
      {children}
    </button>
  );
}

export default SocialLoginButton;