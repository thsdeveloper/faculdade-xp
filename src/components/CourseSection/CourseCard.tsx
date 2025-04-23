import {Button} from "@/components/ui/button";
import Image from 'next/image'

interface CourseCardProps {
    title: string;
    image: string;
}

export default function CourseCard({title, image}: CourseCardProps) {
    return (
        <>
            <div className="rounded-xl overflow-hidden group relative shadow transition">
                {/* Imagem */}
                <div className="relative">
                    <Image
                        src={image}
                        alt={title}
                        className="w-full h-45 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Fita no canto superior direito */}
                    <div className="absolute max-md:top-0 max-md:left-0 md:top-4 md:-right-9 max-md:w-full">
                        <div
                            className="flex font-semibold text-[12px] text-black md:rotate-[34.651deg] bg-lime-400 py-[6px] px-[6px] justify-center md:min-w-[160px] max-md:w-full">
                            Conheça o curso
                        </div>
                    </div>

                    {/* Overlay ao hover */}
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm text-white font-semibold px-4">
                            {title}
                        </p>
                        <Button variant="default" className="text-sm">
                            Conheça o curso
                        </Button>
                    </div>
                </div>
            </div>
            {/* Título fixo abaixo */}
            <div className="p-3">
                <p className="text-sm font-semibold text-white">{title}</p>
            </div>
        </>
    );
}
