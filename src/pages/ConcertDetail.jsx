import { useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { ConcertContext } from "../contexts/concertapi.context";

function ConcertDetail() {

  const { id } = useParams();

  const { allConcerts } = useContext(ConcertContext);

  const concert = allConcerts.find(
    (c) => c._id === id
  );

  if (!concert) {
    return (
      <div className="text-center py-20 text-zinc-400">
        Loading concert...
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">

      {/* IMAGE */}
      <div className="h-[400px] overflow-hidden">

        <img
          src={concert.image}
          alt={concert.title}
          className="w-full h-full object-cover"
        />

      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-10">

        <h1 className="text-5xl font-bold">
          {concert.title}
        </h1>

        <p className="text-[#1B5E4A] mt-3 text-xl">
          {concert.artist}
        </p>

        <div className="mt-10 space-y-4 text-zinc-300">

          <p>
            <span className="text-zinc-500">Venue:</span>{" "}
            <Link to={`/venues/${concert.venue._id}`}>{concert.venue.name}</Link>
          </p>



          <p>
            <span className="text-zinc-500">Date:</span>{" "}
            {new Date(concert.date).toLocaleDateString()}
          </p>

          <p>
            <span className="text-zinc-500">Price:</span>{" "}
            €{concert.price}
          </p>

          <p className="text-zinc-400 leading-relaxed pt-6">
            {concert.description}
          </p>

        </div>

        <button className="mt-10 px-6 py-3 rounded-lg bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition">

          Book Ticket

        </button>

      </div>
    </div>
  );
}

export default ConcertDetail;