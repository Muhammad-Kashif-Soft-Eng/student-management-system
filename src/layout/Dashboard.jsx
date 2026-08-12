import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/AppSidebar";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard() {

    return (
        <SidebarProvider defaultOpen={true}>

            {/* Sidebar */}
            <AppSidebar />

            {/* Main Application Area */}
            <SidebarInset className="flex flex-col bg-gradient-to-br from-background via-background to-muted/20">

                {/* Header */}
                <header className="sticky top-0 z-50 flex h-14 sm:h-16 shrink-0 items-center border-b border-border/40 bg-background/95 px-3 sm:px-4 lg:px-6 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">

                    <div className="flex w-full items-center justify-between gap-2 sm:gap-4">

                        {/* Left Side - Menu Toggle */}
                        <div className="flex items-center gap-2">

                            <SidebarTrigger className="cursor-pointer size-8 sm:size-9 rounded-lg transition-colors duration-200 hover:bg-accent" />

                            <div className="hidden h-6 border-l border-border/30 sm:block" />

                            <span className="hidden text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
                                Student Admin
                            </span>

                        </div>

                        {/* Right Side - User Info */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            <div className="hidden text-right sm:block">
                                <p className="text-sm font-medium leading-tight text-foreground">
                                    Student Admin
                                </p>

                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    Administrator
                                </p>
                            </div>

                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/40 bg-gradient-to-br from-primary/20 to-primary/10 text-xs font-bold text-primary shadow-sm">
                                AK
                            </div>

                        </div>

                    </div>

                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">

                    <div className="mx-auto w-full px-3 py-4 sm:px-4 sm:py-6 lg:max-w-6xl lg:px-6 lg:py-8">
                        <Outlet />
                    </div>

                </main>

            </SidebarInset>

        </SidebarProvider>
    );
}