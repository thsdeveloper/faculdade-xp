"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#0c1017] text-white flex items-center justify-center p-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center max-w-lg space-y-6"
            >
                <motion.h1
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 1, -1, 0],
                        textShadow: [
                            "0 0 0px lime",
                            "0 0 10px lime",
                            "0 0 0px lime",
                        ],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                    }}
                    className="text-[120px] font-black text-lime-400 leading-none drop-shadow-xl"
                >
                    404
                </motion.h1>

                <p className="text-xl font-semibold">
                    Opa! Essa página se perdeu no espaço 🌌
                </p>
                <p className="text-muted-foreground text-sm">
                    A rota que você tentou acessar não foi encontrada. Vamos te colocar no caminho certo.
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                >
                    <Link href="/">
                        <Button variant="default" className="mt-4">
                            Voltar para a home
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </main>
    );
}
