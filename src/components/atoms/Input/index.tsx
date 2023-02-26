import React from 'react';
import classNames from "classnames";

interface Props {
  label?: string
  name: string
  required?: boolean;
  type?: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  children?: React.ReactNode
}

function Input({label, name, required, type = 'text', className = '', defaultValue, disabled, children}: Props) {
  return (
    <div className={className}>
      <label htmlFor={name} className={classNames("block text-sm font-medium text-gray-700", {"sr-only": !label})}>
        {label} {label && required && <span className="text-red-600">*</span>}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        {children}
        {type === 'textarea' ? <textarea
          id="description"
          name="description"
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={""}
        /> : <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          required={required}
          defaultValue={defaultValue}
          disabled={disabled}
          className={classNames(
            "block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm",
            "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm rounded-r-md",
            {"bg-gray-100 cursor-not-allowed": disabled, "rounded-l-md": !children}
          )}
        />}
      </div>
    </div>
  );
}

export default Input;