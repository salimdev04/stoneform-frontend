"use client";

import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import StatusModal from "./StatusModal";

const INVEST_UNLOCK_AT_UTC_MS = Date.UTC(2026, 0, 27, 15, 0, 0);

export default function Navbar() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);

    const [isInvestLockedModalOpen, setIsInvestLockedModalOpen] = useState(false);

    const isInvestUnlocked = useMemo(() => {
        return Date.now() >= INVEST_UNLOCK_AT_UTC_MS;
    }, []);

    const handleExplore = () => {
        if (!isInvestUnlocked) {
            setIsInvestLockedModalOpen(true);
            return;
        }

        router.push("/invest");
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 py-4 flex items-center justify-between px-4 sm:px-8 sm:py-6 max-w-[2000px] mx-auto transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-stone-dark shadow-lg' : 'bg-transparent'
            }`}>
            <StatusModal
                isOpen={isInvestLockedModalOpen}
                onClose={() => setIsInvestLockedModalOpen(false)}
                status={null}
                title="Invest opens soon"
                message="Invest will be available on 27 Jan at 7:00 PM Dubai time."
                actionLabel="Got it"
                onAction={() => setIsInvestLockedModalOpen(false)}
            />
            <Link href={"/"} className="flex items-center gap-2">
                <div className="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] relative">
                    {!isScrolled ? (
                        <Image
                            src="/StoneformLogo.png"
                            alt="StoneForm"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 60px, 100px"
                            priority
                        />
                    ) : (
                        <Image
                            src="/Coin.gif"
                            alt="StoneForm"
                            fill
                            className="object-contain mix-blend-screen"
                            sizes="(max-width: 640px) 60px, 100px"
                            unoptimized
                        />
                    )}
                </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
                {isScrolled && (
                    <Button
                        variant="primary"
                        onClick={handleExplore}
                        className="!py-2 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-[200px] h-[50px] sm:h-[60px]"
                    >
                        Invest Now
                    </Button>
                )}
                <Button variant="secondary" className="!py-2 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-auto sm:w-[160px] h-[40px] sm:h-[50px]" onClick={() => window.open('/WhitepaperV5.pdf', '_blank')}>
                    Whitepaper
                </Button>
                {/* <Button variant="secondary" className="!py-2 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-auto sm:w-[160px] h-[40px] sm:h-[50px]">
                    Contact
                </Button> */}
            </div>
        </nav>
    );
}
