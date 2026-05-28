import { useState } from "react";
import service from "../services/index.services";
import toast from "react-hot-toast";
import DeleteFunction from "./DeleteFunction";

function BookingCard({ booking, refreshBookings }) {
  const [showCancel, setShowCancel] = useState(false);

  const concert = booking.concert;
  const isDeletedConcert = !concert;

  const handleCancelBooking = async () => {
    try {
      await service.patch(`/bookings/${booking._id}`);
      toast.success("Booking cancelled");
      refreshBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.errorMessage || "Failed to cancel booking",
      );
    } finally {
      setShowCancel(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* image */}
      <img
        src={concert?.image || "https://picsum.photos/600/400"}
        alt={concert?.title || "Concert unavailable"}
        className="h-56 w-full object-cover opacity-80"
      />

      <div className="p-6">
        <h3 className="text-2xl font-bold">
          {concert?.title || "Concert no longer available"}
        </h3>

        <p className="text-[#1B5E4A] mt-2">{concert?.artist || "—"}</p>

        <div className="mt-6 space-y-2 text-zinc-400">
          <p>Venue: {concert?.venue?.name || "Not available"}</p>

          <p>Seats: {booking.seats.join(", ")}</p>

          <p>Total: €{booking.totalPrice}</p>

          <p>
            Status:{" "}
            <span
              className={
                booking.status === "confirmed"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {booking.status}
            </span>
          </p>
        </div>

        {/* 🚨 DELETED CONCERT MESSAGE */}
        {isDeletedConcert && (
          <div className="mt-4 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
            This concert is no longer available. Your booking has been cancelled
            automatically.
          </div>
        )}

        {/* BUTTON */}
        {booking.status === "confirmed" && !isDeletedConcert && (
          <button
            onClick={() => setShowCancel(true)}
            className="mt-8 px-5 py-3 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition"
          >
            Cancel Booking
          </button>
        )}
      </div>

      {/* MODAL */}
      {showCancel && (
        <DeleteFunction
          isOpen={showCancel}
          onClose={() => setShowCancel(false)}
          onConfirm={handleCancelBooking}
          title="Cancel Booking"
          message="Are you sure you want to cancel this booking?"
        />
      )}
    </div>
  );
}

export default BookingCard;
