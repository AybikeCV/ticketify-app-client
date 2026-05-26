import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import service from "../../services/index.services";

function EditProfile() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      avatar: "",
    });

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // GET PROFILE
  // =====================================

  useEffect(() => {

    getProfile();

  }, []);

  const getProfile = async () => {

    try {

      const response =
        await service.get(
          "/users/profile"
        );

      setFormData({
        name: response.data.name || "",
        email: response.data.email || "",
        password: "",
        avatar: response.data.avatar || "",
      });

      setLoading(false);

    } catch (error) {

      toast.error(
        "Failed to load profile"
      );

      setLoading(false);
    }
  };

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await service.patch(
        "/users/profile",
        formData
      );

      toast.success(
        "Profile updated"
      );

      navigate("/profile");

    } catch (error) {

      toast.error(
        error.response?.data?.errorMessage ||
        "Failed to update profile"
      );
    }
  };

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


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (
      <div className="text-center py-20 text-zinc-400">
        Loading profile...
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      <div className="max-w-3xl mx-auto px-4 py-16">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <h1 className="text-4xl font-bold">
            Edit Profile
          </h1>

          <p className="text-zinc-500 mt-3">
            Update your account information.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-10"
          >

            {/* NAME */}
            <div>

              <label className="text-sm text-zinc-400">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:border-[#1B5E4A]"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="text-sm text-zinc-400">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:border-[#1B5E4A]"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-sm text-zinc-400">
                New Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave empty to keep current password"
                className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:border-[#1B5E4A]"
              />

            </div>

            {/* AVATAR */}
            <div>

              <label className="text-sm text-zinc-400">
                Avatar URL
              </label>

              <input
                type="file"
                name="avatar"
                value={handleImageUpload}
                onChange={handleChange}
                className="w-full mt-2 bg-zinc-950 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:border-[#1B5E4A]"
              />

            </div>

            {/* BUTTON */}
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