import type { NextPage } from 'next';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Roadmap from '../components/Roadmap';
import Tokenomics from '../components/Tokenomics';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>StoneForm Home</title>
        <meta
          content="STONEFORM transforms real estate with blockchain, offering fractional ownership, passive income, and seamless trading, all while promoting sustainability."
          name="description"
        />
        <link href="/StoneformLogo.png" rel="icon" />
      </Head>

      <main className="flex flex-col w-full bg-stone-dark overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Roadmap />
        <Tokenomics />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
