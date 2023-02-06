import { Navigate, Outlet } from "react-router-dom"
import { userAuth } from "../context/authContext/authContext"

export default function PublicRoutes() {
    const { currentUser } = userAuth()
    return (
        currentUser === null ? <Outlet /> : <Navigate to='/profile/chats' />
    )
}