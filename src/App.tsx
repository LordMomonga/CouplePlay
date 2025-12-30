import { Home } from "./pages/Home"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { MainLayout } from "./Components/Layout/MainLayout"
import { ChoicesFormatPdf } from "./pages/ChoicesFormatPdf"
import { ActionVerite } from "./pages/ActionVerite"
import { QuestionReponse } from "./pages/QuestionReponse"
import { DefisCouple } from "./pages/DefisCouple"
import { JeuxRole } from "./pages/JeuxRole"
import { JeuxRecent } from "./pages/JeuxRecent"
import { Profil } from "./pages/Profil"
import { ActionOuVeriteGame } from "./features/ActionOuVeriteGames.tsx"
import { Connexion } from "./pages/Connexion.tsx"
import { Inscription } from "./pages/Inscription.tsx"
import { QuestionReponses } from "./features/QuestionReponses.tsx"


function App() {

  return (
    <Routes>
      <Route element ={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/choices-format-pdf" element={<ChoicesFormatPdf />} />
        <Route path="/action-verite" element={<ActionVerite />} />
        <Route path="/questions-reponses" element={<QuestionReponse />} />
        <Route path="/defis-couple" element={<DefisCouple />} />
        <Route path="/jeu-de-roles" element={<JeuxRole />} />
        <Route path="/jeux-recent" element={<JeuxRecent />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/jeu/action-verite" element={<ActionOuVeriteGame />} />
        <Route path="/jeu/questions-reponses" element={<QuestionReponses />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        
      </Route>

    </Routes>
   
  )
}

export default App
