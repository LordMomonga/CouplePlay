import { motion } from "framer-motion";
import { useState } from "react";
import { AlertType } from "../Components/Modals/AlertType";

export const JeuxRole = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const jeuxDeRole = [
    {
      id: 1,
      title: "Romantique",
      emoji: "💌",
      description:
        "Des scénarios doux et complices pour renforcer l’intimité.",
      niveau: "facile",
      route: "/jeu/role-romantique",
    },
    {
      id: 2,
      title: "Séduction",
      emoji: "💋",
      description:
        "Flirt, regards et situations de séduction intenses.",
      niveau: "moyen",
      route: "/jeu/role-seduction",
    },
    {
      id: 3,
      title: "Fantaisie",
      emoji: "🧙‍♂️",
      description:
        "Incarnez des personnages dans des univers imaginaires.",
      niveau: "difficile",
      route: "/jeu/role-fantaisie",
    },
    {
      id: 4,
      title: "Interdit",
      emoji: "😈",
      description:
        "Scénarios osés réservés aux couples aventureux.",
      niveau: "impossible",
      route: "/jeu/role-interdit",
    },
  ];

  const handleSelectRole = (role: any) => {
    setSelectedRole(role);
    setShowAlert(true);
  };

  return (
    <motion.div
      className="
        min-h-screen px-4 py-6
        bg-gradient-to-br from-purple-900 via-black to-fuchsia-900
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
          Jeu de rôle 🎭
        </h1>
        <p className="text-white/70 mt-2">
          Incarnez, imaginez, ressentez
        </p>
      </motion.div>

      {/* Cartes */}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {jeuxDeRole.map((role, index) => (
          <motion.div
            key={role.id}
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
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-fuchsia-500/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold flex items-center gap-3 mb-2">
                <span className="text-3xl">{role.emoji}</span>
                {role.title}
              </h3>

              <p className="text-white/80 text-sm mb-4">
                {role.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectRole(role)}
                className="
                  px-6 py-2 rounded-xl
                  bg-gradient-to-r from-fuchsia-600 to-pink-600
                  font-semibold text-sm
                  shadow-lg
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
        title={`🎭 ${selectedRole?.title}`}
        mode={selectedRole?.title || ""}
        niveau={selectedRole?.niveau || ""}
        message="Prêt à entrer dans un rôle ? Laissez parler votre imagination."
        buttonText="Entrer dans le rôle 🎬"
        redirectTo={selectedRole?.route || "/"}
        onClose={() => setShowAlert(false)}
      />
    </motion.div>
  );
};
