"use client";

import { Activity, Heart, ChartSpline, ChevronUp, User2, LogOut } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Avatar as UserAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items.
const items = [
    {
        title: "Health forecast",
        url: "#",
        icon: Heart,
    },
    {
        title: "Analyze",
        url: "#",
        icon: ChartSpline,
    },
    {
        title: "Exercise",
        url: "#",
        icon: Activity,
    }
]

export function AppSidebar() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const getUserInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
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
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    {user?.photoURL ? (
                                        <UserAvatar className="h-6 w-6">
                                            <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                                            <AvatarFallback>{getUserInitials(user.displayName)}</AvatarFallback>
                                        </UserAvatar>
                                    ) : (
                                        <User2 className="h-4 w-4" />
                                    )}
                                    <span className="truncate">{user?.displayName || user?.email || "User"}</span>
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem className="flex flex-col items-start">
                                    <span className="font-medium">{user?.displayName}</span>
                                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
