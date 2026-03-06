import { UsePropertyContext } from "../context/PropertyContext";

function PropertyCard({ id, image, title, price }) {
  const { searchProperty } = UsePropertyContext();

  return (
    <div
      className="w-full md:min-w-[48%] cursor-pointer"
      onClick={() => searchProperty(id)}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 md:h-72 object-cover rounded-xl"
        />
      </div>

      <div className="mt-2 text-xs md:text-sm">
        <p className="font-semibold">{title}</p>
        <p className="text-gray-500">Starting from just {price}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
