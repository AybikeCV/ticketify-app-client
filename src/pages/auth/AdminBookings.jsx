import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import service from "../../services/index.services";
import Loader from "../../components/Loader";

function AdminBookings() {

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")



  useEffect(() => {

    const getBookings = async () => {

      try {

        const res = await service.get("/bookings");

        setBookings(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      } catch (error) {

        toast.error(
          "Failed to load bookings"
        );

      } finally {

        setLoading(false);
      }
    };

    getBookings();

  }, []);


  if (loading) {

    return <Loader />
  }


const safeBookings = Array.isArray(bookings) ? bookings : [];

 const filteredBookings = safeBookings.filter((b) => {
  const concertTitle = b?.concert?.title || "";
  const concertArtist = b?.concert?.artist || "";

  return (
    concertTitle.toLowerCase().includes(search.toLowerCase()) ||
    concertArtist.toLowerCase().includes(search.toLowerCase())
  );
});


  return (

    <div className="bg-zinc-950 min-h-screen text-zinc-100">

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* HEADER */}

        <div>

          <h1 className="text-5xl font-bold">
            Booking Management
          </h1>

          <p className="text-zinc-500 mt-4">
            Manage concert bookings and cancellations.
          </p>

        </div>

        <input
  placeholder="Search bookings by title, artist or user to manage them..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-xl border border-zinc-800"
/>


        {/* TABLE */}

        <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-800">

          <table className="w-full">

            <thead className="bg-zinc-900 border-b border-zinc-800">

              <tr className="text-left">

                <th className="p-5">
                  User
                </th>

                <th className="p-5">
                  Concert
                </th>

                <th className="p-5">
                  Quantity
                </th>

                <th className="p-5">
                  Total
                </th>

                <th className="p-5">
                  Status
                </th>

                <th className="p-5">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {bookings.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="p-8 text-center text-zinc-500"
                  >
                    No bookings found
                  </td>

                </tr>

              ) : (

                filteredBookings.map((booking) => (

                  <tr
                    key={booking._id}
                    className="border-b border-zinc-800"
                  >

                    {/* USER */}

                    <td className="p-5">

                      <div>

                        <p className="font-semibold">
                          {booking.user?.name}
                        </p>

                        <p className="text-zinc-500 text-sm">
                          {booking.user?.email}
                        </p>

                      </div>

                    </td>

                    {/* CONCERT */}

                    <td className="p-5">

                      <div>

                        <p className="font-semibold">
                          {booking.concert?.title}
                        </p>

                        <p className="text-zinc-500 text-sm">
                          {booking.concert?.date
                            ? new Date(
                                booking.concert.date
                              ).toLocaleDateString()
                            : "No date"}
                        </p>

                      </div>

                    </td>

                    {/* QUANTITY */}

                    <td className="p-5">
                      {booking.quantity}
                    </td>

                    {/* TOTAL */}

                    <td className="p-5">
                      €{booking.totalPrice}
                    </td>

            {/* STATUS */}

                    <td className="p-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === "confirmed"
  ? "bg-green-500/10 text-green-400"
  : booking.status === "cancel_requested"
  ? "bg-yellow-500/10 text-yellow-400"
  : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="p-5">

                      <Link
                        to={`/dashboard/bookings/edit/${booking._id}`}
                        className="px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition"
                      >
                        Manage
                      </Link>

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminBookings;