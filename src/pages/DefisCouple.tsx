import { motion } from "framer-motion";
import { useState } from "react";
import { AlertType } from "../Components/Modals/AlertType";

export const DefisCouple = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedDefi, setSelectedDefi] = useState<any>(null);

  const defisCouple = [
    {
      id: 1,
      title: "Complicité",
      emoji: "🤝",
      description:
        "Renforcez votre connexion avec des défis de confiance et d’écoute.",
      niveau: "facile",
      route: "/jeu/defis-complicite",
    },
    {
      id: 2,
      title: "Fun & Rires",
      emoji: "😂",
      description:
        "Des défis légers et amusants pour rire ensemble.",
      niveau: "moyen",
      route: "/jeu/defis-fun",
    },
    {
      id: 3,
      title: "Intimité",
      emoji: "💞",
      description:
        "Des défis plus personnels pour renforcer l’intimité.",
      niveau: "difficile",
      route: "/jeu/defis-intimite",
    },
    {
      id: 4,
      title: "Extrême",
      emoji: "🔥",
      description:
        "Des défis audacieux pour les couples aventureux.",
      niveau: "impossible",
      route: "/jeu/defis-extreme",
    },
  ];

  const handleSelectDefi = (defi: any) => {
    setSelectedDefi(defi);
    setShowAlert(true);
  };

  return (
    <motion.div
      className="
        min-h-screen px-4 py-6
        bg-gradient-to-br from-red-400 via-rose-700 to-amber-900
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
          Défis Couple 💑
        </h1>
        <p className="text-white/80 mt-2">
          Relevez les défis ensemble
        </p>
      </motion.div>

      {/* Cartes */}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {defisCouple.map((defi, index) => (
          <motion.div
            key={defi.id}
            initial={{ opacity: 0, y: 60 }}
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
            {/* Aura */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-400/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold flex items-center gap-3 mb-2">
                <span className="text-3xl">{defi.emoji}</span>
                {defi.title}
              </h3>

              <p className="text-white/80 text-sm mb-4">
                {defi.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectDefi(defi)}
                className="
                  px-6 py-2 rounded-xl
                  bg-gradient-to-r from-red-700 to-red-700
                  font-semibold text-sm
                  shadow-lg
                "
              >
                ▶ Lancer le défi
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AlertType
        isOpen={showAlert}
        title={`💑 ${selectedDefi?.title}`}
        mode={selectedDefi?.title || ""}
        niveau={selectedDefi?.niveau || ""}
        message="Êtes-vous prêts à relever ce défi ensemble ?"
        buttonText="C’est parti 💪"
        redirectTo={selectedDefi?.route || "/"}
        onClose={() => setShowAlert(false)}
      />
    </motion.div>
  );
};
