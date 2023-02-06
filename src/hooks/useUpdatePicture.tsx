import { useState, useRef } from 'react'
import { userAuth } from '../context/authContext/authContext'

export default function useUpdatePicture() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const profilePicRef = useRef<HTMLInputElement>(null)
    const { updateProfilePicture } = userAuth()

    function  closeErrorAlert(){
        setError('')
    }

    function  closeSuccessAlert(){
        setSuccess('')
    }

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setError('')
        setSuccess('')
        setLoading(false)
        setIsOpen(false)
    }

    async function handleSubmit() {
        setError('')
        setLoading(true)
        const profilePicture = profilePicRef.current!.files![0]
        const allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/svg+xml']


        if (!allowedTypes.includes(profilePicture.type)) {
            setLoading(false)
            return setError('File format is unacceptable, please upload SVG, PNG or JPG only')
        }

        const size = profilePicture.size / 1000000
        if (size > 1) {
            setLoading(false)
            return setError('Photo is too big, maximum size for profile pictures is 1MB')
        }
        const res = await updateProfilePicture(profilePicture)

        if (res.status === 'error') {
            setError(res.message)
            setLoading(false)
        }
        else
            setSuccess(res.message)
    }

    return {
        isOpen,
        error,
        success,
        loading,
        profilePicRef,
        handleCloseModal,
        handleOpenModal,
        handleSubmit,
        closeErrorAlert,
        closeSuccessAlert
    }
}
