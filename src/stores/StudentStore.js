import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { studentsData } from "../data/students.data";
import { Student } from "../models/student.model";

const STORAGE_KEY = "student-management-system";

const getInitialStudents = () => {
    if (typeof window === "undefined") {
        return studentsData;
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return studentsData;
        }

        const parsed = JSON.parse(saved);
        return Array.isArray(parsed?.students) ? parsed.students : studentsData;
    } catch {
        return studentsData;
    }
};

export const useStudentStore = create(
    persist(
        (set) => ({
            students: getInitialStudents(),

            addStudent: (newStudent) =>
                set((state) => ({
                    students: [
                        new Student(
                            Date.now(),
                            newStudent.name,
                            Number(newStudent.age),
                            newStudent.course,
                            Number(newStudent.cgpa)
                        ),
                        ...state.students,
                    ],
                })),

            removeStudent: (id) =>
                set((state) => ({
                    students: state.students.filter((std) => std.id !== id),
                })),

            editStudent: (updatedStudent) =>
                set((state) => ({
                    students: state.students.map((std) =>
                        std.id === updatedStudent.id ? { ...std, ...updatedStudent } : std
                    ),
                })),
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),
        }
    )
);