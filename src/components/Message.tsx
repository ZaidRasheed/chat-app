import Avatar from './UI/Avatar'

export default function Message({ name, message, received, url, date, online }: { name: string, message: string, received: boolean, url?: string, date: any, online: boolean }) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' }
    const todaysDate = new Date()
    const messageDate = new Date(date.seconds * 1000)
    let finalDate

    if (messageDate.getDate() === todaysDate.getDate()) {
        const hours = messageDate.getHours()
        const minutes = messageDate.getMinutes() < 10 ? `0${messageDate.getMinutes()}` : messageDate.getMinutes()
        const afterNoon = hours >= 12
        finalDate = (afterNoon ? hours % 12 : hours) + ':' + minutes + (afterNoon ? " PM" : " AM")
    }
    else
        finalDate = messageDate.toLocaleDateString('en', options)

    return (
        <>
            {received ? <div className="message mb-4 flex">
                <div className="flex-2" >
                    <div className="w-12 h-12 relative">
                        <Avatar size='1' name={name} url={url} />
                        <span
                            className={`absolute w-4 h-4 bg-${online ? 'green' : 'gray'}-400 rounded-full right-0 bottom-0 border-2 border-white`}></span>
                    </div>
                </div >
                <div className="flex-1 px-2">
                    <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                        <span>{message}</span>
                    </div>
                    <div className="pl-4"><small className="text-gray-500">{finalDate}</small></div>
                </div>
            </div > : <div className="message me mb-4 flex text-right">
                <div className="flex-1 px-2">
                    <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                        <span>{message}</span>
                    </div>
                    <div className="pr-4"><small className="text-gray-500">{finalDate}</small></div>
                </div>
            </div>
            }
        </>
    )
}
