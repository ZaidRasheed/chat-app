import { useState, useRef, FormEvent } from 'react'
import { userAuth } from '../context/authContext/authContext'

export default function useResetPassword() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const emailRef = useRef<HTMLInputElement>(null)

    const { sendResetPasswordLink } = userAuth()

    function handleOpenModal() {
        setIsOpen(true)
    }
    function handleCloseModal() {
        setIsOpen(false)
    }

    function closeSuccessAlert() {
        setSuccess('')
    }
    function closeErrorAlert() {
        setError('')
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (!emailRef.current || !emailRef.current.value) {
            setLoading(false)
            return setError('Please provide a valid email')
        }
        const email = emailRef.current.value
        const res = await sendResetPasswordLink(email)
        if (res.status === 'success')
            setSuccess(res.message)
        else {
            setError(res.message)
            setLoading(false)
        }
    }
    return {
        isOpen,
        error,
        success,
        loading,
        emailRef,
        handleCloseModal,
        handleOpenModal,
        handleSubmit,
        closeErrorAlert,
        closeSuccessAlert
    }
}
