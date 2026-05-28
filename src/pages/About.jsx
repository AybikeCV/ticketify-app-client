import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-20 max-w-4xl mx-auto">
    
      <h1 className="text-4xl font-bold text-center">
        About <span className="text-[#1B5E4A]">Ticketify</span>
      </h1>

      <p className="text-zinc-400 mt-6 leading-relaxed">
        Ticketify is a concert booking and management application built with the
        MERN stack. Users can explore concerts, view details, and book tickets
        through a smooth and modern interface.
      </p>

      <div className="mt-8 text-zinc-300 space-y-2 text-center">
        <p>✔ Modern dark UI</p>
        <p>✔ Seat-based booking system</p>
        <p>✔ Fast and responsive experience</p>
      </div>

      <div className="mt-10 flex gap-6 items-center">
        <a
          href="https://github.com/AybikeCV"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          <FaGithub className="text-xl" />
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/aybike-celebi-visser-6b9003106/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          <FaLinkedin className="text-xl text-[#1B5E4A]" />
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default About;
