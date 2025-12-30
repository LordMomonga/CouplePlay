import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { gameData } from "../data/actionVeriteData";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getSocket } from "../socket/socket";

type GameMode = keyof typeof gameData;
type GameType = "offline" | "online" | null;

export const ActionOuVeriteGame = () => {
  const location = useLocation();
  const { user } = useAuth();

  // ======================
  // 🎮 MODE DE JEU
  // ======================
  const [gameType, setGameType] = useState<GameType>(null);

  // ======================
  // 👥 JOUEURS
  // ======================
  const [player1, setPlayer1] = useState(user?.username || "");
  const [player2, setPlayer2] = useState("");
  const [playersOnline, setPlayersOnline] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  // ======================
  // 🧠 JEU
  // ======================

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [niveau, setNiveau] = useState("");
  const [question, setQuestion] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [waitingMessage, setWaitingMessage] = useState<string>("");

  // ======================
  // 📍 PARAMÈTRES
  // ======================
  useEffect(() => {
    if (!location.state) return;
    const { niveau } = location.state as any;
    setNiveau(niveau);
  }, [location.state]);

  // ======================
  // 🌐 SOCKET ONLINE
  // ======================
  useEffect(() => {
    if (gameType !== "online") return;
    const socket = getSocket();
    if (!socket) return;

    // Recevoir la liste des joueurs connectés
    socket.on("game:players", (list: string[]) => {
      setPlayersOnline(list);
      if (list.length < 2) setWaitingMessage("En attente d'un autre joueur...");
      else setWaitingMessage("");
    });

    // Quand le jeu démarre
    socket.on("game:started", () => {
      setGameStarted(true);
      setWaitingMessage("");
    });

    // Résultat action ou vérité
    socket.on("action-verite:result", (data: any) => {
      setQuestion(data.question);
      setCurrentPlayer(data.player);
    });

    return () => {
      socket.off("game:players");
      socket.off("game:started");
      socket.off("action-verite:result");
    };
  }, [gameType]);

  // ======================
  // 🎯 LOGIQUE OFFLINE
  // ======================
  const playOffline = (type: "action" | "verite") => {
    const data = gameData[niveau as GameMode];
    if (!data) return;

    const list = type === "action" ? data.actions : data.verites;
    const players = [player1, player2];

    setQuestion(list[Math.floor(Math.random() * list.length)]);
    setCurrentPlayer(players[Math.floor(Math.random() * players.length)]);
  };

  // ======================
  // 🌐 LOGIQUE ONLINE
  // ======================
  const playOnline = (type: "action" | "verite") => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("action-verite:play", {
      type,
      niveau,
      players: [player1, player2],
    });
  };

  const play = (type: "action" | "verite") => {
    if (gameType === "offline") playOffline(type);
    if (gameType === "online") playOnline(type);
  };

  // ======================
  // 🧩 ÉCRAN CHOIX MODE
  // ======================
  if (!gameType) {
    return (
      <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-800 text-white gap-6">
        <h1 className="text-3xl font-bold">Comment voulez-vous jouer ? 🎮</h1>

        <button
          onClick={() => setGameType("offline")}
          className="px-6 py-3 rounded-xl bg-white text-black font-bold"
        >
          📴 Offline (même téléphone)
        </button>

        <button
          onClick={() => setGameType("online")}
          className="px-6 py-3 rounded-xl bg-black/40 border border-white font-bold"
        >
          🌐 Online (à distance)
        </button>
      </motion.div>
    );
  }

  // ======================
  // 🧩 ÉCRAN JOUEURS
  // ======================
  if (!gameStarted) {
    return (
      <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-pink-700 text-white gap-4">
        <h2 className="text-2xl font-bold">Qui joue ? 💕</h2>

        {!user && (
          <input
            placeholder="Joueur 1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="px-4 py-2 rounded-xl text-black bg-white/80"
          />
        )}

       {gameType === "offline" && (
            <div>
            <div className="mb-2 ">joueur 1: <span className="font-bold text-blue-900"> {user?.username} (vous)</span></div>
                  <input
            placeholder=" entrer le Joueur 2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="px-4 py-2 rounded-xl text-black bg-white/80"
          />
            </div>
        
        )}

        {gameType === "online" && (
          <div className="flex flex-col items-center">
            <p>Joueurs connectés :</p>
            <ul>
              {playersOnline.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
            {waitingMessage && <p>{waitingMessage}</p>}
          </div>
        )}

        <button
          onClick={() => {
            if (gameType === "online") getSocket()?.emit("game:start");
            else setGameStarted(true);
          }}
          disabled={gameType === "offline" && (!player1 || !player2)}
          className="px-6 py-3 rounded-xl bg-black/50 font-bold"
        >
          Commencer 🎮
        </button>
      </motion.div>
    );
  }

  // ======================
  // 🎮 JEU
  // ======================
  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-600 to-amber-800 text-white gap-6">
      <h1 className="text-3xl font-bold">Action ou Vérité 🎲</h1>

      {currentPlayer && (
        <p className="text-xl font-bold">👉 {currentPlayer} joue</p>
      )}

      <div className="bg-white text-black p-6 rounded-xl max-w-md w-full text-center">
        {question ?? "Choisissez Action ou Vérité"}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => play("action")}
          className="px-6 py-3 bg-blue-600 rounded-xl font-bold"
        >
          🎯 Action
        </button>

        <button
          onClick={() => play("verite")}
          className="px-6 py-3 bg-purple-600 rounded-xl font-bold"
        >
          💬 Vérité
        </button>
      </div>
    </motion.div>
  );
};
