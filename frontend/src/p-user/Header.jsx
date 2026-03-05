import { Menu } from "lucide-react";
import logo from "../assets/logo-d.svg";
import { SidebarTrigger } from "../components/ui/sidebar";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="w-full border-b bg-white flex flex-col">
      <div className="relative flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-xl font-semibold text-rose-500 tracking-wide">
          <Link to={"/"}>
            <img
              src={logo}
              height="50px"
              className="max-w-25"
              width="70px"
              alt="logo"
            />
          </Link>
        </div>

        {/* Center Navigation */}
        {currentPath === "/" ? (
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link className="flex items-center justify-center font-lg text-gray-700 hover:text-rose-500 cursor-Linkointer transition border border-red-200 rounded-full p-2 w-25 ">
              Home
            </Link>
          </div>
        ) : (
          <Search />
        )}

        {/* Mobile Menu */}
        <SidebarTrigger className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Menu size={26} />
        </SidebarTrigger>
      </div>
      {currentPath === "/" ? (
        <div>
          <Search />
        </div>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
