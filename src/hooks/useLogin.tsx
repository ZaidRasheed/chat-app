import { useState, useRef, FormEvent } from 'react'
import { userAuth } from '../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'

export default function useLogin() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const rememberRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { logIn } = userAuth()

    const navigate = useNavigate()

    function closeErrorAlert() {
        setError('')
    }

    async function handleLogin(event: FormEvent) {
        event.preventDefault()
        setError('')
        setLoading(true)


        const email = emailRef.current!.value.trim()
        const password = passwordRef.current!.value
        const remember = rememberRef.current!.checked

        try {
            await logIn(email, password, remember)
            navigate('/profile/chats')

        }
        catch (error: any) {
            switch (error.code) {
                case 'auth/user-not-found': {
                    setError(`A username with this email doesn't exist, try signing up instead.`)
                    break
                }
                case 'auth/wrong-password': {
                    setError('Wrong password please try again.')
                    break
                }
                case 'auth/too-many-requests': {
                    setError('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.')
                    break
                }
                case 'auth/user-disabled': {
                    setError('Account has been disabled.')
                    break
                }
                default: {
                    console.log(error)
                    setError('Failed to login.')
                }
            }
            setLoading(false)
        }
    }

    return {
        emailRef,
        passwordRef,
        rememberRef,
        loading,
        handleLogin,
        error,
        closeErrorAlert,
    }
}

