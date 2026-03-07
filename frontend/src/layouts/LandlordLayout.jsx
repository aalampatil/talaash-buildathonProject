import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../p-user/AppSidebar.jsx";
// import Header from "../";

function LandlordLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar role="landlord" />

      <div className="flex flex-col w-full min-h-screen">
        {/* <Header /> */}

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export { LandlordLayout };
