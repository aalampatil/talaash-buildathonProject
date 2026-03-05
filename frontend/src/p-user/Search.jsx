import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

function SearchFilter() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log({ location, budget });
    navigate("/filter-properties");
  };

  return (
    <div className="w-full flex justify-center px-2">
      <div className="w-full max-w-4xl bg-white border rounded-xl md:rounded-full shadow-sm p-3 md:p-1">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
          {/* WHERE */}
          <div className="flex flex-col md:px-5 md:flex-1">
            <span className="text-[11px] font-semibold text-gray-500">
              Where
            </span>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="outline-none text-xs text-gray-700 bg-transparent"
            >
              <option value="">Select city</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Goa">Goa</option>
            </select>
          </div>

          {/* divider desktop */}
          <div className="hidden md:block h-6 w-px bg-gray-200"></div>

          {/* BUDGET */}
          <div className="flex flex-col md:px-5 md:flex-1">
            <span className="text-[11px] font-semibold text-gray-500">
              Budget
            </span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="outline-none text-xs bg-transparent text-gray-700"
            >
              <option value="">Select range</option>
              <option value="5000-10000">Rs5000 - Rs10000</option>
              <option value="10000-20000">Rs10000 - Rs20000</option>
              <option value="20000-30000">Rs20000 - Rs30000</option>
              <option value="50000+">Rs50000+</option>
            </select>
          </div>

          {/* divider desktop */}
          <div className="hidden md:block h-6 w-px bg-gray-200"></div>

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="mt-2 md:mt-0 md:ml-2 bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2 px-4 py-2 md:p-3 rounded-lg md:rounded-full transition"
          >
            <Search size={16} />
            <span className="md:hidden text-sm">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
