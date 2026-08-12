import { GraduationCap, User, Calendar, Award } from "lucide-react";

import { useStudentStore } from "@/stores/StudentStore";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function StudentCard() {

    const students = useStudentStore((state) => state.students);

    if (!students || students.length === 0) {
        return (
            <div className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 p-6 text-center sm:min-h-[300px] sm:p-8">

                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-14">
                    <GraduationCap className="size-6 sm:size-7" />
                </div>

                <h2 className="text-base font-semibold sm:text-lg">
                    No students found
                </h2>

                <p className="mt-1 max-w-sm text-xs text-muted-foreground sm:text-sm">
                    There are currently no students in the system.
                </p>

            </div>
        );
    }

    return (
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">

            {students.map((student) => (

                <Card
                    key={student.id}
                    className="group w-full overflow-hidden border-border/50 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                    {/* Top Section */}
                    <div className="h-1.5 bg-gradient-to-r from-primary/80 via-primary to-primary/60 sm:h-2" />

                    <CardContent className="p-4 sm:p-5">

                        {/* Student Identity */}
                        <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">

                            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">

                                {/* Avatar */}
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 sm:size-12 sm:rounded-xl">
                                    <User className="size-5 sm:size-6" />
                                </div>

                                {/* Name & ID */}
                                <div className="min-w-0">
                                    <h2 className="truncate text-sm font-semibold sm:text-base">
                                        {student.name}
                                    </h2>

                                    <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
                                        ID: {student.id}
                                    </p>
                                </div>

                            </div>

                            {/* CGPA */}
                            <div className="flex shrink-0 items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-semibold text-green-600 dark:text-green-400 sm:px-2.5 sm:text-xs">
                                <Award className="size-3 sm:size-3.5" />
                                {student.cgpa}
                            </div>

                        </div>

                        {/* Details */}
                        <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">

                            {/* Course */}
                            <div className="flex min-w-0 items-center gap-2.5 rounded-lg bg-muted/40 p-2.5 sm:gap-3 sm:p-3">

                                <GraduationCap className="size-4 shrink-0 text-muted-foreground" />

                                <div className="min-w-0">
                                    <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground sm:text-[11px]">
                                        Course
                                    </p>

                                    <p className="truncate text-xs font-medium sm:text-sm">
                                        {student.course}
                                    </p>
                                </div>

                            </div>

                            {/* Age */}
                            <div className="flex items-center gap-2.5 rounded-lg bg-muted/40 p-2.5 sm:gap-3 sm:p-3">

                                <Calendar className="size-4 shrink-0 text-muted-foreground" />

                                <div>
                                    <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground sm:text-[11px]">
                                        Age
                                    </p>

                                    <p className="text-xs font-medium sm:text-sm">
                                        {student.age} years
                                    </p>
                                </div>

                            </div>

                        </div>

                    </CardContent>

                </Card>

            ))}

        </div>
    );
}