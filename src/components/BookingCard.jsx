import service from "../services/index.services";
import toast from "react-hot-toast";


function BookingCard({
  booking,
  refreshBookings,
}) {

  const concert = booking.concert;

  const handleCancelBooking =
    async () => {

      try {

        await service.patch(
          `/bookings/${booking._id}`,
          {
            reason:
              "Cancelled by user"
          }
        );

        toast.success(
          "Booking cancelled"
        );

        refreshBookings();

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.errorMessage ||
          "Failed to cancel booking"
        );
      }
    };

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

      {/* IMAGE */}
      <img
        src={concert.image}
        alt={concert.title}
        className="h-56 w-full object-cover"
      />

      {/* CONTENT */}
      <div className="p-6">

        <h3 className="text-2xl font-bold">
          {concert.title}
        </h3>

        <p className="text-[#1B5E4A] mt-2">
          {concert.artist}
        </p>

        <div className="mt-6 space-y-2 text-zinc-400">

          <p>
            Venue:{" "}
            {concert.venue.name}
          </p>

          <p>
            Tickets:{" "}
            {booking.quantity}
          </p>

          <p>
            Total: €
            {booking.totalPrice}
          </p>

          <p>
            Status:{" "}

            <span
              className={
                booking.status ===
                "confirmed"

                  ? "text-green-500"

                  : "text-red-500"
              }
            >
              {booking.status}
            </span>

          </p>

        </div>

        {/* BUTTON */}
        {booking.status ===
          "confirmed" && (

          <button
            onClick={
              handleCancelBooking
            }
            className="mt-8 px-5 py-3 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition"
          >
            Cancel Booking
          </button>

        )}

      </div>

    </div>
  );
}

export default BookingCard;