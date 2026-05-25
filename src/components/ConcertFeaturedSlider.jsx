import { useContext,useRef } from "react";
import { ConcertContext } from "../contexts/concertapi.context";
import FeaturedConcertCard from "./FeaturedConcertCard";


function ConcertFeaturedSlider() {

  const { allConcerts } = useContext(ConcertContext);

  const featuredConcerts = allConcerts.filter(
    (c) => c.featured
  );

  const sliderRef = useRef(null)

  const scrollLeft = () => {
  sliderRef.current.scrollBy({
    left: -400,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  sliderRef.current.scrollBy({
    left: 400,
    behavior: "smooth",
  });
};

  return (
    <section className="py-16">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-8">

      <h2 className="text-3xl font-bold text-zinc-100">
        Featured Concerts
      </h2>

      <div className="flex gap-3">

        <button
          onClick={scrollLeft}
          className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#1B5E4A] transition"
        >
          ←
        </button>

        <button
          onClick={scrollRight}
          className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#1B5E4A] transition"
        >
          →
        </button>

      </div>

    </div>

    {/* SLIDER */}
    <div className="relative">

      {/* LEFT FADE */}
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* RIGHT FADE */}
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >

        {featuredConcerts.map((concert) => (

          <div
            key={concert._id}
            className="min-w-[340px] snap-center"
          >
            <FeaturedConcertCard concert={concert} />
          </div>

        ))}

      </div>

    </div>

  </section>
  );
}

export default ConcertFeaturedSlider;