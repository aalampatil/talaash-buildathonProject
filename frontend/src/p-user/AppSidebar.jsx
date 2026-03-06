import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { UseUserContext } from "../context/UserContext";

export default function AppSidebar() {
  const { logout } = UseUserContext();

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
                <Link to="/saved-properties">Saved Property</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/my-visits">Visits</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <button onClick={() => logout()}>Logout</button>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/dashboard/landlord"> Host A Property</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
