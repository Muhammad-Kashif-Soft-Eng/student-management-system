import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { useStudentStore } from "@/stores/StudentStore";

const chartConfig = {
    cgpa: {
        label: "Average CGPA",
    },
};

export default function StudentChart() {

    const students = useStudentStore((state) => state.students);

    // Calculate average CGPA for each course
    const courseData = students.reduce((acc, student) => {

        const existingCourse = acc.find(
            (item) => item.course === student.course
        );

        if (existingCourse) {
            existingCourse.total += student.cgpa;
            existingCourse.count += 1;
            existingCourse.cgpa =
                existingCourse.total / existingCourse.count;
        } else {
            acc.push({
                course: student.course,
                total: student.cgpa,
                count: 1,
                cgpa: student.cgpa,
            });
        }

        return acc;

    }, []);

    const chartData = courseData.map((item) => ({
        course: item.course,
        cgpa: Number(item.cgpa.toFixed(2)),
    }));

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Average CGPA by Course</CardTitle>

                <CardDescription>
                    Average student performance across different courses
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[350px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 60,
                        }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="course"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            angle={-35}
                            textAnchor="end"
                            interval={0}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />

                        <Bar
                            dataKey="cgpa"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}