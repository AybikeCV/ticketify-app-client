import React from "react"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-zinc-800 text-zinc-100">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">
          Book <span className="text-[#1B5E4A]">Concerts</span> Easily
        </h1>

        <p className="text-zinc-400 mt-4">
          Find and book live concerts with a simple, modern system.
        </p>

        <div className="mt-8">
          <Link
            to="/concerts"
            className="px-6 py-3 bg-[#0B3B2E]/20 border border-[#0B3B2E]/40 rounded-lg text-zinc-200 hover:bg-[#0B3B2E]/30"
          >
            Browse Concerts
          </Link>
        </div>
      </section>

      {/* SIMPLE CARDS */}
      <section className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-4 pb-20">
        {["Easy Booking", "Live Events", "Trusted Venues"].map((t) => (
          <div
            key={t}
            className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg"
          >
            <h3 className="text-[#1B5E4A] font-medium">{t}</h3>
            <p className="text-zinc-400 text-sm mt-2">
              Simple and clean experience for users.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home