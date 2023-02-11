import { FormEvent, useRef, useState } from 'react'
import { userAuth } from '../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'

export default function useAddUser() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const userIdRef = useRef<HTMLInputElement>(null)

    const { getUser, createUserChat } = userAuth()

    const navigate = useNavigate()

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setError('')
        setSuccess('')
        setIsOpen(false)
    }

    function closeSuccessAlert() {
        setSuccess('')
    }

    function closeErrorAlert() {
        setError('')
    }

    async function handleAddUser(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        const userId = userIdRef.current?.value

        if (!userId) {
            setLoading(false)
            return setError('Please provide a valid user ID.')
        }
        const addedUser = await getUser(userId)

        if (addedUser.status === 'error') {
            setLoading(false)
            return setError('No user found with the provided ID please check the ID before trying again.')
        }

        const response = await createUserChat(addedUser?.data!)
        if (response.status === 'error') {
            setLoading(false)
            return setError(response.message!)
        }
        setLoading(false)
        handleCloseModal()
        navigate('/profile/chat/' + response.message)
    }

    return {
        isOpen,
        error, 
        closeErrorAlert,
        success,
        closeSuccessAlert,
        handleOpenModal,
        handleCloseModal,
        userIdRef,
        loading,
        handleAddUser

    }
}
