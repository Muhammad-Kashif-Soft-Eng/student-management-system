import { create } from "zustand";

import { studentsData } from "../data/students.data";
import { Student } from "../models/student.model";

export const useStudentStore = create((set) => ({
    students: studentsData,

    addStudent: (newStudent) =>
        set((state) => ({
            students: [
                new Student({ ...newStudent, id: Date.now() }),
                ...state.students,
            ],
        })),

    removeStudent: (id) =>
        set(state => ({
            students: state.students.filter(std => std.id !== id)
        })),

    editStudent: (updatedStudent) =>
        set(state => ({
            students: state.students.map(std => (
                std.id === updatedStudent.id
                    ? updatedStudent
                    : std
            )),
        })),

}));