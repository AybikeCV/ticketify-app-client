function Loader() {
  return (
    <div className="flex justify-center items-center py-20 relative">
      <div className="w-12 h-12 border-4 border-zinc-700 border-t-[#1B5E4A] rounded-full animate-spin"></div>

      <span className="absolute text-xl animate-pulse animate-bounce">🎸</span>
    </div>
  );
}

export default Loader;
