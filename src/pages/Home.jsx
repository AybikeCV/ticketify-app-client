import React from "react";
import { useState, useEffect, useContext } from "react";
import { ConcertContext } from "../contexts/concertapi.context";
import ConcertCard from "../components/ConcertCard";
import VenueCard from "../components/VenueCard";
import ConcertFeaturedSlider from "../components/ConcertFeaturedSlider";
import service from "../services/index.services";
import Loader from "../components/Loader";

function Home() {

  const { allConcerts } = useContext(ConcertContext);

  const [allVenues, setAllVenues] = useState(null);

  const [search, setSearch] = useState("");

  const hasSearch = search.trim() !== "";

  useEffect(() => {
    getVenueData();
  }, []);

  const getVenueData = async () => {

    try {

      const response = await service.get("/venues");

      console.log(response.data);

      setAllVenues(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!allVenues || !allConcerts) {

    return <Loader />;

  }

  const concerts = Array.isArray(allConcerts)
    ? allConcerts
    : [];

  const venues = Array.isArray(allVenues)
    ? allVenues
    : [];

  const filteredConcerts = Array.isArray(concerts)

    ? concerts.filter((c) =>

        c.artist
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        c.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        c.genre
          .toLowerCase()
          .includes(search.toLowerCase())
      )

    : [];

  const filteredVenues = Array.isArray(venues)

    ? venues.filter((v) =>

        v.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        v.city
          .toLowerCase()
          .includes(search.toLowerCase())
      )

    : [];

  return (

    <div className="min-h-screen bg-zinc-800 text-zinc-100">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 py-14 md:py-20 text-center">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">

          Book{" "}

          <span className="text-[#1B5E4A]">
            Concerts
          </span>{" "}

          Easily

        </h1>

        <p className="text-zinc-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto">

          Find and book live concerts with a simple,
          modern system.

        </p>

        {/* SEARCH */}
        <div className="mt-8">

          <input
            type="text"
            placeholder="Search concerts or venues..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full max-w-xl mx-auto bg-zinc-900 text-zinc-100 p-3 rounded-xl border border-zinc-800 focus:outline-none"
          />

        </div>

      </section>

      {/* FEATURED */}
      <section className="max-w-6xl mx-auto px-4 pb-12">

        <ConcertFeaturedSlider />

      </section>

      {/* SEARCH RESULTS */}
      {hasSearch && (

        <section className="max-w-6xl mx-auto px-4 pb-20">

          {/* CONCERT RESULTS */}
          <div>

            <h2 className="text-2xl font-bold mb-6">
              Concerts
            </h2>

            {filteredConcerts.length === 0 ? (

              <div className="text-zinc-500 text-center py-10 bg-zinc-900 rounded-2xl border border-zinc-800">

                No concerts found.

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredConcerts.map((concert) => (

                  <ConcertCard
                    key={concert._id}
                    concert={concert}
                  />

                ))}

              </div>

            )}

          </div>

          {/* VENUE RESULTS */}
          <div className="mt-16">

            <h2 className="text-2xl font-bold mb-6">
              Venues
            </h2>

            {filteredVenues.length === 0 ? (

              <div className="text-zinc-500 text-center py-10 bg-zinc-900 rounded-2xl border border-zinc-800">

                No venues found.

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredVenues.map((venue) => (

                  <VenueCard
                    key={venue._id}
                    venue={venue}
                  />

                ))}

              </div>

            )}

          </div>

        </section>

      )}

      {/* SIMPLE CARDS */}
      <section className="max-w-5xl mx-auto px-4 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {[
            "Easy Booking",
            "Live Events",
            "Trusted Venues",
          ].map((t) => (

            <div
              key={t}
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl"
            >

              <h3 className="text-[#1B5E4A] font-medium text-lg">

                {t}

              </h3>

              <p className="text-zinc-400 text-sm mt-2">

                Simple and clean experience for users.

              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;