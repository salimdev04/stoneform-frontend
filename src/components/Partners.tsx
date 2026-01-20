import React from 'react';
import Image from 'next/image';
import { Building2, Globe2, Landmark, Shield, Megaphone } from 'lucide-react';

const Partners = () => {
    const partnerCategories = [
        {
            title: "Real Estate Marketplaces",
            icon: Building2,
            color: "stone-cyan",
            partners: [
                { name: "Stirling Ackroyd", logo: "/parteners/stirling-ackroyd.webp", width: 200, height: 60 },
                { name: "Rightmove", logo: "/parteners/rightmove-2.jpg", width: 300, height: 150 },
            ]
        },
        {
            title: "Global Property Platforms",
            icon: Globe2,
            color: "stone-purple",
            partners: [
                { name: "Booking.com", logo: "/parteners/booking.png", width: 180, height: 60 },
                { name: "Airbnb", logo: "/parteners/airbnb.png", width: 160, height: 60 },
                { name: "Novotel", logo: "/parteners/novotel.jpg", width: 180, height: 60 },
                { name: "Savills", logo: "/parteners/savills.jpg", width: 160, height: 60 },
                { name: "RE/MAX", logo: "/parteners/remax.jpg", width: 160, height: 60 },
            ]
        },
        {
            title: "Finance & Banking",
            icon: Landmark,
            color: "stone-cyan",
            partners: [
                { name: "BM Samuels", logo: "/parteners/bm-samuels.webp", width: 180, height: 70 },
                { name: "UOB", logo: "/parteners/uob.png", width: 180, height: 60 },
            ]
        },
        {
            title: "Blockchain & Compliance",
            icon: Shield,
            color: "stone-purple",
            partners: [
                { name: "Soken", logo: "/parteners/soken.webp", width: 180, height: 60 },
            ]
        },
        {
            title: "Marketing",
            icon: Megaphone,
            color: "stone-cyan",
            partners: [
                { name: "IBC", logo: "/parteners/ibc.png", width: 180, height: 60 },
            ]
        }
    ];

    return (
        <section className="relative w-full py-24 px-4 md:px-8 bg-stone-dark text-white flex flex-col justify-center items-center overflow-hidden" id="partners">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-purple/5 via-stone-dark to-stone-dark"></div>
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-dark to-transparent pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-dark to-transparent pointer-events-none z-20"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Partners</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Collaborating with industry leaders across real estate, finance, blockchain, and technology to build a trusted ecosystem.
                    </p>
                </div>

                <div className="space-y-12">
                    {partnerCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-2 rounded-xl bg-${category.color}/10 border border-${category.color}/20`}>
                                    <category.icon className={`w-5 h-5 text-${category.color}`} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white">{category.title}</h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {category.partners.map((partner, partnerIndex) => (
                                    <div
                                        key={partnerIndex}
                                        className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg group h-32"
                                    >
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                width={partner.width}
                                                height={partner.height}
                                                className="object-contain max-w-full max-h-full transition-all duration-300 opacity-70 group-hover:opacity-100"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
