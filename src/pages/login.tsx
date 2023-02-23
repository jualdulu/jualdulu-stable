import React from 'react';
import Link from "next/link";
import Image from 'next/image'
import {signIn} from "next-auth/react";
import Logo from "~/components/atoms/Logo";
import SocialLogin from "~/components/molecules/SocialLogin";
import Input from "~/components/atoms/Input";
import Checkbox from "~/components/atoms/Checkbox";
import Button from "~/components/atoms/Button";

function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const rememberMe = form.elements.namedItem("remember-me") as HTMLInputElement;
    const data = {
      email: email.value,
      rememberMe: rememberMe.checked,
    }
    signIn('email', {email: data.email, allowCreation: true, callbackUrl: '/member-area'}).catch(console.error)
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link href="/">
              <Logo className="h-12 w-auto"/>
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Masuk</h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input name="email" label="Alamat Email" type="email" required />

                <Checkbox name="remember-me" label="Ingat saya" />

                <Button type="submit">Masuk</Button>
              </form>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"/>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Atau masuk dengan</span>
              </div>
            </div>
          </div>

          <SocialLogin/>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          width={1908}
          height={1080}
          alt=""
        />
      </div>
    </div>
  );
}

export default LoginPage;