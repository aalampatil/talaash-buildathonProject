import { createBrowserRouter, redirect } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout.jsx";
import { LandlordLayout } from "../layouts/LandlordLayout.jsx";
import { UserLayout } from "../layouts/UserLayout.jsx";
import Homepage from "../pages/user/Homepage.jsx";
import FilterProperties from "../pages/user/FilterProperties.jsx";
import Property from "../pages/user/Property.jsx";
import TenantProfile from "../pages/user/TenantProfile.jsx";
import TenantVisits from "../pages/user/TenantVisits.jsx";
import SavedProperties from "../pages/user/SavedProperties.jsx";
import { UserContextProvider } from "../context/UserContext.jsx";
import { AdminContextProvider } from "../context/AdminContext.jsx";
import { LandlordContextProvider } from "../context/LandlordContext.jsx";
import { PropertyContextProvider } from "../context/PropertyContext.jsx";
import Login from "../Google-Login/Login.jsx";
import ProtectedUser from "../config/ProtectedUser.jsx";
import ProtectedLandlord from "../config/ProtectedLandlord.jsx";
import ProtectedAdmin from "../config/ProtectedAdmin.jsx";
import LandlordVisits from "../components/LandlordComponents/LandlordVisits.jsx";
import AddProperty from "../components/LandlordComponents/AddProperty.jsx";
import LandlordProperties from "../components/LandlordComponents/LandlordProperties.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import AllUsers from "../pages/admin/AllUsers.jsx";
import AllProperties from "../pages/admin/AllProperties.jsx";
import AllLandlord from "../pages/admin/AllLandlords.jsx";
import AllLandlords from "../pages/admin/AllLandlords.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Providers>
        <UserLayout />
      </Providers>
    ),
    children: [
      { path: "", index: true, element: <Homepage /> },
      {
        path: `property/:id`,
        element: <Property />,
      },
      {
        path: "filter-properties",
        element: (
          <ProtectedUser authentication>
            <FilterProperties />
          </ProtectedUser>
        ),
      },
      {
        path: "account",
        element: (
          <ProtectedUser authentication>
            <TenantProfile />
          </ProtectedUser>
        ),
      },
      {
        path: "my-visits",
        element: (
          <ProtectedUser authentication>
            <TenantVisits />
          </ProtectedUser>
        ),
      },
      {
        path: "saved-properties",
        element: (
          <ProtectedUser authentication>
            <SavedProperties />
          </ProtectedUser>
        ),
      },
    ],
  },

  // landlord routes
  {
    path: "/dashboard/landlord",
    element: (
      <Providers>
        <ProtectedLandlord authentication>
          <LandlordLayout />
        </ProtectedLandlord>
      </Providers>
    ),
    children: [
      {
        index: true,
        element: <LandlordProperties />,
      },
      {
        path: "properties",
        element: <LandlordProperties />,
      },
      {
        path: "visits",
        element: <LandlordVisits />,
      },
      {
        path: "add-new-property",
        element: <AddProperty />,
      },
    ],
  },

  // admin routes
  {
    path: "/dashboard/admin",
    element: (
      <Providers>
        <ProtectedAdmin>
          <AdminLayout />
        </ProtectedAdmin>
      </Providers>
    ),
    children: [
      {
        path: "",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-landlords",
        element: <AllLandlords />,
      },
      {
        path: "all-properties",
        element: <AllProperties />,
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
  {
  path: "/login",
  loader: () => redirect("/login/tenant")
}
]);

function Providers({ children }) {
  return (
    <UserContextProvider>
      {/* <AuthContextProvider> */}
      <AdminContextProvider>
        <LandlordContextProvider>
          <PropertyContextProvider>{children}</PropertyContextProvider>
        </LandlordContextProvider>
      </AdminContextProvider>
      {/* </AuthContextProvider> */}
    </UserContextProvider>
  );
}
