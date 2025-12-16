import type { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../../components/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { availableInvestments } from '../../data/mock';
import { MapPin, TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Invest: NextPage = () => {
    return (
        <DashboardLayout>
            <Head>
                <title>Invest | StoneForm</title>
            </Head>

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Investment Opportunities</h1>
                        <p className="text-gray-400 mt-1">Explore and invest in premium real estate assets.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableInvestments.map((item) => (
                        <Card key={item.id} className="!p-0 overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300">
                            <div className="relative h-48 w-full bg-white/5">
                                {/* Placeholder for image if not using actual images yet, or use next/image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-white/5">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="hover:scale-105 transition-transform duration-500"
                                    // Fallback or placeholder handling could be added here
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    {item.tags.map(tag => (
                                        <Badge key={tag} variant="info" className="bg-white/20 text-white backdrop-blur-sm border border-white/30">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-white line-clamp-1">{item.title}</h3>
                                        <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                                            <MapPin size={16} />
                                            {item.location}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-2">{item.description}</p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-stone-violet/10 p-3 rounded-lg">
                                        <p className="text-xs text-stone-purple mb-1">Target Return</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-1">
                                            <TrendingUp size={16} /> {item.targetReturn}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <p className="text-xs text-gray-400 mb-1">Min Investment</p>
                                        <p className="text-lg font-bold text-white">{item.minInvestment}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Funding Progress</span>
                                        <span className="font-bold text-white">{item.fundingProgress}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div
                                            className="bg-stone-violet h-2 rounded-full transition-all duration-1000"
                                            style={{ width: `${item.fundingProgress}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>Target: {item.totalFunding}</span>
                                        <span>{item.fundingProgress >= 100 ? "Filled" : "Open"}</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <button className="w-full bg-stone-violet text-white py-3 rounded-xl font-bold font-montserrat shadow-lg hover:shadow-stone-violet/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                                        Invest Now <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Invest;
