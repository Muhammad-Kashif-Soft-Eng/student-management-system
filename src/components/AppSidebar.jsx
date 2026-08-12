import { NavLink } from "react-router-dom";
import { GraduationCap, House, Users, UserPlus } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "./ui/sidebar";

const navigationItems = [
    { title: "Home", url: "/", icon: House },
    { title: "Students", url: "/students", icon: Users },
    { title: "Add Student", url: "/add-student", icon: UserPlus },
];

export default function AppSidebar() {

    const { isMobile, setOpenMobile } = useSidebar();

    return (
        <Sidebar
            collapsible="icon"
            variant="sidebar"
            className="border-r border-border/40 bg-background"
            style={{ "--sidebar-width-icon": "3rem" }}
        >
            {/* Brand Header */}
            <SidebarHeader className="border-b border-border/40 bg-background/50">
                <div className="flex items-center  gap-3 px-3 py-4 sm:py-5 lg:px-4">

                    {/* Logo */}
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg transition-all duration-300 group-hover:shadow-xl">
                        <GraduationCap className="size-6" />
                    </div>

                    {/* Brand */}
                    <div className="flex min-w-0 flex-col gap-1 group-data-[collapsible=icon]:hidden">
                        <span className="truncate text-sm font-bold leading-tight text-foreground">
                            EduManage
                        </span>

                        <span className="truncate text-xs font-medium text-muted-foreground">
                            Student Management
                        </span>
                    </div>

                </div>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="flex flex-col gap-0">
                <SidebarGroup className="space-y-1 px-2 py-4 group-data-[collapsible=icon]:px-0">

                    <SidebarGroupLabel className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                        Main Navigation
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1 group-data-[collapsible=icon]:gap-2">

                            {navigationItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.url} className="h-auto">
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            className="h-auto w-1/2 rounded-lg transition-all duration-300 hover:bg-accent sm:w-4/5 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl"                                        >
                                            <NavLink
                                                to={item.url}
                                                end={item.url === "/"}
                                                onClick={() => {
                                                    if (isMobile) {
                                                        setOpenMobile(false);
                                                    }
                                                }}
                                                className={({ isActive }) =>
                                                    `group relative flex w-full min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-all duration-300 group-data-[collapsible=icon]:min-h-0 group-data-[collapsible=icon]:size-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 ${isActive
                                                        ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/95"
                                                        : "text-foreground/70 hover:bg-accent hover:text-foreground"
                                                    }`
                                                }
                                            >
                                                <Icon className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                                                <span className="truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
                                                    {item.title}
                                                </span>
                                            </NavLink>
                                        </SidebarMenuButton>

                                    </SidebarMenuItem>
                                );
                            })}

                        </SidebarMenu>
                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-border/40 bg-background/50 px-2 py-4">
                <div className="space-y-2 rounded-lg bg-muted/40 px-3 py-3 backdrop-blur-sm group-data-[collapsible=icon]:hidden">

                    <p className="truncate text-xs font-bold text-foreground">
                        EduManage
                    </p>

                    <p className="truncate text-[11px] text-muted-foreground">
                        v1.0 Management System
                    </p>

                    <div className="mt-2 flex items-center gap-1 rounded border border-border/40 bg-background/50 px-2 py-1">
                        <div className="size-1.5 animate-pulse rounded-full bg-green-500" />
                        <span className="text-[10px] text-muted-foreground">
                            Active
                        </span>
                    </div>

                </div>
            </SidebarFooter>

        </Sidebar>
    );
}