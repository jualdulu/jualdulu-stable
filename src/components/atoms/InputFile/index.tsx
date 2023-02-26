/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Image from "next/image";

interface Props {
  label?: string;
  name: string;
  setFiles:  React.Dispatch<FileList | null>
  preview?: string | ArrayBuffer | null
}

function InputFile({label, name, setFiles, preview}: Props) {
  return (
      <div className="sm:col-span-6">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <div className="mt-1 flex items-center">
          <Image
            className="inline-block h-12 w-12 rounded-full"
            // @ts-ignore
            src={preview || 'https://via.placeholder.com/50.png'}
            width={48}
            height={48}
            alt=""
          />
          <div className="ml-4 flex">
            <div
              className="relative flex cursor-pointer items-center rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 hover:bg-gray-50">
              <label
                htmlFor={name}
                className="pointer-events-none relative text-sm font-medium text-gray-900"
              >
                <span>Ganti</span>
                <span className="sr-only">user photo</span>
              </label>
              <input
                id={name}
                name={name}
                type="file"
                className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                onChange={e => setFiles(e.target.files)}
              />
            </div>
            <button
              type="button"
              onClick={() => setFiles(null)}
              className="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium text-gray-900 hover:text-gray-700 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
  );
}

export default InputFile;