import { Users } from "lucide-react";

import StudentCard from "@/components/StudentCard";

export default function Students() {
    return (
        <div className="w-full space-y-5 sm:space-y-6">

            {/* Page Header */}
            <div className="flex w-full flex-col gap-3 sm:gap-4">

                <div className="flex min-w-0 items-center gap-3">

                    {/* Icon */}
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-10 sm:rounded-xl">
                        <Users className="size-4 sm:size-5" />
                    </div>

                    {/* Title */}
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

            {/* Students */}
            <div className="w-full">
                <StudentCard />
            </div>

        </div>
    );
}