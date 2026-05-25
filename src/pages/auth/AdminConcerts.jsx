import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import { ConcertContext } from "../../contexts/concertapi.context";
import service from "../../services/index.services";
import toast from "react-hot-toast";
import DeleteFunction from "../../components/DeleteFunction";

function AdminConcerts() {

  const { allConcerts } =
    useContext(ConcertContext);
    const [showDeleteFunction, setShowDeleteFunction] = useState(false);

const [selectedConcertId, setSelectedConcertId] = useState(null);

   const handleDeleteConcert = async () => {

  try {

    await service.delete(
      `/concerts/${selectedConcertId}`
    );

    toast.success("Concert deleted");

    window.location.reload();

  } catch (error) {

    toast.error(
      error.response?.data?.errorMessage ||
      "Failed to delete concert"
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
              Concert Management
            </h1>

            <p className="text-zinc-500 mt-4">
              Manage concerts and events.
            </p>

          </div>

          {/* CREATE */}
          <Link
            to="/dashboard/concerts/create"
            className="px-5 py-3 rounded-xl bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition"
          >
            Create Concert
          </Link>

        </div>

        {/* TABLE */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-800">

          <table className="w-full">

            <thead className="bg-zinc-900 border-b border-zinc-800">

              <tr className="text-left">

                <th className="p-5">
                  Concert
                </th>

                <th className="p-5">
                  Artist
                </th>

                <th className="p-5">
                  Venue
                </th>

                <th className="p-5">
                  Status
                </th>

                <th className="p-5">
                  Featured
                </th>

                <th className="p-5">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {allConcerts.map((concert) => (

                <tr
                  key={concert._id}
                  className="border-b border-zinc-800"
                >

                  {/* CONCERT */}
                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={concert.image}
                        alt={concert.title}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div>

                        <p className="font-semibold">
                          {concert.title}
                        </p>

                        <p className="text-zinc-500 text-sm">
                          {new Date(
                            concert.date
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ARTIST */}
                  <td className="p-5">
                    {concert.artist}
                  </td>

                  {/* VENUE */}
                  <td className="p-5">
                    {concert.venue?.name}
                  </td>

                  {/* STATUS */}
                  <td className="p-5">

                    <span className="text-[#1B5E4A]">
                      {concert.status}
                    </span>

                  </td>

                  {/* FEATURED */}
                  <td className="p-5">

                    {concert.featured
                      ? "⭐"
                      : "-"}

                  </td>

                  {/* ACTIONS */}
                  <td className="p-5">

                    <div className="flex gap-3">

                      <Link
                        to={`/dashboard/concerts/edit/${concert._id}`}
                        className="px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition"
                      >
                        Edit
                      </Link>

                     <button
 onClick={() => {
  setSelectedConcertId(concert._id);
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

      </div>

      <DeleteFunction
  isOpen={showDeleteFunction}
  onClose={() => setShowDeleteFunction(false)}
  onConfirm={handleDeleteConcert}
  title="concert"
/>

    </div>
  );
}

export default AdminConcerts;