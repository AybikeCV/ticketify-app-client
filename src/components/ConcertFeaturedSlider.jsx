import { useContext, useRef, useState, useEffect } from "react";
import { ConcertContext } from "../contexts/concertapi.context";
import FeaturedConcertCard from "./FeaturedConcertCard";

function ConcertFeaturedSlider() {
  const { allConcerts } = useContext(ConcertContext);

  // ✅ SAFE DATA
  const safeConcerts = Array.isArray(allConcerts) ? allConcerts : [];

  const featuredConcerts = safeConcerts.filter(
    (c) => c?.featured === true
  );

  const sliderRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 🔥 RESPONSIVE SCROLL (NO FIXED PX)
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  // 🔥 CHECK SCROLL POSITION
  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);

    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 5
    );
  };

  useEffect(() => {
    checkScroll();
  }, [featuredConcerts]);

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
            disabled={!canScrollLeft}
            className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#1B5E4A] transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#1B5E4A] transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </div>

      {/* SLIDER WRAPPER */}
      <div className="relative">

        {/* LEFT FADE */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10 pointer-events-none" />

        {/* RIGHT FADE */}
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-10 pointer-events-none" />

        {/* TRACK */}
        <div
          ref={sliderRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >

          {featuredConcerts.map((concert) => (
            <div
              key={concert?._id}
              className="min-w-[340px] snap-center transition duration-300 hover:scale-[1.02]"
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