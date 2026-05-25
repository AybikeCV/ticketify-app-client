import { useState } from "react";
import toast from "react-hot-toast";
import service from "../../services/index.services";

function AdminCreateVenue() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    country: "Netherlands",
    latitude: "",
    longitude: "",
    capacity: 100,
    description: "",
    image: "",
    imagePublicId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- IMAGE UPLOAD ----------------
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

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await service.post("/venues", {
        name: form.name,
        address: form.address,
        city: form.city,
        country: form.country,
        capacity: Number(form.capacity),
        description: form.description,
        image: form.image,
        imagePublicId: form.imagePublicId,

        location: {
          type: "Point",
          coordinates: [
            Number(form.longitude),
            Number(form.latitude),
          ],
        },
      });

      toast.success("Venue created");

      setForm({
        name: "",
        address: "",
        city: "",
        country: "Netherlands",
        latitude: "",
        longitude: "",
        capacity: 100,
        description: "",
        image: "",
        imagePublicId: "",
      });

    } catch (err) {
      toast.error(err.response?.data?.errorMessage || "Error creating venue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold">Create Venue</h1>
        <p className="text-zinc-400 mb-8">
          Add a new concert location
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-8"
        >

          {/* BASIC INFO */}
          <section className="space-y-4">
            <h2 className="text-[#1B5E4A] font-semibold">
              📍 Basic Info
            </h2>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Venue name"
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street address"
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
            />

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
            />
          </section>

          {/* LOCATION */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              🌍 Location Coordinates
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
              />

              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
              />
            </div>
          </section>

          {/* CAPACITY */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              🎟 Capacity
            </h2>

            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
            />
          </section>

          {/* DESCRIPTION */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              📝 Description
            </h2>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl h-28"
            />
          </section>

          {/* IMAGE */}
          <section>
            <h2 className="text-[#1B5E4A] font-semibold mb-4">
              🖼 Image
            </h2>

            <input type="file" onChange={handleImageUpload} />

            {form.image && (
              <img
                src={form.image}
                className="w-full h-64 object-cover rounded-xl mt-4"
              />
            )}
          </section>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full py-3 bg-[#1B5E4A] rounded-xl font-semibold"
          >
            {loading ? "Creating..." : "Create Venue"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminCreateVenue;