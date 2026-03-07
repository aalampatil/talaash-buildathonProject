import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { UseUserContext } from "../../context/UserContext";

export default function AppSidebar({ role }) {
  const { logoutUser } = UseUserContext();

  function handleClick() {
    logoutUser();
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {role === "tenant" && (
                <>
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
                    <Link to="/dashboard/landlord">Become a Host</Link>
                  </SidebarMenuItem>
                </>
              )}

              {role === "landlord" && (
                <>
                  <SidebarMenuItem>
                    <Link to="properties">Properties</Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link to="visits">Visits</Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link to="add-new-property">Add New Properties</Link>
                  </SidebarMenuItem>
                </>
              )}

              {role === "admin" && (
                <>
                  <SidebarMenuItem>
                    <Link to="/dashboard/admin">Admin Dashboard</Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link to="/dashboard/admin/users">Users</Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link to="/dashboard/admin/properties">All Properties</Link>
                  </SidebarMenuItem>
                </>
              )}

              <SidebarMenuItem>
                <button onClick={handleClick}>Logout</button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
