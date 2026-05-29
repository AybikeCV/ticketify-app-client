import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold">Admin Dashboard</h1>

        <p className="text-zinc-400 mt-4">
          Manage concerts, venues, users and bookings.
        </p>

   
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
      
          <Link to="/dashboard/concerts">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#1B5E4A]/40 transition hover:-translate-y-1">
              <h2 className="text-2xl font-bold">Concerts</h2>

              <p className="text-zinc-500 mt-3">Create and manage concerts</p>
            </div>
          </Link>

          <Link to="/dashboard/venues">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#1B5E4A]/40 transition hover:-translate-y-1">
              <h2 className="text-2xl font-bold">Venues</h2>

              <p className="text-zinc-500 mt-3">Manage venue locations</p>
            </div>
          </Link>

          <Link to="/dashboard/users">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#1B5E4A]/40 transition hover:-translate-y-1">
              <h2 className="text-2xl font-bold">Users</h2>

              <p className="text-zinc-500 mt-3">Manage users and roles</p>
            </div>
          </Link>

   
          <Link to="/dashboard/bookings">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#1B5E4A]/40 transition hover:-translate-y-1">
              <h2 className="text-2xl font-bold">Bookings</h2>

              <p className="text-zinc-500 mt-3">View all bookings</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
