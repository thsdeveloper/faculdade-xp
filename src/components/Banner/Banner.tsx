import {Button} from "@/components/ui/button";

export default function Banner() {
    return (
        <section className="relative text-white">
            <div className=" mx-auto px-4 md:px-6 lg:px-8 py-16 rounded-xl overflow-hidden"
                 style={{
                     backgroundImage: "url('/banner-2.webp')",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                     backgroundRepeat: "no-repeat",
                 }}>
                <div className="bg-black/60 absolute inset-0 z-0 rounded-xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Alavanque a sua carreira
                        </h1>
                        <p className="mb-6">
                            Invista no seu futuro agora! Escolha os melhores cursos de
                            pós-graduação na Faculdade XP e alcance novas conquistas
                            profissionais.
                        </p>
                        <Button>Conheça os cursos</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
