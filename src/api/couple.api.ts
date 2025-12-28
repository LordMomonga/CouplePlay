import api from "./axios";

/* ======================
   💕 CRÉER UN COUPLE
====================== */
export const createCouple = async () => {
  const { data } = await api.post("/couple/create");
  return data;
};

/* ======================
   🔗 REJOINDRE UN COUPLE
====================== */
export const joinCouple = async (coupleCode: string) => {
  const { data } = await api.post("/couple/join", {
    coupleCode,
  });
  return data;
};

/* ======================
    🔍 OBTENIR LES INFOS DU COUPLE
====================== */
export const getCoupleInfo = async () => {
  const { data } = await api.get("/couple/myProfile");
  return data;
}
