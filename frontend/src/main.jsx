import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./p-user/pages/Homepage/Homepage.jsx";
import HotProperties from "./p-user/pages/tp/HotProperties.jsx";
import ExploreProperties from "./p-user/pages/tp/ExploreProperties.jsx";
import Property from "./p-user/pages/tp/Property.jsx";
import TenantProfile from "./p-user/pages/Tenant/TenantProfile.jsx";
import FilterProperties from "./p-user/pages/tp/FilterProperties.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
import { LandlordContextProvider } from "./context/LandlordContext.jsx";
import { PropertyContextProvider } from "./context/PropertyContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/properties",
        element: <ExploreProperties />,
      },
      {
        path: "/property",
        element: <Property />,
      },
      {
        path: "/hot-properties",
        element: <HotProperties />,
      },
      {
        path: "/filter-properties",
        element: <FilterProperties />,
      },
      {
        path: "/account",
        element: <TenantProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <UserContextProvider>
      <AdminContextProvider>
        <LandlordContextProvider>
          <PropertyContextProvider>
            <RouterProvider router={router} />
          </PropertyContextProvider>
        </LandlordContextProvider>
      </AdminContextProvider>
    </UserContextProvider>
  </AuthContextProvider>,
);
