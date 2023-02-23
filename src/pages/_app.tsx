import React from "react";
import type {AppProps} from "next/app";
import type {NextComponentType} from "next";
import type {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";

import {api} from "~/utils/api";

import "~/styles/globals.css";

type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: React.ReactElement) => React.ReactNode
  },
  pageProps: {
    session: Session
  }
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page)

  return (
    <SessionProvider session={session as Session | null}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp as NextComponentType);
