import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar/AppSidebar";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { ToastContainer } from "react-toastify";

export function UserLayout() {
  return (
    <div>
      <ToastContainer />
      <SidebarProvider defaultOpen={false}>
        <AppSidebar role="tenant" />
        <div className="flex flex-col w-full min-h-screen">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}

export default UserLayout;
