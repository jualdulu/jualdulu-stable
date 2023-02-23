import React from 'react';

interface Props {
  name: string
  label?: string
}

function Checkbox({name, label}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id={name}
          name={name}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
}

export default Checkbox;