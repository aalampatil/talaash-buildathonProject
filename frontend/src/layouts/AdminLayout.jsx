import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

function AdminLayout() {
  return (
    <div>
      <ToastContainer />

      <SidebarProvider defaultOpen={false}>
        <AppSidebar role="admin" />

        <div className="flex flex-col w-full min-h-screen">
          <Header />

          <main className="flex-1">
            <Outlet />
          </main>

          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}

export default AdminLayout;
