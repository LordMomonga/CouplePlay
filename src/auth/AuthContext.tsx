import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { disconnectSocket,  connectSocket} from "../socket/socket";

type User = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  couple: {
    _id: string;
    coupleCode: string;
    users: string[]; // ou User[] si tu peupler les utilisateurs
  } | null;
  stats: {
    gamesPlayed: number;
    challengesDone: number;
    gamesTypes: number;
  };
  createdAt: string;
  updatedAt: string;
};

type LoginResponse = {
  user: User;
  token: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
refreshUser: () => Promise<void>;

};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });
  

  const login = (data: LoginResponse) => {
    
    setUser(data.user);
  setToken(data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // 🔌 Gestion automatique du socket selon le token
useEffect(() => {
  if (token) {
    connectSocket(token);
    console.log("Socket connected with token:", token); 
  } else {
    disconnectSocket();
  }

  // Nettoyage à la destruction du provider
  return () => {
    disconnectSocket();
  };
}, [token]);

  
 const refreshUser = async () => {
  const { data } = await api.get("/api/me");
  setUser(data.user);
};


  // 🔄 Restore session on refresh (si token change)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch {
      setUser(null);
      setToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook sécurisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("AuthContext:", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
