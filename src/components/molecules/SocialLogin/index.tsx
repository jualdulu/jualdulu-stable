/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import {signIn} from "next-auth/react";
import GoogleIcon from "~/components/atoms/GoogleIcon";
import DiscordIcon from "~/components/atoms/DiscordIcon";
import GithubIcon from "~/components/atoms/GithubIcon";
import SocialLoginButton from "~/components/atoms/SocialLoginButton";

const loginOptions = {
  callbackUrl: "/member-area",
};

export default function SocialLogin() {
  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      <SocialLoginButton onClick={() => signIn("google", loginOptions)}>
        <span className="sr-only">Sign in with Google</span>
        <GoogleIcon/>
      </SocialLoginButton>

      <SocialLoginButton onClick={() => signIn("discord", loginOptions)}>
        <span className="sr-only">Sign in with Discord</span>
        <DiscordIcon/>
      </SocialLoginButton>

      <SocialLoginButton onClick={() => signIn("github", loginOptions)}>
        <span className="sr-only">Sign in with GitHub</span>
        <GithubIcon/>
      </SocialLoginButton>
    </div>
  );
}
