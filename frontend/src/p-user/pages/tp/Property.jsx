import { UsePropertyContext } from "../../../context/PropertyContext";

function Property() {
  const { property } = UsePropertyContext();

  if (!property) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading property...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* TITLE */}
      <h1 className="text-2xl font-bold">{property.title}</h1>

      <p className="text-gray-600 mt-1">
        {property.location.area}, {property.location.city}
      </p>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {property.images.length > 0 ? (
          property.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="property"
              className="w-full h-56 object-cover rounded-lg"
            />
          ))
        ) : (
          <img
            src="https://dummyimage.com/800x600"
            className="w-full h-56 object-cover rounded-lg"
          />
        )}
      </div>

      {/* RENT + TYPE */}
      <div className="flex items-center justify-between mt-6">
        <div>
          <p className="text-xl font-semibold">₹{property.rent} / month</p>

          <p className="text-gray-500">{property.propertyType}</p>
        </div>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {property.status}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Description</h2>
        <p className="text-gray-600 mt-2">{property.description}</p>
      </div>

      {/* AMENITIES */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Amenities</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          {(property.amenities || []).map((item, index) => (
            <div key={index} className="bg-gray-100 px-3 py-2 rounded text-sm">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* LANDLORD */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-lg font-semibold mb-3">Landlord</h2>

        <div className="flex items-center gap-4">
          <img
            src={property.landlordId.profile.profilePicture}
            alt="landlord"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold">{property.landlordId.profile.name}</p>

            <p className="text-gray-500 text-sm">
              {property.landlordId.profile.email}
            </p>

            <p className="text-gray-500 text-sm">
              {property.landlordId.profile.mobile}
            </p>
          </div>
        </div>
      </div>

      {/* VISIT BUTTON */}
      <div className="mt-8">
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Schedule Visit
        </button>
      </div>
    </div>
  );
}

export default Property;
