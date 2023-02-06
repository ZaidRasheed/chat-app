import { useState, useEffect } from "react"
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { userAuth } from "../context/authContext/authContext"

export default function FindChat() {
    const [chat, setChat] = useState<any>(undefined)
    const { chatId } = useParams()
    const { getChat } = userAuth()

    useEffect(() => {
        const unSub = getChat(chatId!, setChat)
        return () => {
            unSub()
        }
    }, [])

    if (chat !== null)
        return <Outlet context={{ chat: chat, chatId: chatId }} />
    return <Navigate to='/profile/chats' replace />
}
type ChatOutletContext = {
    chat: {
        messages: [],
        active: boolean
    },
    chatId: string
}
export function useChatData() {
    return useOutletContext<ChatOutletContext>()
}