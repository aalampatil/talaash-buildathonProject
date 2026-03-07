import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar/AppSidebar";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

export function LandlordLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar role="landlord" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </SidebarProvider>
  );
}
