import React from 'react';
import { Target, TrendingUp, ShieldCheck, Users } from 'lucide-react';

const About = () => {
    return (
        <section className="relative w-full py-24 px-4 md:px-8 bg-stone-dark text-white flex flex-col justify-center items-center overflow-hidden" id="about">
            {/* Background Image & Overlays */}
            <div
                className="absolute inset-0 z-0 bg-[url('/stoneform-about-cityscape.png')] bg-cover bg-center bg-fixed opacity-40"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-stone-dark via-stone-dark/80 to-stone-dark"></div>
            </div>

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-dark to-transparent pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-dark to-transparent pointer-events-none z-20"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">About Us</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Reinventing real estate investment through blockchain technology, transparency, and regulated global accessibility.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

                    {/* Vision Card (Large) */}
                    <div className="md:col-span-12 glass-card rounded-3xl p-8 md:p-10 border border-white/5 bg-white/5 backdrop-blur-md flex flex-col justify-center transition-transform duration-300 hover:scale-[1.01] hover:bg-white/10 group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-stone-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6 text-stone-cyan" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold">Our Vision</h3>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed font-light">
                            At <span className="text-white font-semibold">STONEFORM</span>, we are building a new generation of real estate investment infrastructure by combining institutional-grade property expertise with blockchain technology. Our mission is to make premium real estate accessible to a global audience through <span className="text-stone-cyan">fractional exposure to tokenized real estate assets</span>, <span className="text-stone-cyan">transparent on-chain infrastructure</span>, and <span className="text-stone-cyan">sustainable, long-term growth</span> supported by smart-contract–enabled governance mechanisms.
                        </p>
                    </div>

                    {/* Value Card 1 */}
                    <div className="md:col-span-6 glass-card rounded-3xl p-8 border border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-6 transition-colors duration-300 hover:bg-white/10 group">
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-stone-cyan/10 flex items-center justify-center group-hover:bg-stone-cyan/20 transition-colors">
                            <ShieldCheck className="w-7 h-7 text-stone-cyan" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2">Secure & Compliant</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                STONEFORM operates within a robust legal and regulatory framework, integrating KYC/AML procedures, jurisdiction-specific compliance requirements, and smart-contract-based enforcement to ensure transparency, security, and regulatory alignment.
                            </p>
                        </div>
                    </div>

                    {/* Value Card 2 */}
                    <div className="md:col-span-6 glass-card rounded-3xl p-8 border border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-6 transition-colors duration-300 hover:bg-white/10 group">
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-stone-purple/10 flex items-center justify-center group-hover:bg-stone-purple/20 transition-colors">
                            <Users className="w-7 h-7 text-stone-purple" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2">Community Driven</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Governance at STONEFORM is designed to be transparent and participatory. Eligible STOF token holders may participate in defined platform governance processes, including advisory input on asset strategy, platform development priorities, and ecosystem evolution, subject to applicable legal and regulatory constraints.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
