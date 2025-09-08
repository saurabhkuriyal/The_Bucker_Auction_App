
import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function layout({ children }) {
    return (
        <div className="">
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                    {children}
            </main>
        </SidebarProvider>
        </div>
    )
}
