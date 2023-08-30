import { DocumentSnapshot } from 'firebase/firestore'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Avatar from '../components/UI/Avatar'
import { userAuth } from '../context/authContext/authContext'
export default function Chats({ chats }: { chats: DocumentSnapshot | undefined }) {
    const { onlineStatus } = userAuth()

    const [searchText, setSearchText] = useState<string>('')
    const chatsFullList = useMemo(() => {
        return chats?.data() ? Object.entries(chats?.data()!) : []
    }, [JSON.stringify((chats?.data()))])

    const chatsList = useMemo(() => {
        if (searchText.trim())
            return chatsFullList.filter(chat => (chat[1].userInfo.firstName + ' ' + chat[1].userInfo.lastName).toLowerCase().includes(searchText.toLowerCase()))
        else
            return chatsFullList
    }, [searchText.trim(), JSON.stringify(chatsFullList)])

    const navigate = useNavigate()


    return (
        <div className="flex-1 bg-gray-100 w-full h-full">
            <div className="main-body container m-auto w-11/12 h-full flex flex-col pb-7">
                <Header />
                <div className="main flex-1 flex flex-col overflow-auto">
                    <div className="heading flex-2">
                        <h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
                    </div>

                    <div className="flex-1 flex h-full ">
                        <div className={`sidebar w-full lg:flex flex-2 flex-col pr-6`}>
                            <div className="search flex-2 pb-6 px-2">
                                <input
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    type="text"
                                    className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
                                    placeholder="Search" />
                            </div>

                            <div className="flex-1 h-full px-2">
                                {(chatsList && chatsList?.length > 0) ?
                                    chatsList.sort((a, b) => b[1].lastMessage.date.seconds - a[1].lastMessage.date.seconds).map(chat => {
                                        const date = new Date(chat[1].lastMessage?.date?.seconds! * 1000)
                                        const todaysDate = new Date()
                                        const options: any = { year: 'numeric', month: 'long', day: 'numeric' }

                                        let lastMessagesDate = null

                                        if (date.getDate() === todaysDate.getDate()) {
                                            const hours = date.getHours()
                                            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
                                            const afterNoon = hours >= 12
                                            lastMessagesDate = (afterNoon ? hours % 12 : hours) + ':' + minutes + (afterNoon ? " PM" : " AM")
                                        }
                                        else
                                            lastMessagesDate = date.toLocaleDateString('en', options)


                                        let lastSeen = null

                                        if (onlineStatus?.get(chat[1].userInfo.userId)?.lastOnline) {
                                            const lastSeenDate = new Date(onlineStatus?.get(chat[1].userInfo.userId)!.lastOnline)
                                            if (lastSeenDate.getDate() === todaysDate.getDate()) {
                                                const hours = lastSeenDate.getHours()
                                                const minutes = lastSeenDate.getMinutes() < 10 ? `0${lastSeenDate.getMinutes()}` : lastSeenDate.getMinutes()
                                                const afterNoon = hours >= 12
                                                lastSeen = (afterNoon ? hours % 12 : hours) + ':' + minutes + (afterNoon ? " PM" : " AM")
                                            }
                                            else
                                                lastSeen = lastSeenDate.toLocaleDateString('en', options)
                                        }

                                        if (chat[1]?.lastMessage?.message)
                                            return (
                                                <div
                                                    onClick={() => navigate(`/profile/chat/${chat[0]}`)}
                                                    key={chat[0]}
                                                    className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                                                    <div className="flex-2">
                                                        <div className="w-12 h-12 relative">
                                                            <Avatar name={chat[1].userInfo.firstName + ' ' + chat[1].userInfo.lastName} url={chat[1].userInfo.profilePictureURL} size='1' />
                                                            {onlineStatus?.get(chat[1]?.userInfo.userId)?.connected! === true ? <span
                                                                className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white">
                                                            </span> : null}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 px-3">
                                                        <div className="truncate w-32"><span className="text-lg text-gray-800">{chat[1].userInfo.firstName + ' ' + chat[1].userInfo.lastName}</span>
                                                        </div>
                                                        <div ><span className="text-sm text-gray-600">{chat[1]?.lastMessage.message}</span></div>
                                                        {onlineStatus?.get(chat[1]?.userInfo.userId)?.lastOnline ? <p className='text-xs w-18 mt-1 text-gray-400'>Last seen {lastSeen}</p> : null}
                                                    </div>
                                                    <div className="flex-2 text-right">
                                                        <div><small className="text-gray-500">{lastMessagesDate}</small></div>
                                                        {chat[1]?.unOpened?.count > 0 ? <div>
                                                            <small
                                                                className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                                                                {chat[1]?.unOpened?.count}
                                                            </small>
                                                        </div> : null}
                                                    </div>

                                                </div>
                                            )
                                    })
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
