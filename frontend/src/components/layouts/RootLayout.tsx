import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useAuth } from "@/hooks/authHook"
import NavbarLogin from "./NavbarLogin"


function RootLayout() {
  const {isAuthenticated } = useAuth()
  
  return (
    <>
    {isAuthenticated ? <NavbarLogin/> : <Navbar/>}
        <Outlet/>
    <Footer/>

    </>
  )
}

export default RootLayout