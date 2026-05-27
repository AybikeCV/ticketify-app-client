import React from "react";

function Footer() {
  return (
    <footer className="bg-zinc-800 border-t border-zinc-900 text-zinc-400 py-8 mt-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#1B5E4A]">TICKETIFY</span>
        </p>
        <p>All the images in this project are used for learning purposes, this is a mock concert management page made for learning the MERN Stack Development purposes. Concert and dates are totally imaginary. </p>
      </div>
    </footer>
  );
}

export default Footer