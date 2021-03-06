import type { NextComponentType } from "next";
import Head from 'next/head'

const Page: NextComponentType = ({children}) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Voting App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="text-center">
        <h1 className="text-3xl font-bold">Asgard Empire Succession Voting</h1>
      </nav>
      <main className="flex justify-center">{children}</main>
      <footer className="flex justify-center">
        Created by Asgard Succession Council
      </footer>
  </div>
  );
};

export default Page;
