import { Heart } from "lucide-react";
import { useNavigate } from "react-router";

function PropertyCard({ id, image, title, price }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full md:min-w-[48%] cursor-pointer"
      onClick={() => navigate(`/property/:${id}`)}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 md:h-72 object-cover rounded-xl"
        />

        {/* Heart */}
        <button className="absolute top-2 right-2 bg-white/90 p-1.5 md:p-2 rounded-full hover:bg-white transition">
          <Heart size={16} />
        </button>
      </div>

      <div className="mt-2 text-xs md:text-sm">
        <p className="font-semibold">{title}</p>
        <p className="text-gray-500">Starting from just {price}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
