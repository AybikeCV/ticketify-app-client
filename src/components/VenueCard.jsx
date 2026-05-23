import { Link } from "react-router-dom";


function VenueCard({ venue }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#1B5E4A]/40 transition">

      {/* IMAGE */}
     <img
        src={venue.image} 
        alt={venue.name}
        className="h-56 w-full object-cover"
      />

      {/* CONTENT */}
      <div className="p-5">

        <h2 className="text-xl font-semibold text-zinc-100">
          {venue.name}
        </h2>

        <p className="text-zinc-400 mt-2">
          {venue.city}
        </p>

        <p className="text-zinc-500 text-sm mt-3">
        Capacity: {venue.capacity}
        </p>

        <Link
            to={`/venues/${venue._id}`}
            className="m-50 px-4 py-2 rounded-lg bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition"
          >
            Details
          </Link>

        </div>
      </div>
    
  );
}

export default VenueCard;