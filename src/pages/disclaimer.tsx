import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { ArrowLeft, ShieldAlert, AlertTriangle, FileText, Globe, Scale, Cpu, History } from 'lucide-react';

const Disclaimer = () => {
    return (
        <div className="flex flex-col min-h-screen bg-stone-dark text-white overflow-x-hidden">
            <Head>
                <title>Disclaimer | StoneForm</title>
                <meta name="description" content="General Legal Disclaimer for STONEFORM ecosystem and STOF tokens." />
                <link href="/StoneformLogo.png" rel="icon" />
            </Head>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-50 py-6 flex items-center justify-between max-w-7xl mx-auto w-full px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-400 group-hover:text-white font-medium transition-colors hidden sm:block">Back to Home</span>
                </Link>
            </header>

            <main className="flex-grow pt-32 pb-20 px-4 md:px-8 relative z-10">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-dark via-stone-dark to-[#0a0a2e] opacity-60 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-stone-cyan/10 mb-6">
                            <ShieldAlert className="w-8 h-8 text-stone-cyan" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            General Legal <span className="text-gradient">Disclaimer</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Please read this disclaimer carefully before participating in the STONEFORM ecosystem.
                        </p>
                    </div>

                    <div className="space-y-8 animate-fade-in-up delay-100">

                        {/* Intro */}
                        <div className="glass-card rounded-2xl p-8 bg-white/5 backdrop-blur-md">
                            <p className="text-gray-300 leading-relaxed mb-4">
                                STONEFORM publishes this whitepaper for informational purposes only. It does not constitute an offer, solicitation, or recommendation to buy or sell any securities, tokens, or financial instruments in any jurisdiction.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                The content of this whitepaper should not be considered legal, financial, tax, or investment advice. Readers are strongly encouraged to seek independent advice from qualified professionals before making any investment decision.
                            </p>
                        </div>

                        {/* No Investment Guarantee */}
                        <div className="glass-card rounded-2xl p-8 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingDownIcon className="w-6 h-6 text-stone-purple" />
                                <h2 className="text-2xl font-bold text-white">No Investment Guarantee</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Participation in the STONEFORM ecosystem and holding STOF tokens does not guarantee profits, returns, or capital preservation.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                All projections, financial figures, timelines, and performance indicators described in this whitepaper are forward-looking statements and may differ materially from actual outcomes due to market conditions, regulatory changes, or operational risks.
                            </p>
                        </div>

                        {/* Regulatory & Jurisdiction */}
                        <div className="glass-card rounded-2xl p-8 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="w-6 h-6 text-stone-cyan" />
                                <h2 className="text-2xl font-bold text-white">Regulatory & Jurisdiction Disclaimer</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                The availability of STOF tokens and STONEFORM services may be restricted in certain jurisdictions. It is the sole responsibility of each participant to ensure compliance with local laws, regulations, and restrictions applicable in their country of residence.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                STONEFORM does not accept responsibility for participation that violates local regulatory frameworks.
                            </p>
                        </div>

                        {/* Risk Disclosure */}
                        <div className="glass-card rounded-2xl p-8 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="w-6 h-6 text-orange-500" />
                                <h2 className="text-2xl font-bold text-white">Risk Disclosure</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Investing in tokenized real estate and blockchain-based assets involves significant risks, including but not limited to:
                            </p>
                            <ul className="space-y-2 text-gray-300 list-disc pl-5 mb-4">
                                <li>Market volatility and real estate market fluctuations</li>
                                <li>Regulatory and legal uncertainty across jurisdictions</li>
                                <li>Liquidity risks and limited secondary market availability</li>
                                <li>Smart contract vulnerabilities or technical failures</li>
                                <li>Economic, political, and currency risks</li>
                            </ul>
                            <p className="text-gray-300 leading-relaxed font-semibold">
                                Participants acknowledge that they may lose part or all of their invested capital.
                            </p>
                        </div>

                        {/* No Liability */}
                        <div className="glass-card rounded-2xl p-8 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="w-6 h-6 text-stone-purple" />
                                <h2 className="text-2xl font-bold text-white">No Liability Disclaimer</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                STONEFORM, its team, partners, and affiliates shall not be held liable for any direct or indirect loss, damage, or claim arising from:
                            </p>
                            <ul className="space-y-2 text-gray-300 list-disc pl-5 mb-4">
                                <li>Use of this whitepaper</li>
                                <li>Participation in the STOF token ecosystem</li>
                                <li>Reliance on projections, timelines, or stated objectives</li>
                            </ul>
                            <p className="text-gray-300 leading-relaxed">
                                All participation is done at the user’s own risk.
                            </p>
                        </div>

                        {/* Technology & Smart Contract */}
                        <div className="glass-card rounded-2xl p-8 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <Cpu className="w-6 h-6 text-stone-cyan" />
                                <h2 className="text-2xl font-bold text-white">Technology & Smart Contract Disclaimer</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                While STONEFORM leverages smart contracts to enhance transparency and automation, no system is entirely risk-free.
                                Technical failures, cyber-attacks, bugs, or network congestion may impact platform performance or fund distribution.
                            </p>
                        </div>

                        {/* Forward Looking Statements */}
                        <div className="glass-card rounded-2xl p-8 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-6 h-6 text-stone-purple" />
                                <h2 className="text-2xl font-bold text-white">Forward-Looking Statements Disclaimer</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                This whitepaper contains statements regarding future plans, expansion strategies, asset growth, and ecosystem development.
                                These statements are subject to change without notice and are based on assumptions that may not materialize.
                            </p>
                        </div>

                        {/* Amendments */}
                        <div className="glass-card rounded-2xl p-8 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3 mb-4">
                                <History className="w-6 h-6 text-gray-400" />
                                <h2 className="text-2xl font-bold text-white">Amendments & Updates</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                STONEFORM reserves the right to modify, update, or revise this whitepaper at any time to reflect changes in strategy, regulation, or market conditions.
                                No obligation exists to notify readers individually of such updates.
                            </p>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

// Helper icon
const TrendingDownIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
        <polyline points="16 17 22 17 22 11" />
    </svg>
);

export default Disclaimer;
