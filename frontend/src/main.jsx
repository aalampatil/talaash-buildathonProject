import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./p-user/pages/Homepage/Homepage.jsx";
import HotProperties from "./p-user/pages/tp/HotProperties.jsx";
import Property from "./p-user/pages/tp/Property.jsx";
import TenantProfile from "./p-user/pages/Tenant/TenantProfile.jsx";
import FilterProperties from "./p-user/pages/tp/FilterProperties.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
import { LandlordContextProvider } from "./context/LandlordContext.jsx";
import { PropertyContextProvider } from "./context/PropertyContext.jsx";
import Login from "./Google-Login/Login.jsx";
import ProtectedUser from "./config/ProtectedUser.jsx";
import ProtectedLandlord from "./config/ProtectedLandlord.jsx";
import ProtectedAdmin from "./config/ProtectedAdmin.jsx";
import TenantVisits from "./p-user/pages/Tenant/TenantVisits.jsx";
import SavedProperties from "./p-user/pages/Tenant/SavedProperties.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextProvider>
        <AdminContextProvider>
          <LandlordContextProvider>
            <PropertyContextProvider>
              <App />
            </PropertyContextProvider>
          </LandlordContextProvider>
        </AdminContextProvider>
      </UserContextProvider>
    ),
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: `/property/:id`,
        element: <Property />,
      },
      {
        path: "/hot-properties",
        element: <HotProperties />,
      },
      {
        path: "/filter-properties",
        element: (
          <ProtectedUser authentication>
            <FilterProperties />
          </ProtectedUser>
        ),
      },
      {
        path: "/account",
        element: (
          <ProtectedUser authentication>
            <TenantProfile />
          </ProtectedUser>
        ),
      },
      {
        path: "/my-visits",
        element: (
          <ProtectedUser authentication>
            <TenantVisits />
          </ProtectedUser>
        ),
      },
      {
        path: "/saved-properties",
        element: (
          <ProtectedUser authentication>
            <SavedProperties />
          </ProtectedUser>
        ),
      },
    ],
  },

  {
    path: "/login/tenant",
    element: <Login />,
  },
  {
    path: "/login/landlord",
    element: <Login />,
  },
  {},
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
