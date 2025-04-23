"use client";

import {useEffect, useMemo, useState} from "react";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useKeenSlider} from "keen-slider/react";
import {ArrowLeft, ArrowRight, Search} from "lucide-react";
import CourseCard from "@/components/CourseSection/CourseCard";
import CourseSkeletonCard from "@/components/CourseSkeletonCard/CourseSkeletonCard";
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface Course {
    slug: string;
    title: string;
    image: string;
    duration: string;
    level: string;
}

export default function SearchCourseFilter() {
    const [query, setQuery] = useState("");
    const [duration, setDuration] = useState("");
    const [level, setLevel] = useState("");
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);


    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: false,
        rubberband: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        slides: {
            perView: 4,
            spacing: 24,
        },
        breakpoints: {
            "(max-width: 1023px)": {
                slides: {perView: 2.2, spacing: 16},
            },
            "(max-width: 639px)": {
                slides: {perView: 1.2, spacing: 12},
            },
        },
    });

    useEffect(() => {
        const fetchCourses = async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Simula loading
            const res = await fetch("/data/courses.json");
            const data = await res.json();
            const all = [...data.fastLearning, ...data.duplaCertificacao];
            setCourses(all);
        };
        fetchCourses();
    }, []);

    const filteredCourses = useMemo(() => {
        if (!courses) return [];
        return courses.filter((course) => {
            const matchesText = course.title.toLowerCase().includes(query.toLowerCase());
            const matchesDuration = duration ? course.duration === duration : true;
            const matchesLevel = level ? course.level === level : true;
            return matchesText && matchesDuration && matchesLevel;
        });
    }, [courses, query, duration, level]);

    useEffect(() => {
        if (instanceRef.current) {
            instanceRef.current.update();
            instanceRef.current.moveToIdx(0);
        }
    }, [filteredCourses.length, instanceRef]);

    return (
        <section className="py-10 text-white container px-4 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-4 items-start md:items-end flex-wrap">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"/>
                    <Input
                        placeholder="Pesquisar cursos..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10 border border-white/10 focus-visible:border-lime-400 focus-visible:ring-lime-400 transition-all"
                    />
                </div>

                <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full md:w-52">
                        <SelectValue placeholder="Filtrar por duração"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="6 meses">6 meses</SelectItem>
                        <SelectItem value="7 meses">7 meses</SelectItem>
                        <SelectItem value="8 meses">8 meses</SelectItem>
                        <SelectItem value="9 meses">9 meses</SelectItem>
                        <SelectItem value="10 meses">10 meses</SelectItem>
                        <SelectItem value="12 meses">12 meses</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="w-full md:w-52">
                        <SelectValue placeholder="Filtrar por nível"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Intermediário">Intermediário</SelectItem>
                        <SelectItem value="Avançado">Avançado</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    variant="ghost"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline md:ml-auto"
                    onClick={() => {
                        setQuery("");
                        setDuration("");
                        setLevel("");
                    }}
                >
                    Limpar filtros
                </Button>
            </div>

            {courses === null ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {Array.from({length: 4}).map((_, i) => (
                        <CourseSkeletonCard key={i}/>
                    ))}
                </div>
            ) : filteredCourses.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum curso encontrado com os filtros aplicados.</p>
            ) : (
                <div className="relative">
                    <div ref={sliderRef}
                         className="keen-slider"
                         key={filteredCourses.map((c) => c.slug).join("-")}>
                        {filteredCourses.map((course, index) => (
                            <div key={index} className="keen-slider__slide">
                                <Link href={`/cursos/${course.slug}`}>
                                    <CourseCard title={course.title} image={course.image}/>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {loaded && instanceRef.current && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 z-10">
                            <button
                                onClick={() => instanceRef.current?.prev()}
                                disabled={currentSlide === 0}
                                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-lime-400 transition disabled:opacity-30"
                            >
                                <ArrowLeft className="w-4 h-4"/>
                            </button>
                            <button
                                onClick={() => instanceRef.current?.next()}
                                disabled={
                                    currentSlide >= filteredCourses.length - 4
                                }
                                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-lime-400 transition disabled:opacity-30"
                            >
                                <ArrowRight className="w-4 h-4"/>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
