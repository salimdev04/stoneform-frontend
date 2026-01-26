"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import StatusModal from "./StatusModal";

const INVEST_UNLOCK_AT_UTC_MS = Date.UTC(2026, 0, 27, 15, 0, 0);

export default function Hero() {
    const pathname = usePathname();
    const router = useRouter();
    const isDashboard = pathname === "/invest";

    const [isInvestLockedModalOpen, setIsInvestLockedModalOpen] = useState(false);

    const isInvestUnlocked = useMemo(() => {
        return Date.now() >= INVEST_UNLOCK_AT_UTC_MS;
    }, []);

    const handleInvestNow = () => {
        if (!isInvestUnlocked) {
            setIsInvestLockedModalOpen(true);
            return;
        }

        router.push("/invest");
    };

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            <StatusModal
                isOpen={isInvestLockedModalOpen}
                onClose={() => setIsInvestLockedModalOpen(false)}
                status={null}
                title="Invest opens soon"
                message="Invest will be available on 27 Jan at 7:00 PM Dubai time."
                actionLabel="Got it"
                onAction={() => setIsInvestLockedModalOpen(false)}
            />
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
                    <Image src="/stoneformtextlogo.png" alt="Stoneform" width={830} height={160} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
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
