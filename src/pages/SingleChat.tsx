import { DocumentSnapshot } from 'firebase/firestore'
import { useChatData } from '../components/FindChat'
import Header from '../components/layout/Header'
import Message from '../components/Message'
import { userAuth } from '../context/authContext/authContext'
import useSendMessage from '../hooks/useSendMessage'

export default function SingleChat({ chats }: { chats: DocumentSnapshot | undefined }) {
    const { onlineStatus } = userAuth()
    const { chat, chatId } = useChatData()
    const { info, messageRef, handleSendMessage, bottomRef } = useSendMessage(chats, chatId)
    const online = onlineStatus?.get(chats?.data()![chatId].userInfo.userId).connected

    return (
        <div className="flex-1 bg-gray-100 w-full h-full ">
            <div className="main-body container m-auto w-11/12 h-full flex flex-col relative">
                <Header />
                <div className="flex-3 mb-8 border-b-2 border-gray-200">
                    <h2 className="text-xl py-1">Chatting with <b>{info.name}</b></h2>
                    <p className='text-gray-500 text-[10px] hidden sm:block'>ID: {chatId}</p>
                </div>
                <div className="main flex-1 flex flex-col mb-28 overflow-auto ">
                    <div>
                        <div className="chat-area flex-1 flex flex-col lg:block ">

                            <div className="messages flex-1 ">
                                {chat?.messages.sort((a: { date: { seconds: number } }, b: { date: { seconds: number } }) => a.date.seconds - b.date.seconds).map((message: any) => {
                                    const received = info.userId === message.senderId ? true : false
                                    return (
                                        <Message online={online} key={message.date} date={message.date} received={received} message={message.content} name={info.name} url={info.profilePictureURL} />
                                    )
                                })}
                                <div ref={bottomRef}></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex-2 pt-4 pb-10 absolute w-full bottom-0">
                    <div className="write bg-white shadow flex rounded-lg">
                        <form className='flex w-full' onSubmit={handleSendMessage}>
                            <div className="flex-1 flex items-center justify-center">
                                {chat?.active!==false ? <textarea name="message"
                                    ref={messageRef}
                                    className="w-full block outline-none py-4 px-4 bg-transparent" rows={1}
                                    placeholder="Type a message..." autoFocus>
                                </textarea> :
                                    <input name="message"
                                        disabled={true}
                                        readOnly={true}
                                        value={'You can no longer message this user as the account has been deleted'}
                                        className="w-full block outline-none py-4 px-4 bg-transparent text-red-600 font-medium	" 
                                        placeholder="Type a message..." autoFocus>
                                    </input>}
                            </div>
                            <div className="flex-2 w-16 p-3 flex content-center items-center">
                                <div className="flex-1">
                                    <button disabled={!chat?.active} type='submit' className="disabled:opacity-50 disabled:cursor-no-drop hover:bg-blue-700 bg-blue-500 w-11 h-11 rounded-full inline-block">
                                        <span className="flex items-center justify-center align-text-bottom">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="text-white" viewBox="0 0 18 18">
                                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
