import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function MainHeader() {
    const [hamburgerMenu, setHamburgerMenu] = useState<boolean>(false)
    const url = useLocation()
    
    return (
        <div className="bg-gray-100">
            <header className="sticky top-0 z-30 w-full px-2 py-4 bg-white shadow-xl shadow-blue-600/20 sm:px-4">
                <div className="flex items-center justify-between mx-auto max-w-7xl">
                    <Link to="/">
                        <span className="text-2xl font-extrabold text-blue-600">ChatApp</span>
                    </Link>
                    <div className="md:flex hidden items-center space-x-1">
                        <ul className="hidden space-x-2 md:inline-flex">
                            <li><Link to="/" className={`px-4 py-2 font-semibold ${url.pathname==='/'?'text-black':'text-gray-600'} rounded`}>Log In</Link></li>
                            <li><Link to="/sign-up" className={`px-4 py-2 font-semibold ${url.pathname==='/sign-up'?'text-black':'text-gray-600'} rounded`}>Sign Up</Link></li>
                            <li><a href="https://github.com/ZaidRasheed/chat-app" className="px-4 py-2 font-semibold text-gray-600 rounded">Git Repo</a></li>
                        </ul>
                    </div>
                    <div className="md:hidden xs:flex items-center space-x-1">
                        {hamburgerMenu ?
                            <button onClick={() => setHamburgerMenu(prev => !prev)} className="self-end flex-none px-2 ml-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span className="sr-only">Close Menu</span>
                            </button> :
                            <button onClick={() => setHamburgerMenu(prev => !prev)} className="flex-none px-2 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                                </svg>
                                <span className="sr-only">Open Menu</span>
                            </button>}
                    </div>
                </div >
                {hamburgerMenu ?
                    <div className="fixed bg-white top-[55px] right-0 text-center w-full shadow-xl shadow-blue-600/20">
                        <ul className="md:hidden space-y-2 text-lg w-full pb-3">
                            <li><Link to="/" className="font-semibold text-gray-600 rounded">Log In</Link></li>
                            <li><Link to="/sign-up" className="font-semibold text-gray-600 rounded">Sign Up</Link></li>
                            <li><a href="https://github.com/ZaidRasheed/chat-app" className="font-semibold text-gray-600 rounded">Git Repo</a></li>
                        </ul>
                    </div> : null}
            </header >
        </div >
    )
}
