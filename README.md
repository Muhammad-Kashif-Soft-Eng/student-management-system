# 🎓 Student Management System

A modern student administration dashboard built with React, Vite, Tailwind CSS, and shadcn-inspired UI components.

<div align="center">

![Student Management](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-State%20Manager-000000?style=for-the-badge)

</div>

## ✨ Overview

This project helps manage student records with a clean dashboard interface and a streamlined workflow for:

- adding new students
- editing student information
- deleting students with confirmation
- viewing dashboard statistics and charts
- tracking academic performance

## 🚀 Features

- Responsive admin dashboard
- Student analytics and overview cards
- Student listing with course and CGPA summaries
- Form-based student creation
- Inline editing for existing students
- Delete confirmation drawer
- Toast notifications for actions
- Sidebar navigation layout

## 🧩 Tech Stack

- React 19
- Vite
- JavaScript
- Zustand for state management
- Tailwind CSS
- Lucide React icons
- React Hook Form
- Recharts for dashboard visualization

## 📁 Project Structure

```bash
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── AppSidebar.jsx
│   ├── StudentCard.jsx
│   ├── StudentChart.jsx
│   └── ui/
├── data/
│   └── students.data.js
├── hooks/
│   └── use-toast.js
├── layout/
│   └── Dashboard.jsx
├── lib/
│   └── utils.js
├── models/
│   └── student.model.js
├── pages/
│   ├── AddStudent.jsx
│   ├── Home.jsx
│   └── Students.jsx
├── stores/
│   └── StudentStore.js
└── components/ui/
```

## 🛠️ Installation

```bash
npm install
```

## ▶️ Run the app

```bash
npm run dev
```

## ✅ Build for production

```bash
npm run build
```

## 🎯 Usage

1. Open the dashboard
2. Navigate to the Students section
3. Add or update records
4. Review performance metrics on the home page

## 📌 Notes

This project is designed as a lightweight student management admin app and can be extended with backend persistence, authentication, and advanced filters.

## 👩‍💻 Author

Built for academic and learning purposes as a React assignment project.
