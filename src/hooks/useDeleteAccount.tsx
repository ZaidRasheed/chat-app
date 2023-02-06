import { FormEvent, useRef, useState } from 'react'
import { userAuth } from '../context/authContext/authContext'

export default function useDeleteAccount() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const passwordRef = useRef<HTMLInputElement>(null)

    const { deleteAccount } = userAuth()

    function handleOpenModal() {
        setIsOpen(true)
    }
    function handleCloseModal() {
        setIsOpen(false)
    }

    function closeErrorAlert() {
        setError('')
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (!passwordRef.current || !passwordRef.current.value) {
            setLoading(false)
            return
        }
        const password = passwordRef.current.value
        const res = await deleteAccount(password)
        if (res.status === 'error') {
            setError(res.message)
            setLoading(false)
        }
    }
    return {
        isOpen,
        error,
        loading,
        passwordRef,
        handleOpenModal,
        handleCloseModal,
        handleSubmit,
        closeErrorAlert
    }
}
