import { motion } from "framer-motion";

function DeleteFunction({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  showInput,
  inputValue,
  setInputValue,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md"
      >

        <h2 className="text-2xl font-bold text-zinc-100">
          {title}
        </h2>

        <p className="text-zinc-400 mt-3">
          {message}
        </p>

        {/* ✅ INPUT FIELD FOR REASON */}
        {showInput && (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write your reason..."
            className="w-full mt-4 h-28 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100"
          />
        )}

        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
          >
            Confirm
          </button>

        </div>

      </motion.div>
    </div>
  );
}

export default DeleteFunction;