import {
    FileText, // for flyers or documents
    Gavel,
    Home, // for dashboard
    Users, // for "Sale Ring" (auction hammer)
    Wrench, // for settings / to be added
} from "lucide-react";
import Link from 'next/link';

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
    { title: "Users", url: "/admin/users", icon: Users },
    { title: "Flyer", url: "/admin/flyer", icon: FileText },
    { title: "Sale Ring", url: "/admin/search", icon: Gavel },
    {
        title: "To Be Added", url: "/admin/settings", icon: Wrench,      // for settings / to be added
    },
];
export function AppSidebar() {
    return (
        <>
            <Sidebar className="">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xl mb-2 mt-1 font-bold text-white-600">Buckers Auction</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </>
    )
}