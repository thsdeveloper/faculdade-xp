import { Skeleton } from "@/components/ui/skeleton";

export default function CourseSkeletonCard() {
    return (
        <div className="rounded-xl overflow-hidden">
            <div className="relative">
                {/* Imagem Skeleton */}
                <Skeleton className="w-full h-45 rounded-t-xl bg-[#2f3746]" />
            </div>

            {/* Título Skeleton */}
            <div className="p-3">
                <Skeleton className="h-4 w-3/4 rounded bg-[#2f3746]" />
                <Skeleton className="h-4 mt-2 w-3/8 rounded bg-[#2f3746]" />
            </div>
        </div>
    );
}
