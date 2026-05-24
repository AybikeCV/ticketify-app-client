import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/auth.context";
import service from "../../services/index.services";
import toast from "react-hot-toast";

import BookingCard from "../../components/BookingCard";

function Profile() {

    const {loggedUserId, loggedUserRole} = useContext(AuthContext);

    const [myBookings, setMyBookings] = useState([])
    const [loading, setLoading] = useState(true)
    
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

    return (
      <div className="text-center py-20 text-zinc-400">
        Loading profile...
      </div>
    );
  }

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

              <p className="text-zinc-500 text-sm">
                Role
              </p>

              <p className="text-[#1B5E4A] capitalize">
                {loggedUserRole}
              </p>

            </div>

          </div>

        </div>

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

              {myBookings.map((booking) => (

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

    </div>
  );
}

export default Profile;