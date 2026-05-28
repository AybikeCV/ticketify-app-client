import { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ConcertContext } from "../contexts/concertapi.context";
import toast from "react-hot-toast";
import service from "../services/index.services";
import Loader from "../components/Loader";

function ConcertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { allConcerts } = useContext(ConcertContext);

  const safeConcerts = Array.isArray(allConcerts) ? allConcerts : [];
  const concert = safeConcerts.find((c) => c._id === id);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  if (!concert) return <Loader />;

  const seats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length >= 5) {
        toast.error("Max 5 seats allowed"); //only for front-end to avoid spam-clicking but back-end needs to be updated too
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  useEffect(() => {
    setTotalPrice(selectedSeats.length * concert.price);
  }, [selectedSeats, concert.price]);

  const handleBooking = async () => {
    try {
      if (selectedSeats.length === 0) {
        toast.error("Select at least one seat");
        return;
      }

      await service.post("/bookings", {
        concertId: concert._id,
        quantity: selectedSeats.length,
        seats: selectedSeats,
      });

      toast.success("Booking successful!");

      setTimeout(() => navigate("/profile"), 500);
    } catch (error) {
      toast.error(error.response?.data?.errorMessage || "Booking failed");
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">
      <div className="h-[400px] overflow-hidden">
        <img src={concert.image} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold">{concert.title}</h1>
        <p className="text-[#1B5E4A] mt-3 text-xl">{concert.artist}</p>

        <div className="mt-10 space-y-3 text-zinc-300">
          <p>
            <span className="text-zinc-500">Venue:</span> {concert?.venue?.name}
          </p>

          <p>
            <span className="text-zinc-500">Date:</span>{" "}
            {new Date(concert.date).toLocaleDateString()}
          </p>

          <p>
            <span className="text-zinc-500">Time:</span>{" "}
            {new Date(concert.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <span className="text-zinc-500">Doors Open:</span>{" "}
            {concert.doorsOpen || "Not announced"}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Select Seats</h2>

          <div className="grid grid-cols-6 gap-3">
            {seats.map((seat) => {
              const selected = selectedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  onClick={() => toggleSeat(seat)}
                  className={`p-2 rounded-lg border text-sm
                ${
                  selected
                    ? "bg-[#1B5E4A] border-[#1B5E4A]"
                    : "bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
                }`}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        </div>

        <br />
        <div className="space-y-1">
          <p>Price per seat: €{concert.price}</p>

          <p className="text-lg font-semibold text-[#1B5E4A]">
            Total: €{totalPrice}
          </p>
        </div>

        <button
          onClick={handleBooking}
          className="mt-10 px-6 py-3 rounded-lg bg-[#1B5E4A]/20 border border-[#1B5E4A]/40 hover:bg-[#1B5E4A]/30 transition"
        >
          Book Ticket
        </button>

        <div className="mt-6 flex gap-4">
          <Link to="/" className="px-5 py-2 bg-zinc-800 rounded-lg">
            Home
          </Link>
          <Link to="/concerts" className="px-5 py-2 bg-zinc-800 rounded-lg">
            Concerts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConcertDetail;
