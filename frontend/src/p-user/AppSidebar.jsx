import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
// className="flex items-start border-2 border-red-300 rounded-md m-2 p-2 w-full hover:bg-neutral-300"

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/account">Account</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link>Host Property</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link>Saved Property</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link>Visits</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link>Logout</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
