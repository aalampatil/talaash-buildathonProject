import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] px-3 py-3 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-5">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
            talaash
          </h1>

          <p className="mt-4 text-xl md:text-2xl text-red-900 font-medium">
            the search ends here
          </p>

          <p className="mt-4 text-sm md:text-lg text-red-900 max-w-lg">
            Find your next home with ease. Explore verified properties, discover
            the perfect neighborhood, and make your move with confidence.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to={"/filter-properties"}
              className="bg-red-900 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
            >
              Explore Homes
            </Link>

            <button className="border border-red-600 text-red-900 px-6 py-3 rounded-lg font-medium hover:bg-red-100 transition">
              List Your Property
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="home"
            className="w-full max-w-md md:max-w-lg rounded-2xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
