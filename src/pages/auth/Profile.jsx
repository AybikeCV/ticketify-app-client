import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import service from "../../services/index.services";
import toast from "react-hot-toast";
import BookingCard from "../../components/BookingCard";
import { Link, useNavigate } from "react-router-dom"
import DeleteFunction from "../../components/DeleteFunction";
import Loader from "../../components/Loader"



function Profile() {

    const {loggedUserId, loggedUserRole, logoutUser, loggedUserName} = useContext(AuthContext);

    const [myBookings, setMyBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [showDeleteFunction, setShowDeleteFunction] = useState(false)
    
    useEffect(() => {

    getBookings();

  }, []);

  const getBookings = async () => {

    try {

      const response =
        await service.get(
          "/bookings/mybookings"
        );

      console.log(response.data);

      setMyBookings(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load bookings"
      );

      setLoading(false);
    }
  };

  if (loading) {

    return <Loader/>
  }

const safeMyBookings = Array.isArray(myBookings) ? myBookings : [];
  const filteredMyBookings = safeMyBookings.filter((b) => {
  const title = b?.concert?.title || "";
  const artist = b?.concert?.artist || "";

  return (
    title.toLowerCase().includes(search.toLowerCase()) ||
    artist.toLowerCase().includes(search.toLowerCase())
  );
});

const handleDeleteProfile = async () => {

  

  try {

    await service.delete(
      "/users/profile"
    );

    toast.success(
      "Profile deleted"
    );

    logoutUser();

    navigate("/");

  } catch (error) {

    toast.error(
      error.response?.data?.errorMessage ||
      "Failed to delete profile"
    );
  }
};

  return (


   <div className="bg-zinc-950 min-h-screen text-zinc-100">

      <div className="max-w-6xl mx-auto px-4 py-16">



        {/* PROFILE CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <div className="mt-8 space-y-4">

            <div>

              <p className="text-zinc-500 text-sm">
                User ID
              </p>


              <p>
                {loggedUserId}
              </p>

            </div>

            <div>


        <p className="text-zinc-500 text-sm">Name</p>
<p>{loggedUserName}</p>


              <p className="text-zinc-500 text-sm">
                Role
              </p>

      

              <p className="text-[#1B5E4A] capitalize">
                {loggedUserRole}
              </p>

            </div>

            <div className="flex gap-4 mt-8">

  <Link
    to="/profile/edit"
    className="px-5 py-3 rounded-xl bg-[#1B5E4A]/20 border border-[#1B5E4A]/30 hover:bg-[#1B5E4A]/30 transition"
  >
    Edit Profile
  </Link>

  <button
    onClick={() => setShowDeleteFunction(true)}
    className="px-5 py-3 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition"
  >
    Delete Profile
  </button>

</div>

          </div>

        </div>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">

  <Link
    to="/"
    className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
  >
    Home
  </Link> 
  </div>

        <br/>
        <br/>

         <input
  placeholder="Search bookings by title or artist to manage them..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-xl border border-zinc-800"
/>




        {/* BOOKINGS */}
        <section className="mt-16">

          <h2 className="text-3xl font-bold mb-8">

            My Bookings

          </h2>

          {myBookings.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center text-zinc-500">

              No bookings yet.

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {filteredMyBookings.map((booking) => (

                <BookingCard
                  key={booking._id}
                  booking={booking}
                  refreshBookings={getBookings}
                />

              ))}

            </div>

          )}

        </section>

      </div>
    

 {showDeleteFunction && (
  <DeleteFunction
    isOpen={showDeleteFunction}
    onClose={() => setShowDeleteFunction(false)}
    onConfirm={handleDeleteProfile}
    title="Delete Profile"
    message="Are you sure you want to delete your account? This action cannot be undone."
  />
)}



    </div>
  );
}

export default Profile;