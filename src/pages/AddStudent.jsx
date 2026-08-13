import { useForm } from "react-hook-form";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useStudentStore } from "@/stores/StudentStore";
import { useToast } from "@/hooks/use-toast";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddStudent() {

    const addStudent = useStudentStore(state => state.addStudent);
    const { toast } = useToast();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        addStudent(data);
        toast({
            title: "Student added",
            description: `${data.name} was added to the system.`,
            variant: "success",
            duration: 3000,
        });
        reset();

        window.setTimeout(() => {
            navigate("/students");
        }, 2500);
    };

    return (
        <div className="w-full px-2 sm:px-4 lg:px-6">

            <Card className="mx-auto w-full max-w-3xl overflow-hidden">

                {/* Header */}
                <CardHeader className="border-b bg-muted/20 px-5 py-6 sm:px-8 sm:py-7">

                    <div className="flex items-center gap-3 sm:gap-4">

                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
                            <UserPlus className="size-5 sm:size-6" />
                        </div>

                        <div className="min-w-0">
                            <CardTitle className="text-xl sm:text-2xl">
                                Add New Student
                            </CardTitle>

                            <CardDescription className="mt-1 text-xs sm:text-sm">
                                Enter the student's information below.
                            </CardDescription>
                        </div>

                    </div>

                </CardHeader>

                {/* Form */}
                <CardContent className="px-5 py-6 sm:px-8 sm:py-8">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >

                        {/* Inputs Grid */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">

                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Student Name
                                </Label>

                                <Input
                                    id="name"
                                    placeholder="Enter student name"
                                    className="h-11 px-4"
                                    {...register("name", {
                                        required: "Student name is required",
                                    })}
                                />

                                {errors.name && (
                                    <p className="text-xs text-destructive">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Age */}
                            <div className="space-y-2">
                                <Label htmlFor="age">
                                    Age
                                </Label>

                                <Input
                                    id="age"
                                    type="number"
                                    placeholder="Enter age"
                                    className="h-11 px-4"
                                    {...register("age", {
                                        required: "Age is required",
                                        min: {
                                            value: 16,
                                            message: "Age must be at least 16",
                                        },
                                    })}
                                />

                                {errors.age && (
                                    <p className="text-xs text-destructive">
                                        {errors.age.message}
                                    </p>
                                )}
                            </div>

                            {/* Course */}
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="course">
                                    Course
                                </Label>

                                <Input
                                    id="course"
                                    placeholder="e.g. Computer Science"
                                    className="h-11 px-4"
                                    {...register("course", {
                                        required: "Course is required",
                                    })}
                                />

                                {errors.course && (
                                    <p className="text-xs text-destructive">
                                        {errors.course.message}
                                    </p>
                                )}
                            </div>

                            {/* CGPA */}
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="cgpa">
                                    CGPA
                                </Label>

                                <Input
                                    id="cgpa"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="4"
                                    placeholder="e.g. 3.75"
                                    className="h-11 px-4"
                                    {...register("cgpa", {
                                        required: "CGPA is required",
                                        min: {
                                            value: 0,
                                            message: "CGPA cannot be less than 0",
                                        },
                                        max: {
                                            value: 4,
                                            message: "CGPA cannot be greater than 4",
                                        },
                                    })}
                                />

                                {errors.cgpa && (
                                    <p className="text-xs text-destructive">
                                        {errors.cgpa.message}
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end border-t pt-6">

                            <Button
                                type="submit"
                                className="cursor-pointer h-11 w-full px-6 sm:w-auto sm:min-w-40"
                            >
                                <UserPlus className="size-4" />
                                Add Student
                            </Button>

                        </div>

                    </form>

                </CardContent>

            </Card>

        </div>
    );
}