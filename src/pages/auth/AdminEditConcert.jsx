import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import service from "../../services/index.services";

function AdminEditConcert() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allVenues, setAllVenues] = useState([]);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    description: "",
    venue: "",
    date: "",
    doorsOpen: "",
    genre: "",
    price: 0,
    totalSeats: 100,
    status: "upcoming",
    featured: false,
    image: "",
    imagePublicId: "",
  });

  useEffect(() => {
    const getConcert = async () => {
      try {
        const res = await service.get(`/concerts/${id}`);
        setForm(res.data);
      } catch (err) {
        toast.error("Failed to load concert");
      }
    };

    getConcert();
  }, [id]);


  useEffect(() => {
    const getVenues = async () => {
      try {
        const res = await service.get("/venues");
        setAllVenues(res.data);
      } catch (err) {
        toast.error("Failed to load venues");
      }
    };

    getVenues();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  // IMAGE UPLOAD
 
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);

    try {
      setLoading(true);

      const res = await service.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prev) => ({
        ...prev,
        image: res.data.imageUrl,
        imagePublicId: res.data.publicId,
      }));

      toast.success("Image updated");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await service.patch(`/concerts/${id}`, form);

      toast.success("Concert updated");

      navigate("/dashboard/concerts");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold">
          Edit Concert
        </h1>
        <p className="text-zinc-400 mb-8">
          Update concert details and settings
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-10"
        >

          {/* ================= BASIC INFO ================= */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              🎤 Basic Information
            </h2>

            <div className="space-y-4">

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Concert title"
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
              />

              <input
                name="artist"
                value={form.artist}
                onChange={handleChange}
                placeholder="Artist name"
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Concert description"
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl h-28"
              />
            </div>
          </section>

          {/* ================= EVENT DETAILS ================= */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              📍 Event Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="date"
                name="date"
                value={form.date?.split("T")[0]}
                onChange={handleChange}
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
              />

              <input
                name="doorsOpen"
                value={form.doorsOpen}
                onChange={handleChange}
                placeholder="Doors open (e.g. 18:30)"
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
              />

            </div>
          </section>

          {/* ================= PRICING ================= */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              💰 Pricing & Capacity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Ticket price (€)"
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
              />

              <input
                type="number"
                name="totalSeats"
                value={form.totalSeats}
                onChange={handleChange}
                placeholder="Total seats"
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
              />

            </div>
          </section>

          {/* ================= STATUS ================= */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              ⚙ Status
            </h2>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
            >
              <option value="upcoming">Upcoming</option>
              <option value="cancelled">Cancelled</option>
              <option value="sold_out">Sold Out</option>
              <option value="past">Past</option>
            </select>
          </section>

          {/* ================= MEDIA ================= */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              🖼 Media
            </h2>

            {form.image && (
  <img
    key={form.image}
    src={form.image}
    className="w-full h-64 object-cover rounded-xl mb-4"
  />
)}

            <input
  type="file"
  accept="image/*"
  className="w-full"
  onChange={handleImageUpload}
/>
          </section>

          {/* ================= SAVE ================= */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#1B5E4A] hover:bg-[#164a3a] font-semibold"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminEditConcert;