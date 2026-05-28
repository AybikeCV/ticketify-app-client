import "../index.css";
import service from "../services/index.services";
import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";

function AllVenues() {
  const [allVenues, setAllVenues] = useState([]);

  useEffect(() => {
    getVenueData();
  }, []);

  const getVenueData = async () => {
    try {
      const response = await service.get("/venues");

      setAllVenues(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setAllVenues([]);
    }
  };

  if (!allVenues.length) {
    return (
      <div className="text-center py-20 text-zinc-400">No venues available</div>
    );
  }

  const safeVenues = Array.isArray(allVenues) ? allVenues : [];

  return (
    <div className="bg-zinc-950 min-h-screen px-4 py-10">
      <h1 className="text-4xl font-bold text-zinc-100 mb-10 text-center">
        Venues
      </h1>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {safeVenues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

export default AllVenues;
