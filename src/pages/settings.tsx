import type { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { userProfile } from '../data/mock';
import { useState } from 'react';
import { User, Shield, CreditCard, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const Settings: NextPage = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'kyc' | 'security'>('profile');

    return (
        <DashboardLayout>
            <Head>
                <title>Settings | StoneForm</title>
            </Head>

            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-white">Account Settings</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Tabs */}
                    <Card className="lg:col-span-1 h-fit !p-2">
                        <nav className="flex flex-col gap-1">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-stone-violet/10 text-stone-purple' : 'text-gray-400 hover:bg-white/5'
                                    }`}
                            >
                                <User size={18} /> Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('kyc')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'kyc' ? 'bg-stone-violet/10 text-stone-purple' : 'text-gray-400 hover:bg-white/5'
                                    }`}
                            >
                                <CreditCard size={18} /> KYC Verification
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-stone-violet/10 text-stone-purple' : 'text-gray-400 hover:bg-white/5'
                                    }`}
                            >
                                <Shield size={18} /> Security
                            </button>
                        </nav>
                    </Card>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <Card title="Personal Information">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-24 h-24 rounded-full bg-white/10 overflow-hidden group cursor-pointer">
                                            {/* Mock Avatar placeholder */}
                                            <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-400">
                                                <User size={40} />
                                            </div>
                                            <div className="absolute inset-0 bg-black/60 hidden group-hover:flex items-center justify-center text-white text-xs font-medium">
                                                Change
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{userProfile.name}</h3>
                                            <p className="text-gray-400 text-sm">{userProfile.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Full Name" defaultValue={userProfile.name} />
                                        <Input label="Email Address" defaultValue={userProfile.email} disabled />
                                        <Input label="Phone Number" placeholder="+1 (555) 000-0000" />
                                        <Input label="Country" defaultValue="United States" />
                                    </div>

                                    <div className="pt-4 border-t border-white/10 flex justify-end">
                                        <button className="bg-stone-violet text-white px-6 py-2 rounded-lg font-semibold hover:bg-stone-violet/80 transition-colors">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {activeTab === 'kyc' && (
                            <Card title="Identity Verification">
                                <div className="space-y-6">
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 flex items-start gap-4">
                                        <CheckCircle className="text-green-400 mt-1" size={24} />
                                        <div>
                                            <h4 className="font-bold text-green-300">Your account is verified</h4>
                                            <p className="text-green-200/70 text-sm mt-1">
                                                You have passed KYC Level 2. You can invest up to unlimited amounts and withdraw freely.
                                            </p>
                                        </div>
                                        <div className="ml-auto">
                                            <Badge variant="success" className="text-sm px-3 py-1">Verified</Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 border border-white/10 rounded-xl">
                                            <p className="text-sm text-gray-400">Document Type</p>
                                            <p className="font-bold text-white">Passport</p>
                                        </div>
                                        <div className="p-4 border border-white/10 rounded-xl">
                                            <p className="text-sm text-gray-400">Submitted Date</p>
                                            <p className="font-bold text-white">March 1, 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {activeTab === 'security' && (
                            <Card title="Security Settings">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between py-4 border-b border-white/10">
                                        <div>
                                            <h4 className="font-bold text-white">Two-Factor Authentication (2FA)</h4>
                                            <p className="text-sm text-gray-400">Add an extra layer of security to your account.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-stone-violet/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-violet"></div>
                                        </label>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-white mb-4">Change Password</h4>
                                        <div className="space-y-4 max-w-md">
                                            <Input type="password" label="Current Password" />
                                            <Input type="password" label="New Password" />
                                            <Input type="password" label="Confirm New Password" />
                                            <button className="bg-stone-dark border border-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-stone-dark/80 transition-colors">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
