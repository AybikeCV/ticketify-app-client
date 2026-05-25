import { createContext, useEffect, useState } from "react";
import service from "../services/index.services";
import Loader from "../components/Loader";

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
    return <Loader/>
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