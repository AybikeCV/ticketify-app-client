import "../index.css"
import service from "../services/index.services"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import VenueCard from "../components/VenueCard"
import Loader from "../components/Loader"

function AllVenues() {


    const [allVenues, setAllVenues] = useState (null)

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

if (!allVenues) {
    return <Loading/>
  }


    return (
        <div className="bg-zinc-950 min-h-screen px-4 py-10">

      <h1 className="text-4xl font-bold text-zinc-100 mb-10 text-center">
       Venues
      </h1>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {allVenues.map((venue) => (
          <VenueCard
            key={venue._id}
            venue={venue}
          />
        ))}

      </div>
    </div>
    )

}

export default AllVenues