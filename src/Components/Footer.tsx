import { useEffect } from 'react'
import { BiMoon } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'


export const Footer = () => {
const [scrollClass, setScrollClass] = useState("");

useEffect(() => {
    const handleScroll = () => {

      if (window.scrollY > 10) {
        setScrollClass(
          "backdrop-blur-xl bg-light/50 dark:bg-dark/50 rounded-full mx-auto my-1 !w-[calc(100vw-20px)] !border-white dark:!border-gray-500"
        );
      } else {
        setScrollClass("");
      }
    
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
        console.log(scrollClass);


}, [])


  return (
    <div className="flex justify-center w-full">
      <div
        className={`max-w-7xl m-auto h-14 fixed top-0 z-40 ${scrollClass} border-b border-transparent flex justify-between items-center px-4 md:px-5 w-screen transition-all`}
      >
        <NavLink to="/" className="">
          <FaBars className="text-xl" />
        </NavLink>
        <div className='text-[10px]'>
          <NavLink to="/" >
            <span className='text-3xl'>Couple</span><span className='text-xl font-bold'>Zone💕</span>

          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <IoIosNotifications className="text-2xl" />
          </div>
          <div>
            <BiMoon className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
