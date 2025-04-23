"use client";

import {useEffect, useState} from "react";
import CourseCard from "@/components/CourseSection/CourseCard";
import {useKeenSlider} from "keen-slider/react";
import {ArrowRight, ArrowLeft} from "lucide-react";
import CourseSkeletonCard from "@/components/CourseSkeletonCard/CourseSkeletonCard";
import Link from "next/link";

export interface Course {
    title: string;
    image: string;
    slug: string;
}

interface CourseSectionProps {
    title: string;
    queryKey: string;
}

export default function CourseSection({title, queryKey}: CourseSectionProps) {
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

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
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const res = await fetch("/data/courses.json");
            const data = await res.json();
            setCourses(data[queryKey]);
        };
        fetchCourses();
    }, [queryKey]);

    return (
        <section className="text-white py-8 relative">
            <div className="">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    {loaded && instanceRef.current && (
                        <div className="flex gap-2">
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
                                    currentSlide ===
                                    instanceRef.current.track.details.slides.length - 4
                                }
                                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-lime-400 transition disabled:opacity-30"
                            >
                                <ArrowRight className="w-4 h-4"/>
                            </button>
                        </div>
                    )}
                </div>

                {courses ? (
                    <div ref={sliderRef} className="keen-slider">
                        {courses.map((course, index) => (
                            <div key={index} className="keen-slider__slide">
                                <Link href={`/cursos/${course.slug}`}>
                                    <CourseCard title={course.title} image={course.image}/>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {Array.from({length: 4}).map((_, i) => (
                            <CourseSkeletonCard key={i}/>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
