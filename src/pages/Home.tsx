import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Home = () => {
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const navigate = useNavigate();

  const modes = [
    {
      id: 1,
      title: "Action Vérité",
      description: "Choisissez entre des actions amusantes ou des vérités révélatrices.",
      color: "from-pink-400 to-pink-600",
      sign: "💕",
      link: "/action-verite",
    },
    {
      id: 2,
      title: "Questions Réponses",
      description: "Répondez à des questions pour mieux connaître votre partenaire.",
      color: "from-blue-400 to-blue-600",
      sign: "➡️",
      link: "/questions-reponses",
    },
    {
      id: 3,
      title: "Défis Couple ",
      description: "Relevez des défis romantiques pour pimenter votre relation.",
      color: "from-red-400 to-red-600",
      sign: "💏",
      link: "/defis-couple",
    },
    {
      id: 4,
      title: "Jeu de rôles ",
      description: "Incarnez des personnages et vivez des scénarios ensemble.",
      color: "from-purple-400 to-purple-600",
      sign: "🎭",
      link: "/jeu-de-roles",
    },
  ];

 const handlePlay = (modeId: number) => {
  if (selectedMode === modeId) {
    // Deuxième clic → navigation
    const mode = modes.find((m) => m.id === modeId);
    if (mode) navigate(mode.link);
  } else {
    // Premier clic → sélection
    setSelectedMode(modeId);
  }
};


  return (
    <motion.div
      className="flex flex-col items-center justify-between  bg-gray-50 dark:bg-gray-900 px-4 py-6 rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Titre */}
      <motion.div
        className="text-center mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Bienvenue sur CoupleZone 🎮
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Choisissez votre jeu et commencez l’aventure ❤️
        </p>
      </motion.div>

      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {modes.map((mode, index) => (
          <motion.div
            key={mode.id}
            onClick={() => handlePlay(mode.id)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`
              cursor-pointer rounded-2xl p-6 text-white shadow-xl
              bg-gradient-to-br ${mode.color}
              backdrop-blur-lg border border-white/20
              transition-all
              ${
                selectedMode === mode.id
                  ? "ring-4 ring-white scale-105"
                  : "opacity-90"
              }
            `}
          >
            <div className="flex items-center justify-center mb-4 text-3xl">
              <span className="bg-black/30 px-4 py-3 rounded-full">
                {mode.sign}
              </span>
            </div>

            <h2 className="text-xl font-bold text-center mb-2">
              {mode.title}
            </h2>

            <p className="text-center text-white/90 text-sm hidden md:block">
              {mode.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bouton jouer */}
    
    </motion.div>
  );
};
