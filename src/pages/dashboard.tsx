import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
import DappNavbar from '../components/DappNavbar';
import Footer from '../components/Footer';
import BalanceCard from '../components/dashboard/BalanceCard';
import PresaleProgress from '../components/dashboard/PresaleProgress';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Dashboard: NextPage = () => {

    return (
        <div className="min-h-screen bg-stone-dark text-white flex flex-col font-sans">
            <Head>
                <title>StoneForm Dashboard</title>
                <meta name="description" content="Manage your StoneForm investments" />
        <link href="/StoneformLogo.png" rel="icon" />
            </Head>

            {/* <Navbar /> */}
            <DappNavbar />

            <main className="flex-grow pt-52 pb-12 px-4 sm:px-8 max-w-7xl w-full mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                        Dashboard
                    </h1>
                </div>

                {/* Balance Section - New Feature */}
                <div className="mb-8 animate-fade-in-up">
                    <BalanceCard />
                </div>

                {/* Presale Progress - New Feature */}
                <div className="animate-fade-in-up delay-75">
                    <PresaleProgress />
                </div>


                {/* Transaction History Section - New Feature */}
                <div className="animate-fade-in-up delay-100">
                    <TransactionHistory />
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
