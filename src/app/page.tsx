import Banner from "@/components/Banner/Banner";
import SearchCourseFilter from "@/components/SearchCourseFilter/SearchCourseFilter";

export default async function Home() {
    return (
        <>
            <main>
                <div className="max-w-screen-2xl mx-auto w-full my-8">
                    <Banner/>
                </div>
                <div className="max-w-screen-2xl mx-auto w-full">
                    <SearchCourseFilter />
                </div>
            </main>
        </>
    );
}
