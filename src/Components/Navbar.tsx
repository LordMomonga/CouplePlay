import { BiHomeAlt, BiJoystick } from "react-icons/bi"; 
import { AiOutlineUser } from "react-icons/ai";
import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";



export interface NavItem {
  link: string;
  icon: IconType;
  name: string;
  center?: boolean;
}

const nav: NavItem[] = [
  { link: "/", icon: BiHomeAlt, name: "Accueil" },
  { link: "/jeux-recent", icon: BiJoystick, name: "Jouer" },
  { link: "/profil", icon: AiOutlineUser, name: "Profil" },
];

export default function Navbar() {
  return (
    <div className="flex justify-center w-full f">
      <nav className="fixed z-20 w-full border-t border-gray-800 rounded-t-lg 
                      md:rounded-lg sm:max-w-2xl mx-3 grid grid-cols-3 gap-3 
                      bg-white shadow-card dark:shadow-none dark:bg-dark-accent/50 
                      backdrop-blur-md p-2 dark:backdrop-blur-md duration-300 bottom-0 sm:bottom-3">
        {nav.map((item: NavItem) => {
          const Icon = item.icon; // récupère le composant icône dynamiquement
          return (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 rounded-lg transition-all
                 ${isActive ? "bg-primary text-blue-500" : "text-gray-800 hover:bg-gray-700 dark:text-gray-800 hover:text-blue-500 dark:hover:bg-gray-8 00"}`
              }
            >
              <Icon size={24} />
              <span className="text-sm mt-1">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
