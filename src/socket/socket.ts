 import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/* ======================
   🔌 CONNECT SOCKET
====================== */
export const connectSocket = (token: string) => {
  if (socket) return socket; // ⚠️ empêche double connexion

  socket = io("https://couplezonebackend-production.up.railway.app", {
    auth: {
      token, // 👈 envoyé au backend (socket.handshake.auth.token)
    },
  });

  /* ===== EVENTS GLOBALS ===== */
  socket.on("connect", () => {
    console.log("🟢 Socket connecté :", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket déconnecté");
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket error :", err.message);
  });

  return socket;
};

/* ======================
   ❌ DISCONNECT SOCKET
====================== */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🛑 Socket fermé");
  }
};

/* ======================
   📡 GET SOCKET INSTANCE
====================== */
export const getSocket = () => socket;

export const sendActionVerite = (data: {
  type: "action" | "verite";
  niveau: string;
  players: string[];
}) => {
  socket?.emit("action-verite:play", data);
};

export const onActionVeriteResult = (cb: (data: any) => void) => {
  socket?.on("action-verite:result", cb);
};

