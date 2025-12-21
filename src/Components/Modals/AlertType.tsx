import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface AlertTypeProps {
  isOpen: boolean;
  title: string;
  mode: string;
  niveau: string;
  message: string;
  buttonText?: string;
  redirectTo: string;
  onClose: () => void;
}

const getLevelBadgeColor = (niveau: string) => {
  switch (niveau.toLowerCase()) {
    case "facile":
      return "bg-green-200 text-green-900";
    case "moyen":
      return "bg-yellow-200 text-yellow-900";
    case "difficile":
      return "bg-orange-200 text-orange-900";
    case "impossible":
      return "bg-red-200 text-red-900";
    default:
      return "bg-gray-200 text-gray-900";
  }
};

export const AlertType = ({
  isOpen,
  title,
  mode,
  niveau,
  message,
  buttonText = "Allons-y 🚀",
  redirectTo,
  onClose,
}: AlertTypeProps) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectTo, {
  state: {
    mode: mode.toLowerCase(),
    niveau,
  },
});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="
              w-[90%] max-w-md
              rounded-2xl
              bg-white dark:bg-gray-900
              p-6
              text-center
              shadow-2xl
              relative
            "
          >
            {/* Header */}
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {title}
            </h2>

            {/* Badges */}
            <div className="flex justify-center gap-3 mb-4">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="
                  px-3 py-1
                  rounded-full
                  text-xs font-semibold
                  bg-rose-100 text-rose-700
                "
              >
                🎮 {mode}
              </motion.span>

              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`
                  px-3 py-1
                  rounded-full
                  text-xs font-semibold
                  ${getLevelBadgeColor(niveau)}
                `}
              >
                ⚡ {niveau.toUpperCase()}
              </motion.span>
            </div>

            {/* Message */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {message}
            </p>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="
                  px-4 py-2 rounded-lg
                  bg-gray-200 dark:bg-gray-700
                  text-gray-800 dark:text-white
                  font-medium
                "
              >
                Annuler
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRedirect}
                className="
                  px-5 py-2 rounded-lg
                  bg-gradient-to-r from-rose-600 to-pink-600
                  text-white font-semibold
                  shadow-lg
                "
              >
                {buttonText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
