import { AdminContextProvider } from "../context/AdminContext.jsx";
import { LandlordContextProvider } from "../context/LandlordContext.jsx";
import { PropertyContextProvider } from "../context/PropertyContext.jsx";
import { UserContextProvider } from "../context/UserContext.jsx";

function Providers({ children }) {
  return (
    <UserContextProvider>
      <AdminContextProvider>
        <LandlordContextProvider>
          <PropertyContextProvider>{children}</PropertyContextProvider>
        </LandlordContextProvider>
      </AdminContextProvider>
    </UserContextProvider>
  );
}

export default Providers;
