import useUpdatePicture from '../../hooks/useUpdatePicture'

export default function UpdatePictureModal() {
    const { isOpen,
        error,
        success,
        loading,
        profilePicRef,
        handleCloseModal,
        handleOpenModal,
        handleSubmit,
        closeErrorAlert,
        closeSuccessAlert
    } = useUpdatePicture()

    return (
        <>
            <div onClick={handleOpenModal} className="flex content-start justify-start cursor-pointer border-t-2 border-black block py-4 px-12 hover:bg-blue-500 hover:text-white">
                <span className="inline-block align-text-bottom mr-2">
                    <svg fill="currentColor" viewBox="0 0 18 18" className="w-6 h-6">
                        <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                    </svg>
                </span>
                Update Profile Picture
            </div>
            {isOpen ? <div id="defaultModal" aria-hidden="true" className="flex h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={handleCloseModal}
                ></div>

                <div className="relunderlineve w-full h-full max-w-2xl md:h-auto m-auto">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Update Profile Picture
                            </h3>
                            <button onClick={handleCloseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 ">
                            {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-3 mb-2 rounded relative" role="alert">
                                <strong className="font-bold">Error</strong>
                                <span className="block"> {error}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeErrorAlert}>
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>
                            </div> : null}
                            {success ? <div className="bg-green-100 border border-green-400 text-green-700 px-2 py-3 mb-2 rounded relative" role="alert">
                                <strong className="font-bold">Succes</strong>
                                <span className="block"> {success}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeSuccessAlert}>
                                    <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>
                            </div> : null}
                            <div className="-space-y-px rounded-md">
                                <h1 className='mb-2 text-lg'>Profile Picture</h1>
                                <div>
                                    <input className='cursor-pointer' ref={profilePicRef} type='file' />
                                    <p className="text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG or JPG (Max 1MB).</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button disabled={loading} onClick={handleSubmit} type="button" className="transition duration-200 ease-in-out disabled:opacity-25 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                            <button onClick={handleCloseModal} type="button" className="transition ease-in-out duration-200 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            </div> : null}
        </>
    )
}
