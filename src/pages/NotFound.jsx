import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-[#1B5E4A]">404</h1>

      <p className="text-zinc-400 mt-3">Page not found</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-200 hover:bg-zinc-800"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound