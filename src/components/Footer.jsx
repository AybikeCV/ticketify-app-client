import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-zinc-800 border-t border-zinc-900 text-zinc-400 py-8 mt-20">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
       
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
     
       
       <div>
       
        <p>
          © {new Date().getFullYear()}{" "}
         <Link
  to="/"
  className="text-[#1B5E4A] hover:opacity-80 transition"
>
  TICKETIFY
</Link>
        </p>

        <p className="text-sm leading-relaxed">
          This project is built for educational purposes as part of a MERN stack
          learning exercise. All data, events, and bookings are fictional and
          not associated with any real-world event organizers. All images used
          in this project are for educational and non-commercial purposes and
          may include placeholder or demo assets.
        </p>
 </div>
</div>
    </footer>
  );
}

export default Footer;
