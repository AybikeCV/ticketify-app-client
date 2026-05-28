import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../contexts/auth.context";
//import { ThemeContext } from "../contexts/theme.context";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const {
    setIsLoggedIn,
    setLoggedUserId,
    isLoggedIn,
    loggedUserRole,
    setLoggedUserRole,
    lougoutUser,
  } = useContext(AuthContext);

  //const { theme, toggleTheme } = useContext(ThemeContext);//
  // console.log(theme);//
  // console.log(toggleTheme);//

  function handleLogout(e) {
    e.preventDefault();

    localStorage.removeItem("authToken");

    setIsLoggedIn(false);
    setLoggedUserId(null);
    setLoggedUserRole(null);

    navigate("/login");
  }

  return (
    <nav className="bg-white text-zinc-900 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold">
          <span className="text-[#1B5E4A]">TICKET</span>IFY
        </Link>

        {/* big screen */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className="text-zinc-400 hover:text-white transition">
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

          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className="text-zinc-400 hover:text-white transition"
              >
                Profile
              </NavLink>

              {loggedUserRole === "admin" && (
                <NavLink
                  to="/dashboard"
                  className="text-zinc-400 hover:text-white transition"
                >
                  Dashboard
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="text-[#1B5E4A] hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        
        </div>

        {/* small screen button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* small screen */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 px-4 py-4 space-y-4 bg-zinc-950">
          <NavLink
            to="/" onClick={() => setOpen(false)} className="block text-zinc-400">
            Home
          </NavLink>

          <NavLink
            to="/about" onClick={() => setOpen(false)} className="block text-zinc-400">
            About
          </NavLink>

          <NavLink
            to="/concerts" onClick={() => setOpen(false)} className="block text-zinc-400">
            Concerts
          </NavLink>

          <NavLink to="/venues" className="block text-zinc-400">
            Venues
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login" onClick={() => setOpen(false)}className="block text-zinc-400">
                Login
              </NavLink>

              <NavLink to="/signup" onClick={() => setOpen(false)} className="block w-fit px-4 py-2 rounded-lg bg-[#1B5E4A]/20 border border-[#1B5E4A]/40">
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile" onClick={() => setOpen(false)} className="block text-zinc-400">
                Profile
              </NavLink>

              {loggedUserRole === "admin" && (
                <NavLink
                  to="/dashboard" onClick={() => setOpen(false)} className="block text-zinc-400" >
                  Dashboard
                </NavLink>
              )}

              <button onClick={handleLogout} className="block text-red-400">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
