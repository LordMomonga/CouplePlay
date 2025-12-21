import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { gameData } from "../data/actionVeriteData";
import { useLocation } from "react-router-dom";

type GameMode = keyof typeof gameData;

export const ActionOuVeriteGame = () => {
const location = useLocation();

 // 🔹 Setup joueurs
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const [mode, setMode] = useState<string>("");
  const [niveau, setNiveau] = useState<string>("");
  const [current, setCurrent] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");

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
    setCurrentPlayer(pickRandomPlayer());
    setCurrent(actions[Math.floor(Math.random() * actions.length)]);
  };

  const tirerVerite = () => {
    setCurrentPlayer(pickRandomPlayer());
    setCurrent(verites[Math.floor(Math.random() * verites.length)]);
  };

  // 🎲 Tirage joueur aléatoire
  const pickRandomPlayer = () => {
    const players = [player1, player2];
    return players[Math.floor(Math.random() * players.length)];
  };
  
  useEffect(() => {
  if (!gameStarted) return;

  // Initialisation du premier joueur
  setCurrentPlayer(pickRandomPlayer());
}, [gameStarted]);

  // 🧩 ÉCRAN AVANT JEU
  if (!gameStarted) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-red-400 via-rose-700 to-amber-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-6"
        >
          Qui joue ? 💕
        </motion.h1>

        <div className="w-full max-w-sm flex flex-col gap-4" >
          <input
            type="text"
            placeholder="Nom du joueur 1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="px-4 py-3 rounded-xl text-gray-900 outline-none bg-white/90"
          />

          <input
            type="text"
            placeholder="Nom du joueur 2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="px-4 py-3 rounded-xl text-gray-900 outline-none bg-white/90"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!player1 || !player2}
            onClick={() => setGameStarted(true)}
            className="
              mt-4 px-6 py-3 rounded-xl
              bg-gradient-to-r from-blue-600 to-blue-600
              font-bold text-white
              disabled:opacity-50
            "
          >
            Commencer 🎮
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-red-400 via-rose-700 to-amber-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
              {currentPlayer && (
        <motion.p
          key={currentPlayer}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4 text-xl font-bold text-gray-200"
        >
          🙂‍↕️ {currentPlayer}, toi !
        </motion.p>
      )}
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
