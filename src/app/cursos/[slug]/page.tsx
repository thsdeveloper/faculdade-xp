import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CourseSection from "@/components/CourseSection/CourseSection";

interface Props {
    params: { slug: string };
}

export default async function CourseDetailsPage({ params }: Props) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/data/courses.json`);
    const data = await res.json();

    const allCourses = [...data.fastLearning, ...data.duplaCertificacao];
    const course = allCourses.find((c) => c.slug === params.slug);

    if (!course) return notFound();

    return (
        <main className="bg-[#0e1629] text-white">
            {/* HERO */}
            <section className="relative w-full h-[40vh] md:h-[40vh] flex items-center justify-start overflow-hidden">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover object-center brightness-[0.3]"
                    priority
                />
                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                    <p className="text-md md:text-lg text-muted-foreground max-w-xl">{course.description}</p>
                    <Button className="mt-6">Matricule-se agora</Button>
                </div>
            </section>

            {/* INFO DETALHADA */}
            <section className="max-w-screen-2xl mx-auto w-full mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-lime-400">Informações do curso</h2>
                        <ul className="text-sm text-gray-300 leading-loose">
                            <li><strong>Duração:</strong> {course.duration}</li>
                            <li><strong>Nível:</strong> {course.level}</li>
                            <li><strong>Certificação:</strong> Emitida pela XP Educação</li>
                            <li><strong>Modalidade:</strong> 100% online, com aulas gravadas e ao vivo</li>
                            <li><strong>Investimento:</strong> A partir de R$ 399,00/mês</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-lime-400">Para quem é esse curso?</h2>
                        <p className="text-sm text-gray-300">
                            Profissionais que desejam se atualizar no mercado de tecnologia, gestão de projetos ou produtos, com foco em inovação e transformação digital.
                        </p>
                        <h2 className="text-xl font-semibold text-lime-400 mt-6">Metodologia</h2>
                        <p className="text-sm text-gray-300">
                            Aulas dinâmicas, com foco em prática de mercado, projetos reais, mentorias com especialistas e acesso a uma plataforma exclusiva de aprendizado contínuo.
                        </p>
                    </div>
                </div>
            </section>

            {/* RELACIONADOS */}
            <section className="max-w-screen-2xl mx-auto w-full px-4 pb-16">
                <CourseSection title="Cursos relacionados" queryKey="duplaCertificacao" />
            </section>
        </main>
    );
}
