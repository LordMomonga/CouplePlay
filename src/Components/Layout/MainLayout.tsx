import { Outlet } from "react-router-dom"
import  Navbar  from "../Navbar"
import { Footer } from "../Footer"
export const MainLayout = () => {
  return (
    <div className="">
        <Navbar />

        <main className="py-3 px-2 md:px-5 mt-16 mb-16 md:mb-20">
            <Outlet /> 
        </main>

        <Footer />
    </div>
  )
}
