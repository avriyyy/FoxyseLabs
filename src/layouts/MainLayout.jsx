import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-pink-neon selection:text-white">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}
