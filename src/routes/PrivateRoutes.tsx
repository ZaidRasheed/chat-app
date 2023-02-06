import { Navigate, Outlet } from "react-router-dom"
import { userAuth } from "../context/authContext/authContext"

export default function PrivateRoutes() {
    const { currentUser } = userAuth()
    return (
        currentUser === null ? <Navigate to='/' /> : <Outlet />
    )
}