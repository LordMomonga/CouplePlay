import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login as loginApi } from "../api/auth.service";
import { useAuth } from "../auth/AuthContext";

export const Connexion = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ CONTEXT

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    console.log("Tentative de connexion avec :", { email, password });
    try {
      setLoading(true);
      setError("");

      const res = await loginApi({ email, password });

      /**
       * res.data doit être de la forme :
       * {
       *   user: { username, email },
       *   token: "jwt"
       * }
       */
      console.log(res, "response data from login");
      
      login({
  user: { 
    _id: res.data.user._id,
    username: res.data.user.username, 
    email: res.data.user.email, 
    avatar: res.data.user.avatar,
    stats: res.data.user.stats,
    couple: res.data.user.couple, 
    createdAt: res.data.user.createdAt,
    updatedAt: res.data.user.updatedAt,} ,
  token: res.data.token,
});

      navigate("/profil"); // ✅ maintenant le profil sera affiché
    } catch (err: any) {
      setError(err.response?.data?.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  /* 🔒 Bloquer le scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="
        h-screen flex items-center justify-center px-4
        bg-gradient-to-br from-gray-900 via-gray-800 to-black
        text-white overflow-hidden
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          🔐 Connexion
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/90 text-gray-900 outline-none"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/90 text-gray-900 outline-none"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            onClick={handleLogin}
            disabled={loading}
            className={`
              mt-2 py-3 rounded-xl font-semibold shadow-md
              ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-rose-600 to-pink-600"}
            `}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </motion.button>
        </div>

        <p className="mt-6 text-center text-sm text-white/70">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate("/inscription")}
            className="text-rose-400 font-semibold cursor-pointer"
          >
            Inscription
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};
