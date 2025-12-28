import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { createCouple, getCoupleInfo, joinCouple } from "../api/couple.api";
import { useEffect, useState } from "react";


export const Profil = () => {
  const navigate = useNavigate();

  /* ======== ==============
     🔐 AUTH (mock)
  ====================== */
const { user, logout, refreshUser } = useAuth();
const [coupleCode, setCoupleCode] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [myInfo, setMyInfo] = useState<any>(null);
 const [isJoinCouple, setIsJoinCouple] = useState(false);
const [checkingCouple, setCheckingCouple] = useState(true);


const handleGetCoupleInfo = async () => {
  try {
     setCheckingCouple(true);

    const data = await getCoupleInfo();
    setMyInfo(data);
    console.log("Infos du couple :", data);

    } catch (err) {
    console.error(err);
    } finally {
    setCheckingCouple(false);
    }
};


const isInCouple = myInfo?.couple;

const handleCreateCouple = async () => {
  try {
    const res = await createCouple();

    refreshUser();
    console.log(res.coupleCode);
  } catch (err) {
    console.error(err);
  }
};

const handleJoinCouple = async () => {
  if (!coupleCode) {
    setError("Veuillez entrer le code du couple");
    return;
  }

  try {
    setLoading(true);
    setError("");

    await joinCouple(coupleCode);

    await handleGetCoupleInfo(); // refresh infos
    await refreshUser();         // refresh auth user

    setIsJoinCouple(false);
    setCoupleCode("");
  } catch (err: any) {
    setError(err.response?.data?.message || "Code invalide");
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  handleGetCoupleInfo();
}, []);






 if (!user) {
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
        {checkingCouple && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg mb-6 flex flex-col items-center"
  >
    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-3" />
    <p className="text-white/70 text-sm">
      Vérification du couple en cours...
    </p>
  </motion.div>
)}

        
      {!checkingCouple && !isInCouple && (
  <div className="flex flex-col gap-3">
    <input
      type="text"
      placeholder="Code du couple"
      value={coupleCode}
      onChange={(e) => setCoupleCode(e.target.value)}
      className="px-4 py-2 rounded-xl text-black"
    />

    {error && <p className="text-red-400 text-sm">{error}</p>}

    <motion.button
      onClick= {() => setIsJoinCouple(true)

      }
    className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600"
    >
      🔗 Rejoindre un couple
    </motion.button>

    <motion.button
      onClick={handleCreateCouple}
      className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600"
    >
      ➕ Créer un couple
    </motion.button>
  </div>
)}
{!checkingCouple && isJoinCouple && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gray-900 text-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
    >
      <h3 className="text-lg font-semibold mb-4 text-center">
        🔗 Rejoindre un couple
      </h3>

      <input
        type="text"
        placeholder="Code du couple (ex: CPZ-ABCDE)"
        value={coupleCode}
        onChange={(e) => setCoupleCode(e.target.value)}
        className="w-full px-4 py-2 rounded-xl text-black mb-3 bg-white"
      />

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={() => setIsJoinCouple(false)}
          className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20"
        >
          Annuler
        </button>

        <button
          onClick={handleJoinCouple}
          disabled={loading}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600"
        >
          {loading ? "Connexion..." : "Rejoindre"}
        </button>
      </div>
    </motion.div>
  </div>
)}

     {isInCouple && (
  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-white/70">Statut</span>
      <span className="px-3 py-1 rounded-full bg-emerald-600 text-sm">
        En couple 💕
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-300">Code du couple</span>
      <span className="font-mono text-sm">
        {myInfo.couple.coupleCode}
      </span>
    </div>

    <motion.button
      className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600"
    >
      ⚙️ Gérer le couple
    </motion.button>
  </div>
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
          <StatCard label="Parties jouées" value={user.stats?.gamesPlayed || 0}  />
          <StatCard label="Défis réalisés" value={user.stats?.challengesDone || 0} />
          <StatCard label="Jeux différents" value={user.stats?.gamesTypes || 0} />
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

          <button 
          onClick={logout}
          className="w-full py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition">
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


