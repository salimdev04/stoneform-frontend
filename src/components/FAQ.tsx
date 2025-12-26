import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
    {
        question: "What is STOF?",
        answer:
            "STOF is the native utility token of the STONEFORM ecosystem, providing holders with investment access, governance rights, and staking rewards in our real estate investment platform.",
    },
    {
        question: "Is STOF a legal investment?",
        answer:
            "Yes, STONEFORM operates in full compliance with UK regulations and international investment laws. Our platform is designed to meet all legal requirements for tokenized real estate investments.",
    },
    {
        question: "How do I earn from STOF?",
        answer:
            "STOF holders earn through multiple channels: staking rewards, dividend distributions from property income, and potential token value appreciation as the portfolio grows.",
    },
    {
        question: "Can I sell my tokens later?",
        answer:
            "Yes, after the public listing, STOF tokens will be tradeable on supported exchanges. Our platform also provides liquidity mechanisms for token holders.",
    },
    {
        question: "Is there a minimum investment amount?",
        answer:
            "The minimum investment varies by phase. During presale, we offer accessible entry points to allow broad participation in our real estate portfolio.",
    },
    {
        question: "What makes STONEFORM unique?",
        answer:
            "STONEFORM combines $287M+ in real estate expertise with blockchain technology, offering fractional ownership of premium global properties, transparent governance, and sustainable returns.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full py-24 px-4 md:px-8 bg-stone-dark text-white flex flex-col justify-center items-center overflow-hidden" id="faq">
            {/* Background Image & Overlays */}
            <div
                className="absolute inset-0 z-0 bg-[url('/stoneform-faq-bg.png')] bg-cover bg-top bg-fixed opacity-30"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-stone-dark via-stone-dark/80 to-stone-dark"></div>
            </div>

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-dark to-transparent pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-dark to-transparent pointer-events-none z-20"></div>

            <div className="relative z-10 max-w-4xl w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                        <span className="text-gradient">FAQ</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto font-light">
                        Everything you need to know about the STONEFORM ecosystem and investment process.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${openIndex === index ? 'bg-white/10 border-stone-cyan/30 shadow-[0_0_20px_rgba(0,198,255,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === index ? 'bg-stone-cyan/20 text-stone-cyan' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                        <HelpCircle className="w-5 h-5" />
                                    </div>
                                    <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/10 transition-all duration-300 ${openIndex === index ? 'bg-stone-cyan text-stone-dark rotate-180' : 'bg-transparent text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-300 font-light leading-relaxed border-t border-white/5 mx-6 mt-2">
                                    <p className="py-4">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-400 mb-6">Still have questions?</p>
                    <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105 group">
                        <MessageCircle className="w-4 h-4 text-stone-cyan group-hover:text-stone-purple transition-colors" />
                        Contact Support
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
