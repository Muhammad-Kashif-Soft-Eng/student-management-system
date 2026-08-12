import {
    Users,
    GraduationCap,
    Award,
    TrendingUp,
} from "lucide-react";

import { useStudentStore } from "@/stores/StudentStore";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import StudentChart from "@/components/StudentChart";

export default function Home() {

    const students = useStudentStore((state) => state.students);

    const totalStudents = students.length;

    const averageCgpa =
        totalStudents > 0
            ? (
                students.reduce((total, student) => total + student.cgpa, 0) /
                totalStudents
            ).toFixed(2)
            : "0.00";

    const highestCgpa =
        totalStudents > 0
            ? Math.max(...students.map((student) => student.cgpa))
            : "0.00";

    const totalCourses = new Set(
        students.map((student) => student.course)
    ).size;

    const statistics = [
        {
            title: "Total Students",
            value: totalStudents,
            description: "Registered students",
            icon: Users,
        },
        {
            title: "Total Courses",
            value: totalCourses,
            description: "Available courses",
            icon: GraduationCap,
        },
        {
            title: "Average CGPA",
            value: averageCgpa,
            description: "Overall student average",
            icon: TrendingUp,
        },
        {
            title: "Highest CGPA",
            value: highestCgpa,
            description: "Highest student CGPA",
            icon: Award,
        },
    ];

    return (
        <div className="w-full space-y-6">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Welcome to Student Management System.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {statistics.map((stat) => {

                    const Icon = stat.icon;

                    return (
                        <Card
                            key={stat.title}
                            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>

                                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="size-5" />
                                </div>

                            </CardHeader>

                            <CardContent>

                                <div className="text-2xl font-bold sm:text-3xl">
                                    {stat.value}
                                </div>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    {stat.description}
                                </p>

                            </CardContent>
                        </Card>
                    );
                })}

            </div>

            <StudentChart />

        </div>
    );
}