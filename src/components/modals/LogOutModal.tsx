import { useState } from "react"
import { userAuth } from "../../context/authContext/authContext"

export default function LogOutModal({ sidebar }: { sidebar: boolean }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { logOut } = userAuth()

    function handleOpenModal() {
        setIsOpen(true)
    }
    function handleCloseModal() {
        setIsOpen(false)
    }
    function handleLogOut() {
        setLoading(true)
        try {
            logOut()
        } catch (error) {
            setLoading(false)
        }
    }
    return (
        <>{sidebar ?
            <div onClick={handleOpenModal} className="absolute bottom-0 w-full cursor-pointer block py-4 px-12 border-l-4 text-gray-600 hover:bg-gray-300 hover:text-black">
                <span className="inline-block align-text-bottom mr-2">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </span>
                Log Out
            </div>
            : <div onClick={handleOpenModal} className="cursor-pointer inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                <span className="block h-9 w-9 flex items-center justify-around rounded-full hover:bg-gray-400 p-1 rounded-full hover:bg-gray-400">
                    <span className="inline-block align-text-bottom ">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 22 22" className="w-5 h-5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </span>
                </span>
            </div>}
            {isOpen ?
                <div id="defaultModal" aria-hidden="true" className="flex h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={handleCloseModal}
                    ></div>

                    <div className="w-300px h-full max-w-2xl md:h-auto m-auto">

                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Log Out
                                </h3>
                                <button onClick={handleCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
                                <button disabled={loading} onClick={handleLogOut} type="button" className="transition duration-200 ease-in-out disabled:opacity-25 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log Out</button>
                                <button onClick={handleCloseModal} type="button" className="transition ease-in-out duration-200 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div> : null}
        </>
    )
}
