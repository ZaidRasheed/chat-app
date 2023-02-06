import useSignUp from "../hooks/useSignUp"
import MainHeader from "../components/layout/MainHeader"
export default function SignUp() {

    const {
        firstNameRef,
        lastNameRef,
        emailRef,
        emailConfirmRef,
        passwordRef,
        passwordConfirmRef,
        profilePicRef,
        loading,
        handleSignUp,
        error,
        closeErrorAlert
    } = useSignUp()


    return (
        <><MainHeader />
            <div className="flex min-h-full items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
                    </div>
                    <form className="space-y-4 rounded border-2	p-4" onSubmit={handleSignUp}>
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error</strong>
                            <span className="block"> {error}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={closeErrorAlert}>
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>}
                        <input type="hidden" name="remember" value="true" />

                        <div className="-space-y-px rounded-md ">
                            <h1 className='mb-2 text-lg'>Name</h1>
                            <div>
                                <label htmlFor="first-name" className="sr-only" >First Name</label>
                                <input ref={firstNameRef} maxLength={20} name="name" type="name" autoComplete="name" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm lg:text-base" placeholder="First Name" />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="sr-only">Last Name</label>
                                <input ref={lastNameRef} maxLength={20} name="name" type="name" autoComplete="name" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm lg:text-base" placeholder="Last Name" />
                            </div>
                        </div>

                        <div className="-space-y-px rounded-md">
                            <h1 className='mb-2 text-lg'>Email Address</h1>
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email</label>
                                <input ref={emailRef} maxLength={80} name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm lg:text-base" placeholder="Email" />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">Confirm Email</label>
                                <input ref={emailConfirmRef} maxLength={80} name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm lg:text-base" placeholder="Confirm email" />
                            </div>
                        </div>

                        <div className="-space-y-px rounded-md">
                            <h1 className='mb-2 text-lg'>Password</h1>
                            <div>
                                <label htmlFor="password" className='sr-only'>Password</label>
                                <input ref={passwordRef} name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm lg:text-base" placeholder="Password" />
                            </div>
                            <div>
                                <label htmlFor="password" className='sr-only'>Confirm Password</label>
                                <input ref={passwordConfirmRef} name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm lg:text-base" placeholder="Confirm password" />
                            </div>
                        </div>
                        <div className="-space-y-px rounded-md">
                            <h1 className='mb-2 text-lg'>Profile Picture</h1>
                            <div>
                                <input className='cursor-pointer' ref={profilePicRef} type='file' />
                                <p className="text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG or JPG (Max 1MB).</p>
                            </div>
                        </div>


                        <div>
                            <button disabled={loading} type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
