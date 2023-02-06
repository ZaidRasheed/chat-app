import useAddUser from "../../hooks/useAddUser"

export default function AddUserModal({ sideBar }: { sideBar: boolean }) {
    const {
        isOpen,
        error,
        closeErrorAlert,
        success,
        closeSuccessAlert,
        handleOpenModal,
        handleCloseModal,
        userIdRef,
        loading,
        handleAddUser
    } = useAddUser()

    return (
        <>
            {sideBar ? <div onClick={handleOpenModal} className={`cursor-pointer block py-4 px-12 border-l-4  hover:bg-gray-300 hover:text-black`}>
                <span className="text-gray-600 inline-block align-text-bottom mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                </span>
                <span className="text-gray-600">Add User</span>
            </div>
                : <span onClick={handleOpenModal} className="cursor-pointer xl:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                    <span className='block h-7 w-7 sm:h-12 sm:w-12 flex items-center justify-around rounded-full hover:bg-gray-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    </span>
                </span>}
            {isOpen ? <div id="defaultModal" aria-hidden="true" className="flex h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={handleCloseModal}
                ></div>

                <div className="relunderlineve w-full h-full max-w-2xl md:h-auto m-auto">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add User
                            </h3>
                            <button onClick={handleCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 ">
                            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Error</strong>
                                <span className="block"> {error}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeErrorAlert}>
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>
                            </div>}
                            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Success</strong>
                                <span className="block"> {success}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeSuccessAlert}>
                                    <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>
                            </div>}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="userId" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">User ID</label>
                                    <input ref={userIdRef} type="text" name="userId" placeholder="user ID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    <p className="text-sm text-gray-500 mt-1">Find your user ID at the settings page</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button disabled={loading} onClick={handleAddUser} type="button" className="transition duration-200 ease-in-out disabled:opacity-25 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                            <button onClick={handleCloseModal} type="button" className="transition ease-in-out duration-200 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            </div> : null}
        </>
    )
}
