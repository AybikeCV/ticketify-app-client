import service from "../../services/index.services";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

function Login() {

  const { setIsLoggedIn, setLoggedUserId, setLoggedUserRole } = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contact backend to validate user credentials
    const body = {
      email: email,
      password: password
    }

    try {
      
      const response = await service.post("/auth/login", body)

      // storing the token safely in localstorage
      localStorage.setItem("authToken", response.data.authToken)

      // update the auth context states accordingly
      setIsLoggedIn(true)
      setLoggedUserId(response.data.payload._id)
      setLoggedUserRole(response.data.payload.role)

if (response.data.payload.role === "admin") {

  navigate("/dashboard");

} else {

  navigate("/profile");
}
      

    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // navigate("/error")
      }
    }


  };

  return (
    
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">

 <div className="mb-8">

          <h1 className="text-center text-4xl font-bold text-zinc-100">
            Welcome Back To Ticketify
          </h1>

          <p className="text-center text-zinc-500 mt-3">
            Login to manage your bookings and enjoy the concerts!
          </p>

        </div>

      <h1 className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-center text-zinc-100 outline-none font-semibold mt-4 transition focus:border-[#1B5E4A]">Login Form</h1>
<br/>
      <form onSubmit={handleLogin}>
        <label>E-mail:</label>
        <input
          type="email"
           placeholder="you@example.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 outline-none focus:border-[#1B5E4A] transition"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />
        <br/>

        <label>Password:</label>
        <input
          type="password"
          placeholder="••••••••"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 outline-none focus:border-[#1B5E4A] transition"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit" className="w-full bg-[#1B5E4A] hover:bg-[#164A3A] transition text-white py-3 rounded-lg font-semibold mt-4">Login</button>

        {errorMessage && <p>{errorMessage}</p>}
        
      </form>

      <div>

        <p className="text-zinc-500 text-sm mt-8 text-center">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-[#1B5E4A] hover:text-[#2A7A61] transition"
          >
            Create one!
          </Link>

        </p>
      </div>


</div>
     </div> 
    
  );
}

export default Login;