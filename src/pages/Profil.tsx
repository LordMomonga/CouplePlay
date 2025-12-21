import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Profil = () => {
  const navigate = useNavigate();

  /* ======== ==============
     🔐 AUTH (mock)
  ====================== */
  const isAuthenticated = false;

  const user = {
    username: "Samuel",
    email: "samuel@email.com",
    avatar: "S",
    createdAt: "2024",
    stats: {
      gamesPlayed: 12,
      challengesDone: 48,
      gamesTypes: 6,
    },
    couple: {
      isConnected: true,
      partnerName: "Alex",
      coupleId: "CPZ-8493",
    },
  };

 if (!isAuthenticated) {
  return (
    <motion.div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br from-gray-900 via-gray-800 to-black
        text-white
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          w-full max-w-sm
          bg-white/10 backdrop-blur-xl
          rounded-2xl p-6
          shadow-xl text-center
        "
      >
        <h2 className="text-2xl font-bold mb-3">
          🔐 Connexion requise
        </h2>

        <p className="text-white/70 mb-6">
          Veuillez vous connecter ou créer un compte pour accéder à votre profil et jouer en couple 💕
        </p>

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/connexion")}
            className="
              w-full py-2 rounded-xl
              bg-gradient-to-r from-rose-600 to-pink-600
              font-semibold shadow-md
            "
          >
            Se connecter
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/inscription")}
            className="
              w-full py-2 rounded-xl
              bg-white/10 hover:bg-white/20
              font-semibold
            "
          >
            Créer un compte
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

  return (
    <motion.div
      className="
        min-h-screen px-4 py-6
        bg-gradient-to-br from-gray-900 via-gray-800 to-black
        text-white flex flex-col items-center
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ======================
          👤 PROFIL HEADER
      ====================== */}
      <motion.div
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-4xl font-bold shadow-lg">
            {user.avatar}
          </div>

          <h2 className="mt-4 text-xl font-bold">
            {user.username}
          </h2>

          <p className="text-sm text-white/70">
            {user.email}
          </p>

          <span className="mt-2 text-xs text-white/50">
            Membre depuis {user.createdAt}
          </span>
        </div>
      </motion.div>

      {/* ======================
          💑 COUPLE
      ====================== */}
      <motion.div
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">
          💕 Mon couple
        </h3>

        {user.couple ? (
          <>
            <div className="flex justify-between mb-3">
              <span className="text-white/70">Partenaire</span>
              <span className="font-semibold">
                {user.couple.partnerName}
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-white/70">Statut</span>
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-sm">
                Connecté
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-white/70">ID du couple</span>
              <span className="text-xs text-white/60">
                {user.couple.coupleId}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                w-full py-2 rounded-xl
                bg-gradient-to-r from-emerald-600 to-teal-600
                font-semibold shadow-md
              "
            >
              Gérer le couple
            </motion.button>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full py-2 rounded-xl
              bg-gradient-to-r from-rose-600 to-pink-600
              font-semibold shadow-md
            "
          >
            ➕ Créer ou rejoindre un couple
          </motion.button>
        )}
      </motion.div>

      {/* ======================
          📊 STATISTIQUES
      ====================== */}
      <motion.div
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">
          📊 Statistiques
        </h3>

        <div className="grid grid-cols-2 gap-4 text-center">
          <StatCard label="Parties jouées" value={user.stats.gamesPlayed} />
          <StatCard label="Défis réalisés" value={user.stats.challengesDone} />
          <StatCard label="Jeux différents" value={user.stats.gamesTypes} />
          <StatCard label="Complicité" value="❤️" />
        </div>
      </motion.div>

      {/* ======================
          ⚙️ MON COMPTE
      ====================== */}
      <motion.div
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">
          ⚙️ Mon compte
        </h3>

        <div className="flex flex-col gap-3">
          <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
            ✏️ Modifier mes informations
          </button>

          <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
            🔔 Préférences & notifications
          </button>

          <button className="w-full py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition">
            🚪 Se déconnecter
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ======================
   🧩 COMPONENT
====================== */
const StatCard = ({ label, value }: { label: string; value: any }) => (
  <div className="bg-white/10 rounded-xl p-3">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-xs text-white/70">{label}</p>
  </div>
);
