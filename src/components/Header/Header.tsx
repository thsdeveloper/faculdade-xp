"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose, SheetTitle,
} from "@/components/ui/sheet";

export default function Header() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Pós-Graduação" },
        { href: "/bootcamp-pass", label: "Bootcamp Pass" },
        { href: "/cursos-livres", label: "Cursos Livres" },
        { href: "/gratuitos", label: "Gratuitos" },
    ];

    return (
        <header className="bg-[#0c1017] text-white border-solid">
            <div className="max-w-screen-2xl mx-auto w-full h-[72px] px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Image
                            src="/logo-xp-educacao.png"
                            alt="Logo XP Educação"
                            width={100}
                            height={40}
                            priority
                        />
                    </Link>

                    {/* Menu desktop */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-2">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={clsx(
                                                "whitespace-nowrap px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                                                isActive
                                                    ? "text-white bg-white/10"
                                                    : "text-primary-dark-300 hover:text-white"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                {/* Botões desktop */}
                <div className="hidden md:flex gap-2">
                    <Button>Cadastre-se agora</Button>
                    <Button variant="light-outline">Entrar</Button>
                </div>

                {/* Mobile: botão menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6 text-white" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-[#0c1017] text-white w-64">
                            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                            <div className="flex items-center justify-between mb-6 px-4 pt-4">
                                <Link href="/" onClick={() => {}}>
                                    <Image
                                        src="/logo-xp-educacao.png"
                                        alt="Logo"
                                        width={100}
                                        height={40}
                                    />
                                </Link>
                            </div>
                            <nav className="flex flex-col gap-3 px-4">
                                {links.map((link) => (
                                    <SheetClose asChild key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={clsx(
                                                "block px-3 py-2 rounded-md text-sm font-medium transition",
                                                pathname === link.href
                                                    ? "text-white bg-white/10"
                                                    : "text-primary-dark-300 hover:text-white"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>

                            <div className="mt-6 flex flex-col gap-2 px-4">
                                <SheetClose asChild>
                                    <Button className="w-full">Cadastre-se agora</Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button variant="light-outline" className="w-full">
                                        Entrar
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
