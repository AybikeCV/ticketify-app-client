import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#1B5E4A]/40 transition">

      {/* IMAGE */}
      <img
        src={venue.image}
        alt={venue.title}
        className="h-56 w-full object-cover"
      />

      {/* CONTENT */}
      <div className="p-5">

        <h2 className="text-xl font-semibold text-zinc-100">
          {venue.title}
        </h2>

        <p className="text-[#1B5E4A] mt-1">
          {concert.artist}
        </p>

        <p className="text-zinc-400 text-sm mt-3">
          {new Date(concert.date).toLocaleDateString()}
        </p>

        <p className="text-zinc-500 text-sm">
          {concert.venue?.name}
        </p>

        <div className="flex items-center justify-between mt-5">

          <span className="text-zinc-100 font-medium">
            €{concert.price}
          </span>

          <Link
            to={`/concerts/${concert._id}`}
            className="px-4 py-2 rounded-lg bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition"
          >
            Details
          </Link>

        </div>
      </div>
    </div>
  );
}

export default VenueCard;