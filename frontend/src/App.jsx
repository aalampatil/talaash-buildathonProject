import AppSidebar from "./p-user/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import "./App.css";
import Header from "./p-user/Header";
import Footer from "./p-user/Footer";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="">
        <ToastContainer />
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <div className="flex flex-col w-full">
            <Header />
            {<Outlet />}
            <Footer />
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}

export default App;
