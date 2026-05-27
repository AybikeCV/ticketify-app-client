import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import service from "../../services/index.services";
import { useMapEvents, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function AdminEditVenue() {

    function LocationMarker({ form, setForm }) {

  useMapEvents({
    click(e) {

      setForm((prev) => ({
        ...prev,
        longitude: e.latlng.lng,
        latitude: e.latlng.lat,
      }));
    },
  });

  if (!form.latitude || !form.longitude) return null;

  return (
    <Marker
      position={[
        Number(form.latitude),
        Number(form.longitude),
      ]}
    />
  );
}

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    country: "Netherlands",
    longitude: "",
    latitude: "",
    capacity: "",
    description: "",
    image: "",
    imagePublicId: "",
  });

  
  useEffect(() => {

    const getVenue = async () => {

      try {

        const res = await service.get(`/venues/${id}`);

        const venue = res.data.venue || res.data;

        setForm({
          name: venue.name || "",
          address: venue.address || "",
          city: venue.city || "",
          country: venue.country || "Netherlands",

          longitude:
            venue.location?.coordinates?.[0] || "",

          latitude:
            venue.location?.coordinates?.[1] || "",

          capacity: venue.capacity || "",

          description: venue.description || "",

          image: venue.image || "",

          imagePublicId:
            venue.imagePublicId || "",
        });

      } catch (error) {

        toast.error("Failed to load venue");

      }
    };

    getVenue();

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  // IMAGE UPLOAD
 
  const handleImageUpload = async (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {

      setLoading(true);

      const res = await service.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setForm((prev) => ({
        ...prev,
        image: res.data.imageUrl,
        imagePublicId: res.data.publicId,
      }));

      toast.success("Image uploaded");

    } catch (error) {

      toast.error("Upload failed");

    } finally {

      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        name: form.name,
        address: form.address,
        city: form.city,
        country: form.country,

        location: {
          type: "Point",
          coordinates: [
            Number(form.longitude),
            Number(form.latitude),
          ],
        },

        capacity: Number(form.capacity),

        description: form.description,

        image: form.image,

        imagePublicId:
          form.imagePublicId,
      };

      await service.put(
        `/venues/${id}`,
        payload
      );

      toast.success("Venue updated");

      navigate("/dashboard/venues");

    } catch (error) {

      toast.error(
        error.response?.data?.errorMessage ||
          "Failed to update venue"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">
          Edit Venue
        </h1>

        <p className="text-zinc-400 mb-8">
          Update venue details and settings
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-8"
        >

          {/* ================================= BASIC INFO ================================= */}

          <div>

            <h2 className="text-lg font-semibold text-[#1B5E4A] mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">

              {/* NAME */}
              <div>

                <label className="text-sm text-zinc-400">
                  Venue Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ziggo Dome"
                  className="w-full mt-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800"
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="text-sm text-zinc-400">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the venue..."
                  className="w-full mt-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800 h-32"
                />

              </div>

            </div>

          </div>

          {/* ================================= LOCATION ================================= */}

          <div>

  <h2 className="text-lg font-semibold text-[#1B5E4A] mb-4">
    Venue Location
  </h2>

  <div className="grid md:grid-cols-2 gap-4 mb-4">

    <div>
      <label className="text-sm text-zinc-400">
        Longitude
      </label>

      <input
        type="number"
        step="any"
        name="longitude"
        value={form.longitude}
        onChange={handleChange}
        placeholder="e.g. 4.9041"
        className="w-full mt-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800"
      />
    </div>

    <div>
      <label className="text-sm text-zinc-400">
        Latitude
      </label>

      <input
        type="number"
        step="any"
        name="latitude"
        value={form.latitude}
        onChange={handleChange}
        placeholder="e.g. 52.3676"
        className="w-full mt-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800"
      />
    </div>

  </div>

  <p className="text-xs text-zinc-500 mb-4">
    Click anywhere on the map to place the venue
  </p>

  <div className="overflow-hidden rounded-2xl border border-zinc-800">

    <MapContainer
      center={
        form.latitude && form.longitude
          ? [Number(form.latitude), Number(form.longitude)]
          : [52.3676, 4.9041]
      }
      zoom={13}
      scrollWheelZoom={true}
      className="h-[400px] w-full"
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        form={form}
        setForm={setForm}
      />

    </MapContainer>

  </div>

</div>
          {/* ================================= CAPACITY ================================= */}

          <div>

            <h2 className="text-lg font-semibold text-[#1B5E4A] mb-4">
              Capacity
            </h2>

            <div>

              <label className="text-sm text-zinc-400">
                Maximum Audience Capacity
              </label>

              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="e.g. 17000"
                className="w-full mt-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800"
              />

            </div>

          </div>

          {/* ================================= IMAGE ================================= */}

          <div>

            <h2 className="text-lg font-semibold text-[#1B5E4A] mb-4">
              Venue Image
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

{form.image && (

  <img
    key={form.image}
    src={form.image}
    alt={form.name}
    className="w-full h-72 object-cover rounded-2xl mt-4 border border-zinc-800"
  />

)}

          </div>

          {/* ================================= SUBMIT ================================= */}

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#1B5E4A] hover:bg-[#164a3a] transition font-semibold"
          >
            {loading
              ? "Updating Venue..."
              : "Update Venue"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminEditVenue;