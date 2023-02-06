import Avatar from '../UI/Avatar'
import { useNavigate, useLocation } from 'react-router-dom'
import { userAuth } from '../../context/authContext/authContext'
import AddUserModal from '../modals/AddUserModal'
import LogOutModal from '../modals/LogOutModal'

export default function SideBar() {
    const { fireStoreUser: user } = userAuth()
    const navigate = useNavigate()
    const url = useLocation()
    const page = url.pathname.split(('/profile'))[1]

    return (
        <div className="hidden xl:block sm:flex-2 w-64 bg-gray-200 relative">
            <div className="user-profile text-center">
                <div className="grid place-items-center w-32 h-32 rounded-full m-auto mt-16 border-2 border-white bg-white shadow-lg">
                    <Avatar
                        name={`${user?.firstName} ${user?.lastName}`}
                        url={user?.profilePictureURL}
                        size="4" />
                </div>
                <div className="text-gray-800 mt-8 text-3xl font-medium">
                    {user?.firstName} {user?.lastName}
                </div>
            </div>

            <div className="menu mt-8">
                <div onClick={() => navigate('./chats')} className={`cursor-pointer block py-4 px-12 border-l-4 ${page === '/chats' ? 'border-gray-800 bg-gray-300 text-black' : 'text-gray-600'} hover:bg-gray-300 hover:text-black`}>
                    <span className="inline-block align-text-bottom mr-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </span>
                    Chat
                </div>
                <div onClick={() => navigate('./friends')} className={`cursor-pointer block py-4 px-12 border-l-4 ${page === '/friends' ? 'border-gray-800 bg-gray-300 text-black' : 'text-gray-600'} hover:bg-gray-300 hover:text-black`}>
                    <span className="inline-block align-text-bottom mr-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                        </path></svg>
                    </span>
                    Friends
                </div>

                <AddUserModal sideBar={true} />

                <div onClick={() => navigate('./settings')} className={`cursor-pointer block py-4 px-12 border-l-4 ${page === '/settings' ? 'border-gray-800 bg-gray-300 text-black' : 'text-gray-600'} hover:bg-gray-300 hover:text-black`}>
                    <span className="inline-block align-text-bottom mr-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </span>
                    Settings
                </div>
            </div>

            <LogOutModal sidebar={true} />
        </div>
    )
}

