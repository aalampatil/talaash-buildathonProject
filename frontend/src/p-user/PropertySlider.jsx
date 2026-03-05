import PropertyCard from "./PropertyCard";
import { ArrowRightSquare } from "lucide-react";
import { Link } from "react-router-dom";

function PopularHomes() {
  const properties = [
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      title: "Flat in Ladakh",
      price: "Rs 11,000/mo",
    },
    {
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      title: "Flat in Ladakh",
      price: "Rs 11,000/mo",
    },
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      title: "Flat in Ladakh",
      price: "Rs 15,000/mo",
    },
    {
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
      title: "Apartment in Ladakh",
      price: "Rs 21,000/mo",
    },
  ];

  return (
    <div className="border-t border-red-900 rounded-full px-4 md:px-8 py-8">
      {/* Title */}
      <Link to="/hot-properties">
        <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center justify-start">
          Hot Properties around the country <ArrowRightSquare />
        </h2>
      </Link>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-5">
        {properties.map((item, i) => (
          <PropertyCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default PopularHomes;
