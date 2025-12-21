import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { gameData } from "../data/actionVeriteData";
import { useLocation } from "react-router-dom";

type GameMode = keyof typeof gameData;

export const ActionOuVeriteGame = () => {
const location = useLocation();


  const [mode, setMode] = useState<string>("");
  const [niveau, setNiveau] = useState<string>("");
  const [current, setCurrent] = useState<string | null>(null);

useEffect(() => {
    if (!location.state) return;

    const { mode, niveau } = location.state as {
      mode: string;
      niveau: string;
    };

    setMode(mode);
    setNiveau(niveau);
  }, [location.state]);

  const { actions, verites } = gameData[niveau as GameMode] || { actions: [], verites: [] };

  const tirerAction = () => {
    setCurrent(actions[Math.floor(Math.random() * actions.length)]);
  };

  const tirerVerite = () => {
    setCurrent(verites[Math.floor(Math.random() * verites.length)]);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-red-400 via-rose-700 to-amber-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Titre */}
      <h1 className="text-3xl font-bold mb-2">
        Action ou Vérité 🎲
      </h1>

      {/* Infos */}
      <p className="mb-6 text-white/80">
        Mode : <span className="font-semibold capitalize">{mode}</span> • Niveau :{" "}
        <span className="font-semibold">{niveau}</span>
      </p>

      {/* Carte */}
      <motion.div
        key={current}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160 }}
        className="bg-white/90 text-gray-900 rounded-2xl p-6 shadow-xl max-w-md w-full text-center mb-6"
      >
        {current ?? "Choisissez Action ou Vérité"}
      </motion.div>

      {/* Boutons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={tirerAction}
          className="px-6 py-3 rounded-xl bg-blue-600 font-bold shadow-lg"
        >
          🎯 Action
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={tirerVerite}
          className="px-6 py-3 rounded-xl bg-purple-600 font-bold shadow-lg"
        >
          💬 Vérité
        </motion.button>
      </div>
    </motion.div>
  );
};
