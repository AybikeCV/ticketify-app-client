import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  const { setIsLoggedIn, setLoggedUserId, isLoggedIn, setLoggedUserRole } = useContext(AuthContext)

  function handleLogout(e) {
    e.preventDefault()

    // destroying the token
    localStorage.removeItem("authToken")

    // revert the states to their initial value
    setIsLoggedIn(false)
    setLoggedUserId(null)
    setLoggedUserRole(null)

    // navigate the user to a public page
    navigate("/login")

  }


  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 text-zinc-100">

      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-bold">
          <span className="text-[#1B5E4A]">TICKET</span>IFY
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className="text-zinc-400 hover:text-white transition"
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className="text-zinc-400 hover:text-white transition"
          >
            About
          </NavLink>

          <NavLink
            to="/concerts"
            className="text-zinc-400 hover:text-white transition"
          >
            Concerts
          </NavLink>

          <NavLink
            to="/venues"
            className="text-zinc-400 hover:text-white transition"
          >
            Venues
          </NavLink>

          <NavLink
            to="/login"
            className="text-zinc-400 hover:text-white transition"
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className="px-4 py-2 rounded-lg bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition"
          >
            Sign Up
          </NavLink>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 px-4 py-4 space-y-4 bg-zinc-950">

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="block text-zinc-400"
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className="block text-zinc-400"
          >
            About
          </NavLink>

          <NavLink
            to="/concerts"
            onClick={() => setOpen(false)}
            className="block text-zinc-400"
          >
            Concerts
          </NavLink>

          <NavLink
            to="/venues"
            className="block text-zinc-400"
          >
            Venues
          </NavLink>

          <NavLink
            to="/login"
            onClick={() => setOpen(false)}
            className="block text-zinc-400"
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            onClick={() => setOpen(false)}
            className="block w-fit px-4 py-2 rounded-lg bg-[#1B5E4A]/20 border border-[#1B5E4A]/40"
          >
            Sign Up
          </NavLink>

        </div>
      )}
    </nav>
  );
}

export default Navbar;