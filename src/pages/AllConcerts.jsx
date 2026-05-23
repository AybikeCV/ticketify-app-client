import "../index.css"
import service from "../services/index.services"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ConcertCard from "../components/ConcertCard"

function AllConcerts() {


    const [AllConcerts, setAllConcerts] = useState (null)

    useEffect(() => {
        getConcertData()
    }, [])

const getConcertData = async () => {
    try {
      const response = await service.get("/concerts");
      console.log(response.data);
      setAllConcerts(response.data);
    } catch (error) {
      console.log(error);
      
    }
  };

if (!AllConcerts) {
    return (
      <div className="text-center py-20 text-zinc-400">
        Loading concerts...
      </div>
    );
  }


    return (
        <div className="bg-zinc-950 min-h-screen px-4 py-10">

      <h1 className="text-4xl font-bold text-zinc-100 mb-10 text-center">
        Concerts
      </h1>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {AllConcerts.map((concert) => (
          <ConcertCard
            key={concert._id}
            concert={concert}
          />
        ))}

      </div>
    </div>
    )

}

export default AllConcerts