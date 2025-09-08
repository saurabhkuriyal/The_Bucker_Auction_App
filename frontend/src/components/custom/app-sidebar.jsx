import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
    { title: "Home", url: "/admin", icon: Home },
    { title: "Inbox", url: "/admin/inbox", icon: Inbox },
    { title: "Calendar", url: "/admin/calendar", icon: Calendar },
    { title: "Search", url: "/admin/search", icon: Search },
    { title: "Settings", url: "/admin/settings", icon: Settings },
];
export function AppSidebar() {
    return (
        <Sidebar className="">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xl mb-2 mt-1 font-bold text-white-600">Buckers Auction</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}