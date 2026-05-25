import { Link } from "react-router-dom";

function FeaturedConcertCard({ concert }) {
  return (
    <Link
      to={`/concerts/${concert._id}`}
      className="block"
    >
      <div className="relative h-[420px] rounded-3xl overflow-hidden group">

        {/* IMAGE */}
        <img
          src={concert.image}
          alt={concert.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* CONTENT */}
        <div className="absolute bottom-0 p-6">

        

          <h2 className="text-3xl font-bold mt-2 text-white">
            {concert.title}
          </h2>

          <p className="text-zinc-300 mt-2">
            {concert.artist}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm text-white">
            Book Now
          </div>

        </div>

      </div>
    </Link>
  );
}

export default FeaturedConcertCard;