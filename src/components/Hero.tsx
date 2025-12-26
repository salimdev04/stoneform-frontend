"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Hero() {
    const pathname = usePathname();
    const router = useRouter();
    const isDashboard = pathname === "/invest";

    const handleInvestNow = () => {
        router.push("/invest");
    };

    const dashboardButtons = [
        { label: "View Portfolio", href: "/portfolio" },
        { label: "Invest", href: "/invest" },
        { label: "Withdraw Funds", href: "/portfolio" },
        { label: "Transaction History", href: "/transactions" },
        { label: "Account Settings", href: "/settings" },
    ];

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background */}
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <>
                    {/* Mobile Hero Background */}
                    <div className="block md:hidden w-full h-full relative">
                        <Image
                            src="/StoneformLPPhoneView.png"
                            alt="Hero Mobile Background"
                            className="object-cover"
                            fill
                            quality={100}
                            priority
                        />
                    </div>
                    {/* Desktop Hero Background */}
                    <div className="hidden md:block w-full h-full relative">
                        <Image
                            src="/StoneformLPBackground.png"
                            alt="Hero Desktop Background"
                            className="object-cover"
                            fill
                            quality={100}
                            priority
                        />
                    </div>
                </>
            </div>

            <div className={`relative z-10 flex flex-col items-center justify-center text-center px-4 w-full mx-auto md:mt-[150px] transition-all duration-700 ease-out ${isDashboard ? '' : 'animate-fade-in-up'}`}>
                <div className="flex items-center justify-center gap-1 sm:gap-4 mb-4 select-none animate-float">
                    <Image src="/stoneform-logo.svg" alt="Stoneform" width={830} height={160} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                </div>


                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-stone-cyan to-stone-purple rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <Button
                        onClick={handleInvestNow}
                        className="!py-2 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-[200px] h-[50px] sm:h-[60px]"
                    >
                        <span className="relative z-10 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-bold tracking-wider">Invest Now</span>
                    </Button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-dark to-transparent pointer-events-none z-20"></div>
        </section>
    );
}
