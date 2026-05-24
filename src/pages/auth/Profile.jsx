import { useContext } from "react";

import { AuthContext } from "../../contexts/auth.context";

function Profile() {

    const {
    loggedUserId,
    loggedUserRole,
  } = useContext(AuthContext);


  return (


    <div className="bg-zinc-950 min-h-screen text-zinc-100">

      <div className="max-w-5xl mx-auto px-4 py-16">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <div className="mt-8 space-y-4">

            <div>

              <p className="text-zinc-500 text-sm">
                User ID
              </p>

              <p className="text-zinc-100">
                {loggedUserId}
              </p>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Role
              </p>

              <p className="text-[#1B5E4A] capitalize">
                {loggedUserRole}
              </p>

            </div>

          </div>

        </div>

        {/* BOOKINGS */}
        <section className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            My Bookings
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center text-zinc-500">

            No bookings yet.

          </div>

        </section>

      </div>

    </div>
  );
}

export default Profile;