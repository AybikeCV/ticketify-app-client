import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import service from "../../services/index.services";
import { ConcertContext } from "../../contexts/concertapi.context";

function AdminCreateConcert() {
  const { allConcerts } = useContext(ConcertContext);

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  

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

  const hasImage = Boolean(form.image)

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

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //IMAGE UPLOAD 
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

      await service.post("/concerts", form);

      toast.success("Concert created");

      // refresh concerts list (if function exists)
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
      toast.error(err.response?.data?.errorMessage || "Error creating concert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">Create Concert</h1>
        <p className="text-zinc-400 mb-8">
          Add a new concert to your platform
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6"
        >

          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Concert title"
            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
          />

          {/* ARTIST */}
          <input
            name="artist"
            value={form.artist}
            onChange={handleChange}
            placeholder="Artist name"
            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Concert description"
            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 h-28"
          />

          {/* VENUE */}
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

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
          />

          {/* GENRE */}
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
            <option value="classical">Classical</option>
            <option value="indie">Indie</option>
            <option value="metal">Metal</option>
            <option value="rnb">R&B</option>
            <option value="other">Other</option>
          </select>

          {/* PRICE */}
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Ticket price"
            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
          />

          {/* TOTAL SEATS */}
          <input
            type="number"
            name="totalSeats"
            value={form.totalSeats}
            onChange={handleChange}
            placeholder="Total seats"
            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {hasImage && (
  <img
    src={form.image}
    className="w-full h-64 object-cover rounded-xl"
  />
)}

          {/* FEATURED */}
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

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
          >
            <option value="upcoming">Upcoming</option>
            <option value="cancelled">Cancelled</option>
            <option value="sold_out">Sold Out</option>
            <option value="past">Past</option>
          </select>

          {/* SUBMIT */}
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