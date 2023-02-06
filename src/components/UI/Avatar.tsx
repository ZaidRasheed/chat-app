type AvatarProps = {
    name: string,
    size: string,
    url: string | undefined
}
export default function Avatar({ name, size, url }: AvatarProps) {

    const [first, last] = name.split(' ')
    const letters = first.charAt(0) + last.charAt(0)

    let avatar = <div className="relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full p-3 dark:bg-gray-600">
        {url ? <img src={url} /> : <p className="text-4xl font-medium text-gray-600 dark:text-gray-300">{letters}</p>}
    </div>
    switch (size) {
        case '1':
            avatar =
                <>{url ? <img className="w-12 h-12 rounded-full mx-auto" src={url} /> : <p className="text-2xl text-center font-medium  text-gray-600 dark:text-gray-300 ">{letters}</p>}</>
            break
        case '2':
            avatar = <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full p-3 dark:bg-gray-600">
                {url ? <img src={url} /> : <p className="text-1xl font-medium text-gray-600 dark:text-gray-300">{letters}</p>}
            </div>
        case '4':
            avatar = <div className="relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full p-3 dark:bg-gray-600">
                {url ? <img src={url} /> : <p className="text-4xl font-medium text-gray-600 dark:text-gray-300">{letters}</p>}
            </div>
    }

    return (
        <>{avatar}</>
    )
}
