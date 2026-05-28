import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import service from "../../services/index.services";
import { AuthContext } from "../../contexts/auth.context";
import Loader from "../../components/Loader";

function EditProfile() {
  const {
    loggedUserName,
    setLoggedUserName,
    setLoggedUserId,
    setLoggedUserRole,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await service.get("/users/profile");

      setFormData({
        name: response.data.name || "",
        email: response.data.email || "",
        password: "",
        avatar: response.data.avatar || "",
      });

      setLoading(false);
    } catch (error) {
      toast.error("Failed to load profile");

      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      setLoading(true);

      const res = await service.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData((prev) => ({
        ...prev,
        avatar: res.data.imageUrl,
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
      const res = await service.patch("/users/profile", formData);

      setLoggedUserName(res.data.name);
      setLoggedUserId(res.data._id);
      setLoggedUserRole(res.data.role);

      toast.success("Profile updated");
      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.errorMessage || "Failed to update profile",
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h1 className="text-4xl font-bold">Edit Profile</h1>

          <p className="text-zinc-500 mt-3">Update your account information.</p>

          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            {/* NAME */}
            <div>
              <label className="text-sm text-zinc-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave empty to keep current password"
                className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400">Avatar</label>

              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4"
              />

              {formData.avatar && (
                <img
                  src={formData.avatar}
                  className="w-24 h-24 mt-4 rounded-full object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B5E4A] hover:bg-[#164c3c] transition rounded-xl py-4 font-semibold"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
