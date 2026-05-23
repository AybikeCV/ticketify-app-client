import { createContext, useEffect, useState } from "react";
import service from "../services/index.services";

const ConcertContext = createContext();

function ConcertWrapper({ children }) {

  const [allConcerts, setAllConcerts] = useState([]);

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

if (!allConcerts) {
    return (
      <div className="text-center py-20 text-zinc-400">
        Loading concerts...
      </div>
    );
  }

  return (
    <ConcertContext.Provider value={{allConcerts}}>
      {children}
    </ConcertContext.Provider>
  );
}

export {
    ConcertContext,
    ConcertWrapper
}