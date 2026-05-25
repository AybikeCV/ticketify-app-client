import "./index.css"
import { Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import NotFound from "./pages/NotFound"
import Footer from "./components/Footer"
import ConcertCard from "./components/ConcertCard"
import VenueCard from "./components/VenueCard"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"

import Home from "./pages/Home"
import About from "./pages/About"
import AllConcerts from "./pages/AllConcerts"
import ConcertDetail from "./pages/ConcertDetail"
import AllVenues from "./pages/AllVenues"
import VenueDetail from "./pages/VenueDetail"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/SignUp"
import Profile from "./pages/auth/Profile"
import AdminDashboard from "./pages/auth/AdminDashboard"
import AdminUsers from "./pages/auth/AdminUsers"
import AdminConcerts from "./pages/auth/AdminConcerts"
import AdminCreateConcert from "./pages/auth/AdminCreateConcert"
import AdminEditConcert from "./pages/auth/AdminEditConcert"
import AdminVenues from "./pages/auth/AdminVenues"
import AdminCreateVenue from "./pages/auth/AdminCreateVenue"
import AdminEditVenue from "./pages/auth/AdminEditVenue"
import AdminBookings from "./pages/auth/AdminBookings"
import AdminEditBooking from "./pages/auth/AdminEditBooking"

function App() {
 

  return (
    
     <div className="min-h-screen flex flex-col bg-white text-black dark:bg-zinc-950 dark:text-zinc-100">
      
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/concerts" element={<AllConcerts />} />
          <Route path="/concerts/:id" element={<ConcertDetail />} />
          <Route path="/venues" element={<AllVenues />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/dashboard/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/dashboard/concerts" element={<AdminRoute><AdminConcerts /></AdminRoute>} />
          <Route path="/dashboard/concerts/create" element={<AdminRoute><AdminCreateConcert /></AdminRoute>} />
          <Route path="/dashboard/concerts/edit/:id" element={<AdminRoute><AdminEditConcert /></AdminRoute>} />

          <Route path="/dashboard/venues" element={<AdminRoute><AdminVenues /></AdminRoute>} />
          <Route path="/dashboard/venues/create" element={<AdminRoute><AdminCreateVenue /></AdminRoute>} />
          <Route path="/dashboard/venues/edit/:id" element={<AdminRoute><AdminEditVenue /></AdminRoute>} />

          <Route path="/dashboard/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          <Route path="/dashboard/bookings/edit/:id" element={<AdminRoute><AdminEditBooking /></AdminRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

    </div>
  )
}

export default App
