import React from 'react';

interface Props {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
}

function Button({type = 'button', children}: Props) {
  return (
    <button
      type={type}
      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
}

export default Button;