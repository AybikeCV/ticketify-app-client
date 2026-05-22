import React from "react"


function Home() {
  return (
   <div className="space-y-20">
      <section className="h-[70vh] rounded-3xl overflow-hidden relative flex items-center justify-center text-center">
        <img
          src="https://picsum.photos/seed/hero/1600/900"
          alt="concert"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Feel Every Note.
          </h1>

          <p className="mt-6 text-zinc-300 text-lg">
            Discover unforgettable live performances and immersive concert experiences.
          </p>

          <button className="mt-8 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-2xl transition">
            Explore Concerts
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home