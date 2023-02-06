import useResetPassword from "../../hooks/useResetPassword"

export default function ResetPasswordModal() {
    const {
        isOpen,
        error,
        success,
        loading,
        emailRef,
        handleCloseModal,
        handleOpenModal,
        handleSubmit,
        closeErrorAlert,
        closeSuccessAlert
    } = useResetPassword()

    return (
        <>
            <div className="text-sm">
                <p onClick={handleOpenModal} className="cursor-pointer font-medium text-blue-600 hover:text-blue-500">Forgot your password?</p>
            </div>
            {isOpen ? <div id="defaultModal" aria-hidden="true" className="flex fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={handleCloseModal}
                ></div>

                <div className="flex items-center justify-center h-screen relunderlineve w-full h-full max-w-2xl md:h-auto m-auto">

                    <div className="w-5/6 m-x-auto relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Reset Password
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
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm your Email</label>
                                    <input ref={emailRef} type="Email" name="Email" placeholder="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                            </div>
                        </div>

                        <div className="px-4 pb-2">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Please check your spam before submitting again.
                            </p>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button disabled={loading} onClick={handleSubmit} type="button" className="transition duration-200 ease-in-out disabled:opacity-25 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </div>
                </div>
            </div> : null}
        </>
    )
}
