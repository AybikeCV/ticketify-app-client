import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import service from "../../services/index.services";
import DeleteFunction from "../../components/DeleteFunction";
import Loader from "../../components/Loader";

function AdminEditBooking() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [showCancel, setShowCancel] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const res = await service.get(`/bookings/${id}`);

        setBooking(res.data);
      } catch (error) {
        toast.error("Failed to load booking");
      } finally {
        setLoading(false);
      }
    };

    getBooking();
  }, [id]);

  const handleCancelBooking = async () => {
    try {
      setLoading(true);

      await service.patch(`/bookings/${id}`);

      toast.success("Booking cancelled");

      navigate("/dashboard/bookings");
    } catch (error) {
      toast.error(
        error.response?.data?.errorMessage || "Failed to cancel booking",
      );
    } finally {
      setLoading(false);
      setShowCancel(false);
    }
  };

  if (loading || !booking) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Booking Details</h1>

        <p className="text-zinc-500 mb-8">
          Manage booking status and cancellation.
        </p>

        <Link
          to="/dashboard/bookings"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition text-sm text-zinc-300 mb-6"
        >
          ← Back to Bookings
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
          <div>
            <p className="text-zinc-500 text-sm">User</p>

            <h2 className="text-xl font-semibold">{booking.user?.name}</h2>

            <p className="text-zinc-400">{booking.user?.email}</p>
          </div>

          <div>
            <p className="text-zinc-500 text-sm">Concert</p>

            <h2 className="text-xl font-semibold">{booking.concert?.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <p className="text-zinc-500 text-sm">Seats Selected</p>

              <p className="text-2xl font-bold mt-2">
                {booking.seats?.length || 0}
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <p className="text-zinc-500 text-sm">Total Price</p>

              <p className="text-2xl font-bold mt-2">€{booking.totalPrice}</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <p className="text-zinc-500 text-sm">Status</p>

              <p
                className={`text-2xl font-bold mt-2 ${
                  booking.status === "confirmed"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {booking.status}
              </p>
            </div>
          </div>

          {booking.status === "cancelled" ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
              <p className="text-red-400 font-semibold">Booking Cancelled</p>

              {booking.cancelReason && (
                <p className="text-zinc-300 mt-2">
                  Reason: {booking.cancelReason}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setShowCancel(true)}
                className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition font-semibold text-red-300"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      </div>
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

export default AdminEditBooking;
