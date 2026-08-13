import { useState } from "react";
import { GraduationCap, User, Calendar, Award, Pencil, Trash2, Save, X, AlertTriangle, Search } from "lucide-react";

import { useStudentStore } from "@/stores/StudentStore";
import { useToast } from "@/hooks/use-toast";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export default function StudentCard({ searchTerm = "", selectedCourse = "all", sortBy = "default" }) {
    const students = useStudentStore((state) => state.students);
    const removeStudent = useStudentStore((state) => state.removeStudent);
    const editStudent = useStudentStore((state) => state.editStudent);
    const { toast } = useToast();

    const [editingId, setEditingId] = useState(null);
    const [deleteStudent, setDeleteStudent] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        age: "",
        course: "",
        cgpa: "",
    });

    const startEditing = (student) => {
        setEditingId(student.id);
        setEditForm({
            name: student.name,
            age: String(student.age),
            course: student.course,
            cgpa: String(student.cgpa),
        });
    };

    const handleDeleteRequest = (student) => {
        setDeleteStudent(student);
    };

    const confirmDelete = () => {
        if (!deleteStudent) return;

        removeStudent(deleteStudent.id);
        toast({
            title: "Student deleted",
            description: `${deleteStudent.name} was removed from the system.`,
            variant: "destructive",
            duration: 3000,
        });
        setDeleteStudent(null);
    };

    const handleSave = (studentId) => {
        const payload = {
            id: studentId,
            name: editForm.name.trim(),
            age: Number(editForm.age),
            course: editForm.course.trim(),
            cgpa: Number(editForm.cgpa),
        };

        if (!payload.name || !payload.course || Number.isNaN(payload.age) || Number.isNaN(payload.cgpa)) {
            toast({
                title: "Invalid student data",
                description: "Please fill in all fields correctly before saving.",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        editStudent(payload);
        setEditingId(null);
        toast({
            title: "Student updated",
            description: `${payload.name} was successfully updated.`,
            variant: "success",
            duration: 3000,
        });
    };

    // Filter students
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            !searchTerm ||
            [
                student.name,
                student.course,
                String(student.id),
            ]
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCourse =
            selectedCourse === "all" || student.course === selectedCourse;

        return matchesSearch && matchesCourse;
    });

    // Sort students
    let sortedStudents = [...filteredStudents];
    if (sortBy === "name-asc") {
        sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
        sortedStudents.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "cgpa-high") {
        sortedStudents.sort((a, b) => b.cgpa - a.cgpa);
    } else if (sortBy === "cgpa-low") {
        sortedStudents.sort((a, b) => a.cgpa - b.cgpa);
    } else if (sortBy === "age-high") {
        sortedStudents.sort((a, b) => b.age - a.age);
    } else if (sortBy === "age-low") {
        sortedStudents.sort((a, b) => a.age - b.age);
    }

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

    if (sortedStudents.length === 0) {
        return (
            <div className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 p-6 text-center sm:min-h-[300px] sm:p-8">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-14">
                    <Search className="size-6 sm:size-7" />
                </div>

                <h2 className="text-base font-semibold sm:text-lg">
                    No matching students
                </h2>

                <p className="mt-1 max-w-sm text-xs text-muted-foreground sm:text-sm">
                    Try a different search term or switch the selected course.
                </p>
            </div>
        );
    }

    return (
        <>
            <Sheet open={Boolean(deleteStudent)} onOpenChange={(open) => !open && setDeleteStudent(null)}>
                <SheetContent side="right" className="sm:max-w-md">
                    <SheetHeader className="space-y-3">
                        <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                            <AlertTriangle className="size-5" />
                        </div>
                        <SheetTitle>Delete student?</SheetTitle>
                        <SheetDescription>
                            This action will permanently remove {deleteStudent?.name || "this student"} from the system.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                        <p><span className="font-medium text-foreground">Name:</span> {deleteStudent?.name}</p>
                        <p><span className="font-medium text-foreground">Course:</span> {deleteStudent?.course}</p>
                    </div>

                    <SheetFooter className="mt-8 flex-row justify-end gap-2 sm:flex-row">
                        <Button variant="outline" onClick={() => setDeleteStudent(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Confirm Delete
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">

            {sortedStudents.map((student) => {
                const isEditing = editingId === student.id;

                return (
                    <Card
                        key={student.id}
                        className="group w-full overflow-hidden border-border/50 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="h-1.5 bg-gradient-to-r from-primary/80 via-primary to-primary/60 sm:h-2" />

                        <CardContent className="p-4 sm:p-5">
                            <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
                                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 sm:size-12 sm:rounded-xl">
                                        <User className="size-5 sm:size-6" />
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="truncate text-sm font-semibold sm:text-base">
                                            {student.name}
                                        </h2>

                                        <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
                                            ID: {student.id}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-semibold text-green-600 dark:text-green-400 sm:px-2.5 sm:text-xs">
                                    <Award className="size-3 sm:size-3.5" />
                                    {student.cgpa}
                                </div>
                            </div>

                            {isEditing ? (
                                <div className="mt-4 space-y-3 border-t pt-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Name</label>
                                        <input
                                            value={editForm.name}
                                            onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                                            className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Age</label>
                                            <input
                                                type="number"
                                                value={editForm.age}
                                                onChange={(e) => setEditForm((prev) => ({ ...prev, age: e.target.value }))}
                                                className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">CGPA</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={editForm.cgpa}
                                                onChange={(e) => setEditForm((prev) => ({ ...prev, cgpa: e.target.value }))}
                                                className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Course</label>
                                        <input
                                            value={editForm.course}
                                            onChange={(e) => setEditForm((prev) => ({ ...prev, course: e.target.value }))}
                                            className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>

                                    <div className="flex gap-2 pt-1">
                                        <Button size="sm" onClick={() => handleSave(student.id)} className="flex-1">
                                            <Save className="size-3.5" />
                                            Save
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => setEditingId(null)} className="flex-1">
                                            <X className="size-3.5" />
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
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

                                    <div className="mt-4 flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => startEditing(student)} className="flex-1">
                                            <Pencil className="size-3.5" />
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDeleteRequest(student)} className="flex-1">
                                            <Trash2 className="size-3.5" />
                                            Delete
                                        </Button>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
            </div>
        </>
    );
}