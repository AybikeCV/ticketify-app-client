import { useContext } from "react";
import { ConcertContext } from "../contexts/concertapi.context";
import ConcertCard from "./ConcertCard";

function ConcertFeaturedSlider() {

  const { allConcerts } = useContext(ConcertContext);

  const featuredConcerts = allConcerts.filter(
    (c) => c.featured
  );

  return (
    <section className="py-16">

      <h2 className="text-3xl font-bold text-zinc-100 mb-8">
        Featured Concerts
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">

        {featuredConcerts.map((concert) => (

          <div
            key={concert._id}
            className="min-w-[320px]"
          >
            <ConcertCard concert={concert} />
          </div>

        ))}

      </div>

    </section>
  );
}

export default ConcertFeaturedSlider;