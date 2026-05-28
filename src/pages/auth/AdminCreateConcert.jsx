import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import service from "../../services/index.services";
import { ConcertContext } from "../../contexts/concertapi.context";
import { useNavigate, Link } from "react-router-dom";

function AdminCreateConcert() {
  const { allConcerts, setAllConcerts } = useContext(ConcertContext);

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    artist: "",
    description: "",
    venue: "",
    date: "",
    doorsOpen: "",
    genre: "",
    price: "",
    totalSeats: "",
    status: "upcoming",
    featured: false,
    image: "",
    imagePublicId: "",
  });

  const hasImage = Boolean(form.image);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const res = await service.get("/venues");
        setVenues(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error("Failed to load venues");
      }
    };

    getVenues();
  }, []);

  const handleChange = (e) => {
    //all inputs update form automatically//
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await service.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prev) => ({
        ...prev,
        image: res.data.imageUrl,
        imagePublicId: res.data.publicId,
      }));

      toast.success("Image uploaded");
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

      const res = await service.post("/concerts", form);

      setAllConcerts((prev) => [...prev, res.data]);
      toast.success("Concert created");

      navigate("/dashboard/concerts");

      if (allConcerts?.length !== undefined) {
      }

      setForm({
        title: "",
        artist: "",
        description: "",
        venue: "",
        date: "",
        doorsOpen: "",
        genre: "",
        price: "",
        totalSeats: "",
        status: "upcoming",
        featured: false,
        image: "",
        imagePublicId: "",
      });
    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Create Concert</h1>

          <p className="text-zinc-400 mt-2">
            Add a new concert to your platform
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-10"
        >
          <div>
            <h2 className="text-lg font-semibold mb-4 text-zinc-300">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Concert title"
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
              />

              <input
                name="artist"
                value={form.artist}
                onChange={handleChange}
                placeholder="Artist name"
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
              />
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Concert description"
              className="w-full mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800 h-28"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-zinc-300">
              Venue & Schedule
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="venue"
                value={form.venue}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
              >
                <option value="" disabled>
                  🎟 Select venue
                </option>

                {venues.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name} — {v.city}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-zinc-400">Doors Open Time</label>

              <input
                type="time"
                name="doorsOpen"
                value={form.doorsOpen}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-zinc-300">
              Tickets
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Ticket price"
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
              />

              <input
                type="number"
                name="totalSeats"
                value={form.totalSeats}
                onChange={handleChange}
                placeholder="Total seats"
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-zinc-300">
              Category
            </h2>

            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
            >
              <option value="" disabled>
                🎵 Select genre
              </option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hiphop">Hip Hop</option>
              <option value="electronic">Electronic</option>
              <option value="jazz">Jazz</option>
              <option value="folk">Folk</option>
              <option value="classical">Classical</option>
              <option value="indie">Indie</option>
              <option value="metal">Metal</option>
              <option value="rnb">R&B</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-zinc-300">Image</h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />

            {hasImage && (
              <img
                src={form.image}
                className="w-full h-64 object-cover rounded-xl mt-4"
              />
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <label className="flex items-center gap-2 text-zinc-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    featured: !prev.featured,
                  }))
                }
              />
              Featured concert
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-3 rounded-xl bg-zinc-950 border border-zinc-800"
            >
              <option value="upcoming">Upcoming</option>
              <option value="cancelled">Cancelled</option>
              <option value="sold_out">Sold Out</option>
              <option value="past">Past</option>
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#1B5E4A] hover:bg-[#164a3a] transition font-semibold"
          >
            {loading ? "Creating..." : "Create Concert"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateConcert;
