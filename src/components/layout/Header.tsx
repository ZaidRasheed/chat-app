import { useNavigate, useLocation } from "react-router-dom"
import { userAuth } from "../../context/authContext/authContext"
import AddUserModal from "../modals/AddUserModal"
import LogOutModal from "../modals/LogOutModal"
import ChangeStatusModal from "../modals/ChangeStatusModal"

export default function Header() {
    const { fireStoreUser } = userAuth()
    const navigate = useNavigate()
    const url = useLocation()
    const page = url.pathname.split(('/profile'))[1]

    return (
        <div className="py-4 xs:flex-2 xs:flex xs:flex-row ">
            <div className="flex-1">
                <span onClick={() => navigate('/profile/settings')} className="cursor-pointer xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                    <span className={`block h-7 w-7 sm:h-12 sm:w-12 flex items-center justify-around rounded-full hover:bg-gray-400 ${page === '/settings' ? 'bg-gray-300' : ''}`}>
                        <svg className="w-5 h-5 sm:h-6 sm:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </span>
                </span>
                <AddUserModal sideBar={false} />
                <span onClick={() => navigate('/profile/friends')} className="cursor-pointer xl:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                    <span className={`block h-7 w-7 sm:h-12 sm:w-12 flex items-center justify-around rounded-full hover:bg-gray-400 ${page === '/friends' ? 'bg-gray-300' : ''}`}>
                        <svg className="w-5 h-5 sm:h-6 sm:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                            </path>
                        </svg>
                    </span>
                </span>

                <span onClick={() => navigate('/profile/chats')} className="cursor-pointer xl:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                    <span className={`block h-7 w-7 sm:h-12 sm:w-12 flex items-center justify-around rounded-full hover:bg-gray-400 ${page === '/chats' ? 'bg-gray-300' : ''}`}>
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                            <path
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg>
                    </span>
                </span>
            </div>
            <div className="flex-1 text-right">
                <ChangeStatusModal currentStatus={fireStoreUser?.showOnlineStatus}/>
                <div className="xl:hidden inline">
                    <LogOutModal sidebar={false} />
                </div>
            </div>
        </div>
    )
}
