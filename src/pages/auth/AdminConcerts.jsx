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

  <Link
    to="/dashboard"
    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition mb-6"
  >
    ← Back to Dashboard
  </Link>



        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h1 className="text-3xl md:text-5xl font-bold">
              Concert Management
            </h1>

            <p className="text-zinc-500 mt-3 md:mt-4">
              Manage concerts and events.
            </p>
          </div>

          <Link
            to="/dashboard/concerts/create"
            className="w-full md:w-auto text-center px-5 py-3 rounded-xl bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition"
          >
            Create Concert
          </Link>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block mt-12 overflow-x-auto rounded-2xl border border-zinc-800">

          <table className="w-full">

            <thead className="bg-zinc-900 border-b border-zinc-800">
              <tr className="text-left">
                <th className="p-5">Concert</th>
                <th className="p-5">Artist</th>
                <th className="p-5">Venue</th>
                <th className="p-5">Status</th>
                <th className="p-5">Featured</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allConcerts?.map((concert) => (
                <tr key={concert._id} className="border-b border-zinc-800">

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
                          {new Date(concert.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5">{concert.artist}</td>
                  <td className="p-5">{concert.venue?.name}</td>

                  <td className="p-5">
                    <span className="text-[#1B5E4A]">
                      {concert.status}
                    </span>
                  </td>

                  <td className="p-5">
                    {concert.featured ? "⭐" : "-"}
                  </td>

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

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4 mt-12">

          {allConcerts?.map((concert) => (
            <div
              key={concert._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
            >

              {/* TOP */}
              <div className="flex gap-4">
                <img
                  src={concert.image}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div>
                  <p className="font-semibold">
                    {concert.title}
                  </p>

                  <p className="text-zinc-500 text-sm">
                    {concert.artist}
                  </p>

                  <p className="text-zinc-500 text-xs mt-1">
                    {new Date(concert.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-4 text-sm text-zinc-400 space-y-1">
                <p>Venue: {concert.venue?.name}</p>
                <p>Status: {concert.status}</p>
                <p>Featured: {concert.featured ? "⭐" : "-"}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/dashboard/concerts/edit/${concert._id}`}
                  className="flex-1 text-center px-3 py-2 rounded-lg border border-zinc-700"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setSelectedConcertId(concert._id);
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
          onConfirm={handleDeleteConcert}
          title="Are you sure to delete the concert?"
          message="This action cannot be undone"
        />

      </div>
    </div>
    
  );
}

export default AdminConcerts;