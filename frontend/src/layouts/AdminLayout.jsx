import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar/AppSidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

export function AdminLayout() {
  return (
    <div>
      <ToastContainer />

      <SidebarProvider defaultOpen={false}>
        <AppSidebar role="admin" />
        <div className="flex flex-col w-full min-h-screen">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
