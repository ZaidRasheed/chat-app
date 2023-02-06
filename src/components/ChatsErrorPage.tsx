import { Link } from "react-router-dom"
export default function Error() {
    return (
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
                <p className="text-3xl mb-8 font-semibold md:text-4xl">Page not found.</p>
                <Link className="px-8 py-3 bg-gray-300 font-semibold rounded dark:bg-violet-400 dark:text-gray-900" to={'/'}>Go back to chats</Link>
            </div>
        </div>
    )
}
