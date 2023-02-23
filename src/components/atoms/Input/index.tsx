import React from 'react';
import classNames from "classnames";

interface Props {
  label?: string
  name: string
  required?: boolean;
  type?: string;
}

function Input({label, name, required, type = 'text'}: Props) {
  return (
    <div>
      <label htmlFor={name} className={classNames("block text-sm font-medium text-gray-700", {"sr-only": !label})}>
        {label} {label && required && <span className="text-red-600">*</span>}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          required={required}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

export default Input;