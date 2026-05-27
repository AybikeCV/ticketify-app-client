import "../index.css";
import { useContext } from "react";
import { ConcertContext } from "../contexts/concertapi.context";
import ConcertCard from "../components/ConcertCard";

function AllConcerts() {
  const { allConcerts } = useContext(ConcertContext);

  const safeConcerts = Array.isArray(allConcerts)
    ? allConcerts
    : [];

  if (!safeConcerts.length) {
    return (
      <div className="text-center py-20 text-zinc-400">
        No concerts available
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen px-4 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Concerts
      </h1>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {safeConcerts.map((concert) => (
          <ConcertCard
            key={concert._id}
            concert={concert}
          />
        ))}

      </div>

    </div>
  );
}

export default AllConcerts;