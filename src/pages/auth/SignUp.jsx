import service from "../../services/index.services";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contact backend to register the user
    const body = {

        name: name,
      email: email,
  
      password: password
    }

    try {
      
      const response = await service.post("/auth/signup", body)
      navigate("/login")

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
            Hello!
          </h1>

          <p className="text-center text-zinc-500 mt-3">
            Create an account to book and manage your tickets and enjoy concerts
          </p>

        </div>


      <h1 className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-center text-zinc-100 outline-none font-semibold mt-4 transition focus:border-[#1B5E4A]">Signup Form</h1>
    <br/>
      <form className="space-y-5" onSubmit={handleSignup}>

  <label>Username:</label>
        <input
          type="text"
          placeholder="Enter your name"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 outline-none focus:border-[#1B5E4A] transition"
          name="name"
          value={name}
          onChange={handleNameChange}
        />


        
        <br />

      <label>Email:</label>
        <input
          type="email"
          placeholder="you@example.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 outline-none focus:border-[#1B5E4A] transition"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />


        <br />

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

        <button type="submit" className="w-full bg-[#1B5E4A] hover:bg-[#164A3A] transition text-white py-3 rounded-lg font-semibold mt-4">Signup</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>

<div>
<p className="text-zinc-500 text-sm mt-8 text-center">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#1B5E4A] hover:text-[#2A7A61] transition"
          >
            Login!
          </Link>
</p>
</div>

     </div> 
    </div>
  );
}

export default Signup;