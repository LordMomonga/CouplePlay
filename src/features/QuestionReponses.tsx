import { motion } from "framer-motion";
import { useState } from "react";
import { getSocket } from "../socket/socket";
import { useAuth } from "../auth/AuthContext";
import { gameData } from "../data/QuiDeNous2";

type GameType = "offline" | "online" | null;
type Answer = "moi" | "pas-moi";

export const QuestionReponses = () => {
  const { user } = useAuth();
const [remainingQuestions, setRemainingQuestion]= useState<string[]>([...gameData]);
const [currentQuestion, setCurrentQuestion]= useState<string | null>(null);
  const [player1Score, setPlayer1Score] = useState(0);
const [answer, setAnswer]= useState<string[]>([]);

  // ======================
  // 🎮 MODE DE JEU
  // ======================
    const [gameType, setGameType] = useState<GameType>(null);
  
const nextQuestion = () => {
    if(remainingQuestions.length ===0){
        setCurrentQuestion("Plus de questions disponibles !");
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const question = remainingQuestions[randomIndex];
    setCurrentQuestion(question);

    setRemainingQuestion(prev => 
        prev.filter((q) => q !== question)
    );
}

const handleAnswer = (ans: Answer) => {
    setAnswer((prev) => [...prev, ans]);
    if (ans === "moi") {
        setPlayer1Score((prev) => prev + 1);
    } 

    nextQuestion();}

    if(!currentQuestion && remainingQuestions.length >0){
        nextQuestion();
    }

if (!currentQuestion && remainingQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h2 className="text-2xl font-bold">🎉 Jeu terminé !</h2>
      </div>
    );
  }


 
 // ======================
  // 👥 JOUEURS
  // ======================
  const [player1, setPlayer1] = useState(user?.username || "");
  const [player2, setPlayer2] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const playersOnline= useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);


  // ======================
  // 🧠 JEU
  // ======================
  

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentPlayer="";
  const waitingMessage="";


  if (!gameType) {
    return (
      <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-800 text-white gap-6">
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
   if (!gameStarted) {
    return (
      <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700 text-white gap-4">
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

  if(gameType === "online" && gameStarted == true){
    return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 text-white gap-6">
      <h1 className="text-3xl font-bold">Qui de nous deux  👫</h1>

      {currentPlayer && (
        <p className="text-xl font-bold">👉 {currentPlayer} joue</p>
      )}

      <div className="bg-white text-black p-6 rounded-xl max-w-md w-full text-center">
        {currentQuestion ?? "Qui de nous deux ??"}
      </div>

       <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer("moi")}
            className="px-6 py-3 rounded-xl bg-emerald-500 font-semibold"
          >
            👤 Moi
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer("pas-moi")}
            className="px-6 py-3 rounded-xl bg-rose-500 font-semibold"
          >
            ❤️ Pas moi
          </motion.button>
        </div>

    </motion.div>
  );
}

return(
    <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 text-white gap-6">
      <h1 className="text-3xl font-bold">Qui de nous deux  👫</h1>

      <div className="flex gap-6 bg-white/10 px-6 py-3 rounded-xl">
  <div className="text-center">
    <p className="text-sm opacity-70">{player1 || "Joueur 1"}</p>
    <p className="text-2xl font-bold">{player1Score}</p>
  </div>

  <div className="text-center">
    <p className="text-sm opacity-70">{player2 || "Joueur 2"}</p>
    <p className="text-2xl font-bold">{answer.length - player1Score}</p>
  </div>
</div>


      <div className="bg-white text-black p-6 rounded-xl max-w-md w-full text-center">
        {currentQuestion ?? "Qui de nous deux ??"}
      </div>

       <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer("moi")}
            className="px-6 py-3 rounded-xl bg-emerald-500 font-semibold"
          >
            👤 {user?.username || player1}
          </motion.button>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer("pas-moi")}
            className="px-6 py-3 rounded-xl bg-blue-500 font-semibold"
          >
               👤 {player2}
          </motion.button>

         
        </div>

    </motion.div>
)

};
