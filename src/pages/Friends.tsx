import { DocumentSnapshot } from 'firebase/firestore'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Avatar from '../components/UI/Avatar'

export default function Friends({ chats }: { chats: DocumentSnapshot | undefined }) {
    const [searchText, setSearchText] = useState<string>('')
    
    const chatsFullList = useMemo(() => {
        return chats ? Object.entries(chats?.data()!) : []
    }, [chats])

    const chatsList = useMemo(() => {
        if (searchText.trim())
            return chatsFullList.filter(chat => (chat[1].userInfo.firstName + ' ' + chat[1].userInfo.lastName).toLowerCase().includes(searchText.toLowerCase()))
        else
            return chatsFullList
    }, [searchText.trim(), chatsFullList.length])
    const navigate = useNavigate()

    return (
        <div className="flex-1 bg-gray-100 w-full h-full">
            <div className="main-body container m-auto w-11/12 h-full flex flex-col">
                <Header />
                <div className="main flex-1 flex flex-col overflow-auto">
                    <div className="heading flex-2">
                        <h1 className="text-3xl text-gray-700 mb-4">Friends</h1>
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
                                {chatsList.length > 0 ?
                                    chatsList.sort((a, b) => (a[1].userInfo.firstName + ' ' + a[1].userInfo.lastName) > (b[1].userInfo.firstName + ' ' + b[1].userInfo.lastName) ? 1 : (a[1].userInfo.firstName + ' ' + a[1].userInfo.lastName) < (b[1].userInfo.firstName + ' ' + b[1].userInfo.lastName) ? -1 : 0).map(chat => {
                                        return (
                                            <div
                                                onClick={() => navigate(`/profile/chat/${chat[0]}`)}
                                                key={chat[0]}
                                                className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                                                <div className="flex-2">
                                                    <div className="w-12 h-12 relative">
                                                        <Avatar name={chat[1].userInfo.firstName + ' ' + chat[1].userInfo.lastName} url={chat[1].userInfo.profilePictureURL} size='1' />
                                                    </div>
                                                </div>
                                                <div className="flex-1 px-2">
                                                    <div className="truncate w-32"><span className="text-gray-800">{chat[1].userInfo.firstName + ' ' + chat[1].userInfo.lastName}</span>
                                                    </div>
                                                </div>
                                                {/* <div className="flex-2 text-right">
                                                    <div><small className="text-gray-500">{chat[1].date?.seconds!}</small></div>
                                                    <div>
                                                        <small
                                                            className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                                                            23
                                                        </small>
                                                    </div>
                                                </div> */}
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
