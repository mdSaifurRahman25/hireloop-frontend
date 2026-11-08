"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import logo from "@/images/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";

const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    return (
        <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 px-4 pt-4 backdrop-blur-md sm:px-6 lg:px-8">
            <nav
                aria-label="Main"
                className="mx-auto flex h-20 w-full max-w-[1720px] items-center justify-between gap-6 rounded-[28px] bg-[#1b1b1b] px-5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] sm:px-7 lg:h-24 lg:px-10"
            >
                <Link href="/" className="flex shrink-0 items-center">
                    <Image
                        src={logo}
                        alt="hireloop"
                        priority
                        className="h-10 w-auto lg:h-11"
                    />
                </Link>

                <div className="hidden flex-1 items-center justify-center gap-9 lg:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`text-[15px] font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-zinc-200"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden items-center gap-6 lg:flex">
                    <span aria-hidden="true" className="h-7 w-px bg-white/15" />
                    <Link
                        href="/sign-in"
                        className="text-[15px] font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/sign-up"
                        className={buttonVariants({
                            size: "lg",
                            className:
                                "h-12 rounded-2xl! bg-indigo-600! px-7 text-[15px] font-semibold text-white! hover:bg-indigo-500!",
                        })}
                    >
                        Get Started
                    </Link>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    className="text-zinc-200 hover:bg-white/10 hover:text-white lg:hidden [&_svg]:size-5"
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    aria-label={open ? "Close menu" : "Open menu"}
                    onClick={() => setOpen((isOpen) => !isOpen)}
                >
                    {open ? <X /> : <Menu />}
                </Button>
            </nav>

            {open && (
                <nav
                    id="mobile-nav"
                    aria-label="Mobile"
                    className="mx-auto mt-2 w-full max-w-[1720px] animate-in fade-in slide-in-from-top-2 rounded-[28px] bg-[#1b1b1b] p-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] duration-200 lg:hidden"
                >
                    <div className="flex flex-col">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`rounded-xl px-4 py-3 text-[15px] font-medium transition-colors hover:bg-white/5 hover:text-white ${isActive ? "bg-white/5 text-white" : "text-zinc-200"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                        <Link
                            href="/sign-in"
                            onClick={() => setOpen(false)}
                            className="rounded-xl px-4 py-3 text-[15px] font-medium text-indigo-400 transition-colors hover:bg-white/5 hover:text-indigo-300"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={() => setOpen(false)}
                            className={buttonVariants({
                                size: "lg",
                                className:
                                    "h-12 w-full rounded-2xl! bg-indigo-600! text-[15px] font-semibold text-white! hover:bg-indigo-500!",
                            })}
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
