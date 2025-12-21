import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Connexion = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: brancher backend
    console.log({ email, password });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          🔐 Connexion
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/90 text-gray-900 outline-none"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/90 text-gray-900 outline-none"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="mt-2 py-3 rounded-xl
            bg-gradient-to-r from-rose-600 to-pink-600
            font-semibold shadow-md"
          >
            Se connecter
          </motion.button>
        </div>

        <p className="mt-6 text-center text-sm text-white/70">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate("/inscription")}
            className="text-rose-400 font-semibold cursor-pointer"
          >
            Inscription
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};
