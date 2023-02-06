import { useState, useRef, FormEvent } from 'react'
import { userAuth } from '../context/authContext/authContext'

export default function useUpdatePassword() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const oldPasswordRef = useRef<HTMLInputElement>(null)

    const newPasswordRef = useRef<HTMLInputElement>(null)
    const newPasswordConfirmRef = useRef<HTMLInputElement>(null)

    const { updatePassword } = userAuth()

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false)
    }

    function closeErrorAlert() {
        setError('')
    }
    function closeSuccessAlert() {
        setSuccess('')
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        if ((!oldPasswordRef.current || !oldPasswordRef.current.value) || (!newPasswordRef.current || !newPasswordRef.current.value)) {
            setLoading(false)
            return setError('Please provide valid passwords')
        }

        const oldPassword = oldPasswordRef.current.value
        const newPassword = newPasswordRef.current.value
        const newPasswordConfirm = newPasswordConfirmRef.current!.value

        if (newPassword.length < 8) {
            setLoading(false)
            return setError('Weak password please provide a stronger password')
        }

        if (newPassword !== newPasswordConfirm) {
            setLoading(false)
            return setError('Passwords do not match.')
        }

        const res = await updatePassword(oldPassword, newPassword)
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
        oldPasswordRef,
        newPasswordRef,
        newPasswordConfirmRef,
        handleCloseModal,
        handleOpenModal,
        handleSubmit,
        closeErrorAlert,
        closeSuccessAlert
    }
}
