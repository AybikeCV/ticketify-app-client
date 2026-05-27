import { useEffect, useState } from "react";
import service from "../../services/index.services";
import toast from "react-hot-toast";
import DeleteFunction from "../../components/DeleteFunction";


function AdminUsers() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] = useState("");

  const [showRole, setShowRole] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  

  useEffect(() => {

    getUsers();

  }, []);

  const getUsers = async () => {

    try {

      const response =
        await service.get("/users");

      console.log(response.data);

      setUsers(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load users"
      );

      setLoading(false);
    }
  };

  // ROLE CHANGE
 const confirmRoleChange = async () => {
  if (!selectedUser) return;

  try {
    const newRole =
      selectedUser.role === "user" ? "admin" : "user";

    await service.patch(`/users/${selectedUser._id}`, {
      role: newRole,
    });

    toast.success("Role updated");
    await getUsers();
  } catch (error) {
    toast.error(
      error.response?.data?.errorMessage ||
        "Failed to update role"
    );
  } finally {
    setShowRole(false);
    setSelectedUser(null);
  }
};
  // ACTIVE CHANGE
  const handleActiveChange =
    async (userId, isActive) => {

      try {

        await service.patch(
          `/users/${userId}`,
          {
            isActive: !isActive,
          }
        );

        toast.success(
          "User updated"
        );

        getUsers();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update user"
        );
      }
    };

  if (loading) {

    return (
      <div className="text-center py-20 text-zinc-400">
        Loading users...
      </div>
    );
  }

  const safeUsers = Array.isArray(users) ? users : [];
const filteredUser = safeUsers.filter((u) =>
  (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
  (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
  (u.role || "").toLowerCase().includes(search.toLowerCase()) ||
  (u._id || "").toLowerCase().includes(search.toLowerCase())
);

  return (

    <div className="bg-zinc-950 min-h-screen text-zinc-100">

      <div className="max-w-7xl mx-auto px-4 py-16">

        <h1 className="text-5xl font-bold">
          User Management
        </h1>

        <p className="text-zinc-500 mt-4">
          Manage users, roles and access.
        </p>

        <input
  placeholder="Search users by name, email, role or user ID..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-xl border border-zinc-800"
/>



        {/* TABLE */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-800">

          <table className="w-full">

            <thead className="bg-zinc-900 border-b border-zinc-800">

              <tr className="text-left">

                <th className="p-5">
                  User
                </th>

                <th className="p-5">
                  Role
                </th>

                <th className="p-5">
                  Status
                </th>

                <th className="p-5">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUser.map((user) => (

                <tr
                  key={user._id}
                  className="border-b border-zinc-800 bg-zinc-950"
                >

                  {/* USER */}
                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={
                          user.avatar ||
                          "https://i.pravatar.cc/150?img=3"
                        }
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                      />

                      <div>

                        <p className="font-semibold">
                          {user.name}
                        </p>

                        <p className="text-zinc-500 text-sm">
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ROLE */}
                  <td className="p-5">

                    <span
                      className={
                        user.role === "admin"

                          ? "px-3 py-1 rounded-full bg-[#1B5E4A]/20 text-[#1B5E4A] border border-[#1B5E4A]/30"

                          : "px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                      }
                    >
                      {user.role}
                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="p-5">

                    <span
                      className={
                        user.isActive

                          ? "text-green-500"

                          : "text-red-500"
                      }
                    >
                      {user.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="p-5">

                    <div className="flex flex-wrap gap-3">

                      {/* ROLE */}
<button
  onClick={() => {
    if (user.role === "admin") {
      toast.error("You cannot change an admin's role.");
      return;
    }

    setSelectedUser(user);
    setShowRole(true);
  }}
  className="px-4 py-2 rounded-lg bg-[#1B5E4A]/20 border border-[#1B5E4A]/30 hover:bg-[#1B5E4A]/30 transition"
>
  Change Role
</button>

                      {/* ACTIVE */}
                      <button
                        onClick={() =>
                          handleActiveChange(
                            user._id,
                            user.isActive
                          )
                        }
                        className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition"
                      >
                        {user.isActive
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
   {showRole && selectedUser && (
  <DeleteFunction
    isOpen={showRole}
    onClose={() => {
      setShowRole(false);
      setSelectedUser(null);
    }}
    onConfirm={confirmRoleChange}
    title="Change Role"
    message={`Change role for ${selectedUser.name}?`}
  />
)}
    </div>
  );
}

export default AdminUsers;