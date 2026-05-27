import React from "react"
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ConcertContext } from "../contexts/concertapi.context";
import ConcertCard from "../components/ConcertCard";
import VenueCard from "../components/VenueCard";
import ConcertFeaturedSlider from "../components/ConcertFeaturedSlider"
import service from "../services/index.services";
import Loader from "../components/Loader";

function Home() {


  const { allConcerts} = useContext(ConcertContext)
  const [ allVenues, setAllVenues ] = useState(null)
  const [ search, setSearch ] = useState("")
  const hasSearch = search.trim() !== ""

    useEffect(() => {
        getVenueData()
    }, [])

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
    return <Loader/>
  }

const concerts = allConcerts || []
const venues = allVenues || []

const filteredConcerts = Array.isArray(concerts)
  ? concerts.filter((c) =>
      c.artist.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.genre.toLowerCase().includes(search.toLowerCase())
    )
  : [];

const filteredVenues = Array.isArray(venues)
  ? venues.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase())
    )
  : [];


  return (
    <div className="min-h-screen bg-zinc-800 text-zinc-100">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">
          Book <span className="text-[#1B5E4A]">Concerts</span> Easily
        </h1>

        <p className="text-zinc-400 mt-4">
          Find and book live concerts with a simple, modern system.
        </p>

        <input
  type="text"
  placeholder="Search concerts or venues..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full max-w-xl bg-zinc-900 text-zinc-100 p-3 rounded-xl border border-zinc-800"
/>

<section>
        <div className="max-w-6xl mx-auto px-4">
        <ConcertFeaturedSlider />
      </div>
</section>

{hasSearch && (
  <>
    
    {/* CONCERT RESULTS */}
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {filteredConcerts.map((concert) => (
        <ConcertCard
          key={concert._id}
          concert={concert}
        />
      ))}
    </div>

    {/* VENUE RESULTS */}
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {filteredVenues.map((venue) => (
        <VenueCard
          key={venue._id}
          venue={venue}
        />
      ))}
    </div>

  </>
)}


      </section>

    

      {/* SIMPLE CARDS */}
      <section className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-4 pb-20">
        {["Easy Booking", "Live Events", "Trusted Venues"].map((t) => (
          <div
            key={t}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg"
          >
            <h3 className="text-[#1B5E4A] font-medium">{t}</h3>
            <p className="text-zinc-400 text-sm mt-2">
              Simple and clean experience for users.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home