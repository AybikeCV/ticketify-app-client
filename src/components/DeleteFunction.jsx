import { motion } from "framer-motion";

function DeleteFunction({
  isOpen,
  onClose,
  onConfirm,
  title,
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
          Delete {title}?
        </h2>

        <p className="text-zinc-400 mt-3">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4 mt-8">

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
            Delete
          </button>

        </div>

      </motion.div>

    </div>
  );
}

export default DeleteFunction;