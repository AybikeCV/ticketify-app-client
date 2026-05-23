import "./index.css"
import { Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import NotFound from "./pages/NotFound"
import Footer from "./components/Footer"
import ConcertCard from "./components/ConcertCard"
import VenueCard from "./components/VenueCard"

import Home from "./pages/Home"
import About from "./pages/About"
import AllConcerts from "./pages/AllConcerts"
import ConcertDetail from "./pages/ConcertDetail"
import AllVenues from "./pages/AllVenues"

function App() {
 

  return (
    
     <div className="bg-zinc-800 min-h-screen text-zinc-100 flex flex-col">
      
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/concerts" element={<AllConcerts />} />
          <Route path="/concerts/:id" element={<ConcertDetail />} />
          <Route path="/venues" element={<AllVenues />} />

           {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
