import React from 'react';
import Image from 'next/image';

const AsSeenOn = () => {
    const mediaOutlets = [
        { name: "MarketWatch", logo: "/media/marketwatch.png", width: 180, height: 60 },
        { name: "Seeking Alpha", logo: "/media/seeking-alpha.png", width: 180, height: 60 },
        { name: "Yahoo Finance", logo: "/media/yahoo-finance.png", width: 180, height: 60 },
        { name: "New York Post", logo: "/media/new-york-post.png", width: 180, height: 60 },
        { name: "PR Newswire", logo: "/media/pr-newswire.png", width: 180, height: 60 },
        { name: "FOX8", logo: "/media/fox8.png", width: 180, height: 60 },
        { name: "Benzinga", logo: "/media/benzinga.png", width: 180, height: 60 },
        { name: "CBN", logo: "/media/cbn.png", width: 180, height: 60 },
    ];

    return (
        <section className="relative w-full py-24 px-4 md:px-8 bg-stone-dark text-white flex flex-col justify-center items-center overflow-hidden" id="as-seen-on">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-purple/5 via-stone-dark to-stone-dark"></div>
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-dark to-transparent pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-dark to-transparent pointer-events-none z-20"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-purple via-stone-cyan to-stone-purple drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                            As Seen On
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Featured across leading financial and media publications worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {mediaOutlets.map((outlet, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg group h-32"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={outlet.logo}
                                    alt={outlet.name}
                                    width={outlet.width}
                                    height={outlet.height}
                                    className="object-contain max-w-full max-h-full transition-all duration-300 opacity-70 group-hover:opacity-100"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AsSeenOn;
