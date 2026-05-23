import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">
        About <span className="text-[#1B5E4A">EchoEvents</span>
      </h1>

      <p className="text-zinc-400 mt-6 leading-relaxed">
        This is a concert booking and management app built with MERN stack.
        Users can explore concerts, view details, and book tickets easily.
      </p>

      <div className="mt-8 text-zinc-300 space-y-2">
        <p>✔ Simple UI</p>
        <p>✔ Fast booking system</p>
        <p>✔ Modern dark design</p>
      </div>
    </div>
  );
}

export default About