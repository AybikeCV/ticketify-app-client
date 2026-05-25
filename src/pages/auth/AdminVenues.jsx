import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../../services/index.services";
import toast from "react-hot-toast";
import DeleteFunction from "../../components/DeleteFunction";

function AdminVenues() {



    const [allVenues, setAllVenues] = useState ([])

    const [showDeleteFunction, setShowDeleteFunction] = useState(false);

const [selectedVenueId, setSelectedVenueId] = useState(null);

    useEffect(() => {
        getVenueData()
    }, [])

const getVenueData = async () => {
    try {
      const response = await service.get("/venues");
      console.log(response.data);
      setAllVenues(response.data);
    } catch (error) {
      console.log(error);
      
    }
  };

const handleDeleteVenue = async () => {

  try {

    await service.delete(
      `/venues/${selectedVenueId}`
    );

    toast.success("Venue deleted");

    window.location.reload();

  } catch (error) {

    toast.error(
      error.response?.data?.errorMessage ||
      "Failed to delete venue"
    );

  } finally {

    setShowDeleteModal(false);

  }
};
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              Venue Management
            </h1>
            <p className="text-zinc-500 mt-4">
              Manage concert venues and locations.
            </p>
          </div>

          <Link
            to="/dashboard/venues/create"
            className="px-5 py-3 rounded-xl bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition"
          >
            Create Venue
          </Link>
        </div>

        {/* TABLE */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-800">

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
              {!allVenues ? (
                <tr>
                  <td className="p-5 text-zinc-400" colSpan="5">
                    Loading venues...
                  </td>
                </tr>
              ) : allVenues.length === 0 ? (
                <tr>
                  <td className="p-5 text-zinc-400" colSpan="5">
                    No venues found
                  </td>
                </tr>
              ) : (
                allVenues.map((venue) => (
                  <tr
                    key={venue._id}
                    className="border-b border-zinc-800"
                  >
                    {/* VENUE */}
                    <td className="p-5 font-semibold">
                      {venue.name}
                    </td>

                    {/* CITY */}
                    <td className="p-5 text-zinc-400">
                      {venue.city}
                    </td>

                    {/* CAPACITY */}
                    <td className="p-5 text-zinc-400">
                      {venue.capacity}
                    </td>

                    {/* COUNTRY */}
                    <td className="p-5 text-zinc-400">
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
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>


<DeleteFunction
  isOpen={showDeleteFunction}
  onClose={() => setShowDeleteFunction(false)}
  onConfirm={handleDeleteVenue}
  title="concert"
/>


    
    </div>
  );
}

export default AdminVenues;