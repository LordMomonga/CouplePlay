import { motion } from "framer-motion";

export const Profil = () => {
  return (
    <motion.div
      className="
        min-h-screen px-4 py-6
        bg-gradient-to-br from-gray-900 via-gray-800 to-black
        text-white
        flex flex-col items-center
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header profil */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl mb-6"
      >
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-4xl font-bold shadow-lg">
            S
          </div>

          {/* Nom */}
          <h2 className="mt-4 text-xl font-bold">
            Samuel
          </h2>

          <p className="text-sm text-white/70">
            Membre CoupleZone 💕
          </p>
        </div>
      </motion.div>

      {/* Couple */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg mb-6"
      >
        <h3 className="text-lg font-semibold mb-3">
          💑 Mon couple
        </h3>

        {/* État */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70">
            Statut
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-sm font-semibold">
            Connecté
          </span>
        </div>

        {/* Partenaire */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70">
            Partenaire
          </span>
          <span className="font-semibold">
            💖 Alex
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            w-full py-2 rounded-xl
            bg-gradient-to-r from-emerald-600 to-teal-600
            font-semibold
            shadow-md
          "
        >
          Gérer le couple
        </motion.button>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg mb-6"
      >
        <h3 className="text-lg font-semibold mb-4">
          📊 Statistiques
        </h3>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-white/70">Parties jouées</p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">48</p>
            <p className="text-xs text-white/70">Défis réalisés</p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">6</p>
            <p className="text-xs text-white/70">Jeux différents</p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-2xl font-bold">❤️</p>
            <p className="text-xs text-white/70">Complicité</p>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">
          ⚙️ Paramètres
        </h3>

        <div className="flex flex-col gap-3">
          <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
            ✏️ Modifier le profil
          </button>

          <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
            🔔 Préférences de jeu
          </button>

          <button className="w-full py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition">
            🚪 Se déconnecter
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
