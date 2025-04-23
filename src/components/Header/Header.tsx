"use client"

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();

    const links = [
        {href: "/", label: "Pós-Graduação"},
        {href: "/bootcamp-pass", label: "Bootcamp Pass"},
        {href: "/cursos-livres", label: "Cursos Livres"},
        {href: "/gratuitos", label: "Gratuitos"},
    ];


    return (
        <header className="bg-[#0c1017] text-white border-solid">
            <div
                className="max-w-screen-2xl mx-auto w-full h-[72px] px-0 max-lg:px-4 items-center justify-between flex gap-4">
                <div className="items-center flex gap-4">
                    <div className="items-center">
                        <Link href={`/`}>
                            <Image
                                src="/logo-xp-educacao.png"
                                alt="Logo XP Educação"
                                width={100}
                                height={40}
                                priority
                            />
                        </Link>
                    </div>

                    <div className="hidden mr-auto md:block">
                        <nav className="">
                            <ul className="flex items-center w-full h-full px-4 overflow-x-auto md:px-0">
                                {links.map((link) => {
                                    const isActive = pathname === link.href;

                                    return (
                                        <li key={link.href} className="flex">
                                            <a
                                                href={link.href}
                                                className={clsx(
                                                    "whitespace-nowrap px-3 py-2 text-xs font-semibold rounded-md cursor-pointer md:px-4 md:text-base flex gap-2 items-center transition-colors",
                                                    isActive
                                                        ? "text-white bg-white/10"
                                                        : "text-primary-dark-300 hover:text-white"
                                                )}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>

                        </nav>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button>Cadastre-se agora</Button>
                    <Button variant={'light-outline'}>Entrar</Button>
                </div>
            </div>
        </header>
    );
}
