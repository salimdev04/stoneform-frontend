import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Added import
// import Navbar from '../components/Navbar'; // Removed/Kept existing comment if needed, but logic replaces it
import Footer from '../components/Footer';
import { Settings, History, ArrowDown, ChevronDown, Wallet, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import { useAccount } from 'wagmi';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import Button from '../components/Button';

const Invest = () => {
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const [sellAmount, setSellAmount] = useState('');
    const [buyAmount, setBuyAmount] = useState('');
    const [selectedToken, setSelectedToken] = useState('BNB');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Conversion rates and mock prices
    const tokens = {
        BNB: { symbol: 'BNB', rate: 10000, price: 3200, image: '/bnb.webp' },
        USDT: { symbol: 'USDT', rate: 3.125, price: 1, image: '/usdt.png' },
        USDC: { symbol: 'USDC', rate: 3.125, price: 1, image: '/usdc.png' },
    };

    const handleSellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setSellAmount(value);
            const token = tokens[selectedToken as keyof typeof tokens];
            setBuyAmount(value ? (parseFloat(value) * token.rate).toFixed(2) : '');
        }
    };

    const handleTokenSelect = (tokenStart: string) => {
        setSelectedToken(tokenStart);
        setIsDropdownOpen(false);
        // Recalculate buy amount with new rate
        if (sellAmount) {
            const token = tokens[tokenStart as keyof typeof tokens];
            setBuyAmount((parseFloat(sellAmount) * token.rate).toFixed(2));
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-stone-dark text-white overflow-x-hidden">
            <Head>
                <title>Invest | StoneForm</title>
                <meta name="description" content="Swap ETH/USDT for STOF tokens securely and instantly." />
                <link href="/StoneformLogo.png" rel="icon" />
            </Head>

            {/* Custom Header for Invest Page */}
            <header className="absolute top-0 left-0 right-0 z-50 py-6 flex items-center justify-between max-w-7xl mx-auto w-full">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-400 group-hover:text-white font-medium transition-colors hidden sm:block">Back to Home</span>
                </Link>

                <div>
                    {!isConnected ? (
                        <button
                            onClick={openConnectModal}
                            className="bg-stone-cyan/10 hover:bg-stone-cyan/20 text-stone-cyan border border-stone-cyan/20 py-2 px-4 rounded-xl font-bold transition-all flex items-center gap-2"
                        >
                            <Wallet className="w-4 h-4" />
                            Connect Wallet
                        </button>
                    ) : (
                        <div className='flex'>
                            <ConnectButton showBalance={false} accountStatus="address" chainStatus="none" />
                            <Button variant="secondary" className="!py-2 ml-4 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-auto sm:w-[160px] h-[40px] sm:h-[50px]">
                                Contact
                            </Button>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center relative mt-20 pt-24 pb-12 px-4 md:px-8">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a0a2e] via-stone-dark to-stone-dark opacity-60"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-stone-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-stone-purple/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

                    {/* Left Column: Visuals */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-fade-in-up">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                                Trade <span className="text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">$STOF</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 font-light max-w-lg">
                                Securely exchange your assets for STOF tokens and join the future of real estate investment on-chain.
                            </p>
                        </div>

                        {/* Video Container with Glow */}
                        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                            <div className="absolute inset-0 bg-stone-cyan/20 blur-3xl rounded-full scale-90 animate-pulse-slow"></div>
                            <img src={"/StoneformLogo.png"} alt="StoneformCoin" className="w-full h-full object-contain relative z-10 mix-blend-lighten" />
                        </div>
                    </div>

                    {/* Right Column: Swap Widget */}
                    <div className="w-full max-w-lg mx-auto lg:mx-0 animate-fade-in-up delay-100">
                        <div className="glass-card rounded-3xl p-6 border border-white/5 bg-stone-dark/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Exchange</h2>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                                        <History className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Network Selector */}
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-sm text-gray-400">Network:</span>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                    <div className="w-4 h-4 rounded-full bg-[#b07405]"></div>
                                    <span className="text-sm font-medium">Binance Smart Chain</span>
                                </div>
                            </div>

                            {/* Swap Inputs */}
                            <div className="space-y-2 relative">

                                {/* Sell Input */}
                                <div className="bg-black/20 rounded-2xl p-4 hover:ring-1 hover:ring-white/10 transition-all z-20 relative">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-400">You sell</span>
                                        <div className="flex items-center gap-2 opacity-50">
                                            <span className="text-xs text-gray-500">Balance: 0</span>
                                            <button className="text-xs text-stone-cyan font-bold hover:text-stone-cyan/80">MAX</button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <input
                                            type="text"
                                            value={sellAmount}
                                            onChange={handleSellChange}
                                            placeholder="0"
                                            className="bg-transparent text-3xl font-bold text-white outline-none w-full placeholder-gray-600"
                                        />
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full px-3 py-1.5 transition-all min-w-[120px] justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <img src={tokens[selectedToken as keyof typeof tokens].image} alt={selectedToken} className="w-6 h-6 rounded-full" />
                                                    <span className="font-bold">{selectedToken}</span>
                                                </div>
                                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {isDropdownOpen && (
                                                <div className="absolute top-full right-0 mt-2 w-full min-w-[120px] bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in z-50">
                                                    {Object.entries(tokens).map(([key, token]) => (
                                                        <button
                                                            key={key}
                                                            onClick={() => handleTokenSelect(key)}
                                                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 transition-colors text-left"
                                                        >
                                                            <img src={token.image} alt={token.symbol} className="w-5 h-5 rounded-full" />
                                                            <span className="text-sm font-medium">{token.symbol}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {sellAmount ? `$${(parseFloat(sellAmount) * tokens[selectedToken as keyof typeof tokens].price).toLocaleString()}` : '$0.00'}
                                    </div>
                                </div>

                                {/* Swap Connector */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <button className="w-10 h-10 rounded-xl bg-[#1e1e38] border-4 border-stone-dark flex items-center justify-center hover:scale-110 transition-transform shadow-lg group">
                                        <ArrowDown className="w-5 h-5 text-stone-cyan group-hover:text-stone-purple transition-colors" />
                                    </button>
                                </div>

                                {/* Buy Input */}
                                <div className="bg-black/20 rounded-2xl p-4 hover:ring-1 hover:ring-white/10 transition-all pt-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-400">You receive</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <input
                                            type="text"
                                            value={buyAmount}
                                            readOnly
                                            placeholder="0"
                                            className="bg-transparent text-3xl font-bold text-stone-cyan outline-none w-full placeholder-gray-600 cursor-default"
                                        />
                                        <div className="flex items-center gap-2 bg-stone-cyan/10 border border-stone-cyan/20 rounded-full px-3 py-1.5">
                                            <div className="w-6 h-6 rounded-full overflow-hidden bg-stone-dark relative">
                                                <img src="/StoneformLogo.png" alt="StoneformCoin" className="w-full h-full object-contain mix-blend-lighten" />
                                            </div>
                                            <span className="font-bold text-stone-cyan">STOF</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1 flex justify-between">
                                        <span>$0.32</span>
                                        <span className="text-stone-purple text-xs flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-stone-purple animate-pulse"></span>
                                            Best Price
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-6">
                                {!isConnected ? (
                                    <Button
                                        variant="primary"
                                        onClick={openConnectModal}
                                        className="!py-2 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-auto h-[60px] w-full"
                                    >
                                        <Wallet className="w-5 h-5" />
                                        Connect Wallet
                                    </Button>
                                ) : (
                                    <Button variant="primary" className="!py-2 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-auto h-[60px] w-full">
                                        Swap Now
                                    </Button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* Disclaimer Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <div className="border-t border-white/10 pt-8">
                    <p className="text-[10px] md:text-xs text-gray-500 text-justify leading-relaxed font-light">
                        The STONEFORM Token (STOF) is a blockchain-based token designed to provide participation in the STONEFORM ecosystem, including fractional exposure to tokenized real estate assets and platform governance rights, subject to applicable terms and regulatory requirements. STOF does not represent equity, ownership, or shares in STONEFORM or any affiliated entity, nor does it guarantee profits, returns, or capital preservation. Participation in the STOF token sale and holding STOF involves significant risks, including market volatility, regulatory uncertainty, liquidity limitations, and potential technical or smart contract failures. The availability and transferability of STOF may be restricted in certain jurisdictions, and all participants are responsible for ensuring compliance with applicable local laws and regulations. Nothing in this communication constitutes legal, financial, tax, or investment advice, and all forward-looking statements are subject to change without notice.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Invest;
