import { loginSuccess, logout } from "@/redux/slices/authSlice"
import type { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"

const useAuth =()=>{
    const dispatch = useDispatch()
    const {token, isAuthenticated} = useSelector((state:RootState)=>state.auth)


    const handleSetToken = (token:string)=>{
        dispatch(loginSuccess(token));
    }
    const handleLogout = ()=>{
            dispatch(logout());
    }
    return {token,isAuthenticated, handleSetToken,handleLogout}
}

export  {useAuth,}