import type { NextPage } from 'next';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>StoneForm Home</title>
        <meta
          content="STONEFORM transforms real estate with blockchain, offering fractional ownership, passive income, and seamless trading, all while promoting sustainability."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-between">
        <Navbar />
        <Hero />
      </main>
    </div>
  );
};

export default Home;
