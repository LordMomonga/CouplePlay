import { motion } from "framer-motion";
import { useState } from "react";
import { AlertType } from "../Components/Modals/AlertType";

export const QuestionReponse = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const games = [
    
    {
      id: 1,
      title: "Qui de nous 2 ?",
      emoji: "🤔",
      description:
        "Des questions fun pour découvrir qui correspond le plus à chaque situation.",
      color: "from-emerald-500 to-teal-600",
      route: "/jeu/qui-de-nous-deux",
    },
    {
      id: 2,
      title: "A-t-il / Elle le droit ?",
      emoji: "⚖️",
      description:
        "Débattez sur les limites, les règles et les attentes dans votre relation.",
      color: "from-emerald-500 to-teal-600",
      route: "/jeu/qui-a-le-droit",
    },
  ];

  const handleSelectGame = (game: any) => {
    setSelectedGame(game);
    setShowAlert(true);
  };

  return (
    <motion.div
      className="
      rounded-xl
        min-h-screen px-4 py-6
        bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
        flex flex-col items-center
        text-white
        overflow-y-auto
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Titre */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold">
          Questions/Reponses 🎮
        </h1>
        <p className="text-white/70 mt-2">
          Amusement, débats et révélations garanties
        </p>
      </motion.div>

      {/* Cartes */}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="
              relative rounded-2xl p-6
              bg-white/10 backdrop-blur-xl
              border border-white/20
              shadow-xl
            "
          >
            {/* Dégradé décoratif */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-r ${game.color}`}
            />

            <div className="relative z-10">
              <h3 className="text-xl font-bold flex items-center gap-3 mb-2">
                <span className="text-3xl">{game.emoji}</span>
                {game.title}
              </h3>

              <p className="text-white/80 text-sm mb-4">
                {game.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectGame(game)}
                className="
                  px-6 py-2 rounded-xl
                  bg-white text-gray-900
                  font-semibold text-sm
                  shadow-md
                "
              >
                ▶ Jouer
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AlertType
        isOpen={showAlert}
        title={`🎮 ${selectedGame?.title}`}
        mode={selectedGame?.title || ""}
        niveau="Fun"
        message="Prêt à commencer ce jeu ? Assurez-vous d’être d’accord avec les règles avant de continuer."
        buttonText="Commencer 🚀"
        redirectTo={selectedGame?.route || "/"}
        onClose={() => setShowAlert(false)}
      />
    </motion.div>
  );
};
