import { DocumentSnapshot } from 'firebase/firestore'
import { useState, useEffect, useRef, FormEvent } from 'react'
import { userAuth } from '../context/authContext/authContext'

export default function useSendMessage(chats: DocumentSnapshot | undefined, chatId: string) {
    const messageRef = useRef<HTMLTextAreaElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    const [info, setInfo] = useState({
        name: '',
        profilePictureURL: '',
        userId: ''
    })

    const { sendMessage, openMessages } = userAuth()

    useEffect(() => {
        if (chats) {
            const { userInfo } = chats?.data()![chatId]
            const { firstName, lastName, profilePictureURL, userId } = userInfo
            setInfo({
                name: firstName + ' ' + lastName,
                profilePictureURL,
                userId: userId
            })
            setTimeout(() => {
                handleScroll()
            }, 300)
        }
        try {
            openMessages(chatId)
        } catch (error) {
            console.log(error)
        }
    }, [chats])

    function handleScroll() {
        bottomRef.current?.scrollIntoView()
    }
    
    async function handleSendMessage(e: FormEvent) {
        e.preventDefault()
        if ((!messageRef?.current || !messageRef?.current.value) || !messageRef.current.value.trim())
            return
        const message = messageRef.current.value

        await sendMessage(message, chatId, info.userId)
        handleScroll()
        messageRef.current.value = ''
        messageRef.current.focus()
    }

    return {
        messageRef,
        info,
        handleSendMessage,
        bottomRef
    }
}
