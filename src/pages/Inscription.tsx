import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Inscription = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log({ username, email, password });
  };

    useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="
        h-screen overflow-hidden
        flex items-start py-15 justify-center
        bg-gradient-to-br from-gray-900 via-gray-800 to-black
        text-white px-4
        rounded-2xl
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ===== CARD ===== */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          w-full max-w-md
          bg-white/10 backdrop-blur-xl
          rounded-2xl p-6
          shadow-2xl
        "
      >
        <h1 className="text-2xl font-bold text-center mb-6">
           Créer un compte
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/90 text-gray-900 outline-none"
          />

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
            onClick={handleRegister}
            className="
              mt-2 py-3 rounded-xl
              bg-gradient-to-r from-emerald-600 to-teal-600
              font-semibold shadow-lg
            "
          >
            Créer mon compte 
          </motion.button>
        </div>

        <p className="mt-6 text-center text-sm text-white/70">
          Déjà un compte ?{" "}
          <span
            onClick={() => navigate("/connexion")}
            className="text-emerald-400 font-semibold cursor-pointer"
          >
            Se connecter
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};
