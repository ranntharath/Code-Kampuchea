import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useAuth } from "@/hooks/authHook"
import NavbarLogin from "./NavbarLogin"
import ChatContainer from "@/features/chat/components/ChatContainer"


function RootLayout() {
  const {isAuthenticated } = useAuth()
  
  return (
    <>
    {isAuthenticated ? <NavbarLogin/> : <Navbar/>}
        <Outlet/>
    <Footer/>
    <ChatContainer/>

    </>
  )
}

export default RootLayout