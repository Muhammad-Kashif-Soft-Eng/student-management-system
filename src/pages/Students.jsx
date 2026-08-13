import { useMemo, useState } from "react";
import { Users, Search, Filter, ArrowUpDown, RotateCcw } from "lucide-react";

import StudentCard from "@/components/StudentCard";
import { useStudentStore } from "@/stores/StudentStore";
import { Button } from "@/components/ui/button";

export default function Students() {
    const students = useStudentStore((state) => state.students);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    const courses = useMemo(
        () => [...new Set(students.map((student) => student.course))].sort(),
        [students]
    );

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedCourse("all");
        setSortBy("default");
    };

    return (
        <div className="w-full space-y-5 sm:space-y-6">
            <div className="flex w-full flex-col gap-3 sm:gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-10 sm:rounded-xl">
                        <Users className="size-4 sm:size-5" />
                    </div>

                    <div className="min-w-0">
                        <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                            Students
                        </h1>

                        <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                            Manage and view all registered students
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/80 p-3 shadow-sm sm:p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search by name, course, or ID"
                            className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm outline-none ring-0 transition focus:border-primary"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl lg:justify-end">
                        <div className="relative w-full sm:max-w-xs">
                            <Filter className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <select
                                value={selectedCourse}
                                onChange={(event) => setSelectedCourse(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-primary"
                            >
                                <option value="all">All courses</option>
                                {courses.map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-primary"
                            >
                                <option value="default">Default order</option>
                                <option value="name-asc">Sort: Name A-Z</option>
                                <option value="name-desc">Sort: Name Z-A</option>
                                <option value="cgpa-high">Sort: CGPA High to Low</option>
                                <option value="cgpa-low">Sort: CGPA Low to High</option>
                                <option value="age-high">Sort: Age High to Low</option>
                                <option value="age-low">Sort: Age Low to High</option>
                            </select>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={resetFilters}
                            className="w-full sm:w-auto"
                        >
                            <RotateCcw className="size-4" />
                            Reset
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <StudentCard searchTerm={searchTerm} selectedCourse={selectedCourse} sortBy={sortBy} />
            </div>
        </div>
    );
}