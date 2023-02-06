import useChangeStatus from "../../hooks/useChangeStatus"

export default function ChangeStatusModal({ currentStatus }: { currentStatus: boolean | undefined }) {
    const { isOpen,
        error,
        success,
        loading,
        status,
        showList,
        handleOpenModal,
        handleCloseModal,
        handleChangeStatus,
        changeValue,
        closeErrorAlert,
        closeSuccessAlert,
        setShowList } = useChangeStatus(currentStatus)

    return (
        <>
            <span className="inline-block text-gray-700">
                Status: <span
                    className={`inline-block align-text-bottom w-4 h-4 ${currentStatus ? 'bg-green-400' : 'bg-gray-400'} rounded-full border-2 border-white`}></span>
                <b>{currentStatus ? 'Online' : 'Offline'}</b>
                <span className="inline-block align-text-bottom">
                    <svg onClick={handleOpenModal} fill="none" stroke="currentColor" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="cursor-pointer w-4 h-4">
                        <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                </span>
            </span>

            {isOpen ? <div id="defaultModal" aria-hidden="true" className="flex h-screen fixed top-0 left-0 right-0 z-20 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={handleCloseModal}
                ></div>

                <div className="w-full h-full max-w-2xl md:h-auto m-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Change Online Status
                            </h3>
                            <button onClick={handleCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="text-left p-4">
                            {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-3 mb-2 rounded relative" role="alert">
                                <strong className="font-bold">Error</strong>
                                <span className="block"> {error}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeErrorAlert}>
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>
                            </div> : null}
                            {success ? <div className="bg-green-100 border border-green-400 text-green-700 px-2 py-3 mb-2 rounded relative" role="alert">
                                <strong className="font-bold">Success</strong>
                                <span className="block"> {success}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeSuccessAlert}>
                                    <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>
                            </div> : null}
                            <h1 className="text-lg mb-1 inline"> Status: </h1>
                            <button onMouseLeave={(e) => e.currentTarget.blur()} onClick={() => setShowList(true)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className={`text-white ${status ? "bg-green-600 hover:bg-green-800 focus:ring-green-300" : "bg-gray-600 hover:bg-gray-800 focus:ring-gray-300"} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80`} type="button">{status ? 'Show' : 'Hide'}<svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                            {showList && <div onMouseLeave={() => setShowList(false)} id="dropdown" className=" relative bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700">
                                <ul className="drop-shadow-lg rounded z-50 absolute py-2 mt-1 left-10 w-40 bg-white text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <p onClick={() => { changeValue(true); setShowList(false) }} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</p>
                                    </li>
                                    <li>
                                        <p onClick={() => { changeValue(false); setShowList(false) }} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Hide</p>
                                    </li>
                                </ul>
                            </div>}


                        </div>
                        <div className=" flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button disabled={loading} onClick={handleChangeStatus} type="button" className="transition duration-200 ease-in-out disabled:opacity-25 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                            <button onClick={handleCloseModal} type="button" className="transition ease-in-out duration-200 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900  dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            </div> : null}
        </>
    )
}
