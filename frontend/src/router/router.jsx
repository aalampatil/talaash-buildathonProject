import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import ProtectedUser from "../config/ProtectedUser.jsx";
import ProtectedLandlord from "../config/ProtectedLandlord.jsx";
import ProtectedAdmin from "../config/ProtectedAdmin.jsx";
import Providers from "./Providers.jsx";

const AdminLayout = lazy(() =>
  import("../layouts/AdminLayout.jsx").then((module) => ({
    default: module.AdminLayout,
  })),
);
const LandlordLayout = lazy(() =>
  import("../layouts/LandlordLayout.jsx").then((module) => ({
    default: module.LandlordLayout,
  })),
);
const UserLayout = lazy(() => import("../layouts/UserLayout.jsx"));
const Homepage = lazy(() => import("../pages/user/Homepage.jsx"));
const FilterProperties = lazy(() =>
  import("../pages/user/FilterProperties.jsx"),
);
const Property = lazy(() => import("../pages/user/Property.jsx"));
const TenantProfile = lazy(() => import("../pages/user/TenantProfile.jsx"));
const TenantVisits = lazy(() => import("../pages/user/TenantVisits.jsx"));
const SavedProperties = lazy(() => import("../pages/user/SavedProperties.jsx"));
const Login = lazy(() => import("../Google-Login/Login.jsx"));
const LandlordVisits = lazy(() =>
  import("../components/LandlordComponents/LandlordVisits.jsx"),
);
const AddProperty = lazy(() =>
  import("../components/LandlordComponents/AddProperty.jsx"),
);
const LandlordProperties = lazy(() =>
  import("../components/LandlordComponents/LandlordProperties.jsx"),
);
const Dashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const AllUsers = lazy(() => import("../pages/admin/AllUsers.jsx"));
const AllProperties = lazy(() => import("../pages/admin/AllProperties.jsx"));
const AllLandlords = lazy(() => import("../pages/admin/AllLandlords.jsx"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-white">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
  </div>
);

const lazyElement = (element) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Providers>
        {lazyElement(<UserLayout />)}
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

  {
    path: "/dashboard/landlord",
    element: (
      <Providers>
        <ProtectedLandlord authentication>
          {lazyElement(<LandlordLayout />)}
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

  {
    path: "/dashboard/admin",
    element: (
      <Providers>
        <ProtectedAdmin authentication>
          {lazyElement(<AdminLayout />)}
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
    element: lazyElement(<Login />),
  },
  {
    path: "/login/landlord",
    element: lazyElement(<Login />),
  },
  {
    path: "/login/admin",
    element: lazyElement(<Login />),
  },
  {
    path: "/login",
    loader: () => redirect("/login/tenant"),
  },
]);
