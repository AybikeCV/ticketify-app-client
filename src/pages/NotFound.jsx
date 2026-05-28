import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4 text-zinc-100">
      {/* Guitar / vibe */}
      <div className="text-7xl animate-bounce">🎸</div>

      <h1 className="text-6xl font-bold mt-6 text-[#1B5E4A]">404</h1>

      <p className="text-zinc-400 mt-3 text-lg">
        This stage is empty... No concert preparation found
      </p>

      <p className="text-zinc-600 mt-2 text-m">
        Maybe you went off setlist 🎶
      </p>

      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 rounded-lg text-zinc-100 hover:bg-[#1B5E4A]/30 transition"
      >
        🎧 Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
