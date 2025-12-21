import React from "react";
import { motion } from "framer-motion";

export const ActionVerite = () => {
  const modeDeJeu = [
    {
      id: 1,
      title: "classique",
      emoji: "🎲",
      description:
        "Le mode classique d'Action ou Vérité avec des questions et des actions amusantes.",
      niveau: "facile",
    },
    {
      id: 2,
      title: "audacieux",
      emoji: "🔥",
      description:
        "Un mode plus audacieux pour les couples prêts à relever des défis plus intenses.",
      niveau: "moyen",
    },
    {
      id: 3,
      title: "excitant",
      emoji: "💓",
      description:
        "Ayez le cœur qui bat la chamade avec des actions et des questions excitantes.",
      niveau: "difficile",
    },
    {
      id: 4,
      title: "pervers",
      emoji: "😈",
      description:
        "Pour les couples aventureux, ce mode propose des actions et des questions plus osées.",
      niveau: "impossible",
    },
  ];

  const getLevelBadgeColor = (niveau: string) => {
    switch (niveau) {
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

  return (
    <motion.div
      className="flex flex-col items-center h-screen rounded-xl bg-gradient-to-br from-red-400 via-rose-700 to-amber-900 px-4 py-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Titre */}
      <motion.div
        className="text-center mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          ACTION OU VÉRITÉ 🎲
        </h1>
        <p className="text-white/80 mt-2">Défiez-vous 🔥</p>
      </motion.div>

      <h2 className="text-lg sm:text-xl font-semibold text-white/90 mb-4">
        Modes de jeu
      </h2>

      {/* Cartes */}
      <div className="flex flex-col gap-5 w-full max-w-3xl">
        {modeDeJeu.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 60, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative overflow-hidden
              rounded-2xl p-5
              bg-white/90 dark:bg-gray-900/80
              backdrop-blur-xl
              shadow-lg
              border border-white/20
            "
          >
            {/* Glow décoratif */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-400/30 rounded-full blur-2xl" />

            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg text-gray-200 font-bold uppercase flex items-center gap-2">
                <span className="text-2xl">{mode.emoji}</span>
                {mode.title}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelBadgeColor(
                  mode.niveau
                )}`}
              >
                {mode.niveau.toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {mode.description}
            </p>

            {/* Bouton */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-full md:w-auto
                px-5 py-2
                rounded-xl
                bg-gradient-to-r from-rose-600 to-pink-600
                text-white font-semibold text-sm
                shadow-md
                hover:shadow-xl
              "
            >
              ▶ Jouer
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
