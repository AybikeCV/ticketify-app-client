import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../../services/index.services";
import toast from "react-hot-toast";
import DeleteFunction from "../../components/DeleteFunction";

function AdminVenues() {
  const [allVenues, setAllVenues] = useState([]);
  const [showDeleteFunction, setShowDeleteFunction] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);

  useEffect(() => {
    getVenueData();
  }, []);

  const getVenueData = async () => {
    try {
      const response = await service.get("/venues");
      setAllVenues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVenue = async () => {
    try {
      await service.delete(`/venues/${selectedVenueId}`);
      toast.success("Venue deleted");

      // refresh list instead of reload (better UX)
      getVenueData();
    } catch (error) {
      toast.error(
        error.response?.data?.errorMessage || "Failed to delete venue"
      );
    } finally {
      setShowDeleteFunction(false);
    }
  };

  return (
  <div className="bg-zinc-950 min-h-screen text-zinc-100">
  <div className="max-w-7xl mx-auto px-4 py-16">

    <Link
  to="/dashboard"
  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition text-sm text-zinc-300 mb-6"
>
  ← Dashboard
</Link>

    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

      <div>
        <h1 className="text-3xl md:text-5xl font-bold">
          Venue Management
        </h1>

        <p className="text-zinc-500 mt-3 md:mt-4">
          Manage concert venues and locations.
        </p>
      </div>

      <Link
        to="/dashboard/venues/create"
        className="w-full md:w-auto text-center px-5 py-3 rounded-xl bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition"
      >
        Create Venue
      </Link>

    </div>

    {/* ================= DESKTOP TABLE ================= */}
    <div className="hidden md:block mt-12 overflow-x-auto rounded-2xl border border-zinc-800">

      <table className="w-full">

        <thead className="bg-zinc-900 border-b border-zinc-800">
          <tr className="text-left">
            <th className="p-5">Venue</th>
            <th className="p-5">City</th>
            <th className="p-5">Capacity</th>
            <th className="p-5">Country</th>
            <th className="p-5">Actions</th>
          </tr>
        </thead>

        <tbody>

          {allVenues?.map((venue) => (

            <tr
              key={venue._id}
              className="border-b border-zinc-800"
            >

              {/* VENUE */}
              <td className="p-5">
                <div className="flex items-center gap-4">

                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-semibold">
                      {venue.name}
                    </p>

                    <p className="text-zinc-500 text-sm">
                      {venue.address}
                    </p>
                  </div>

                </div>
              </td>

              {/* CITY */}
              <td className="p-5">
                {venue.city}
              </td>

              {/* CAPACITY */}
              <td className="p-5">
                {venue.capacity}
              </td>

              {/* COUNTRY */}
              <td className="p-5">
                {venue.country}
              </td>

              {/* ACTIONS */}
              <td className="p-5">

                <div className="flex gap-3">

                  <Link
                    to={`/dashboard/venues/edit/${venue._id}`}
                    className="px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedVenueId(venue._id);
                      setShowDeleteFunction(true);
                    }}
                    className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

    {/* ================= MOBILE CARDS ================= */}
    <div className="md:hidden space-y-4 mt-12">

      {allVenues?.map((venue) => (

        <div
          key={venue._id}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        >

          {/* TOP */}
          <div className="flex gap-4">

            <img
              src={venue.image}
              alt={venue.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div>
              <p className="font-semibold">
                {venue.name}
              </p>

              <p className="text-zinc-500 text-sm">
                {venue.city}, {venue.country}
              </p>

              <p className="text-zinc-500 text-xs mt-1">
                Capacity: {venue.capacity}
              </p>
            </div>

          </div>

          {/* INFO */}
          <div className="mt-4 text-sm text-zinc-400 space-y-1">

            <p>
              Address: {venue.address}
            </p>

          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 mt-4">

            <Link
              to={`/dashboard/venues/edit/${venue._id}`}
              className="flex-1 text-center px-3 py-2 rounded-lg border border-zinc-700"
            >
              Edit
            </Link>

            <button
              onClick={() => {
                setSelectedVenueId(venue._id);
                setShowDeleteFunction(true);
              }}
              className="flex-1 px-3 py-2 rounded-lg border border-red-500/30 bg-red-500/10"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

    {/* DELETE MODAL */}
    <DeleteFunction
      isOpen={showDeleteFunction}
      onClose={() => setShowDeleteFunction(false)}
      onConfirm={handleDeleteVenue}
      title="Are you sure to delete the venue?"
      message="This action cannot be undone"
    />

  </div>
</div>
  );
}

export default AdminVenues;