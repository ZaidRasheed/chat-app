import { useState, FormEvent, useEffect } from 'react'
import { userAuth } from '../context/authContext/authContext'

export default function useChangeStatus(currentStatus: boolean | undefined) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [status, setStatus] = useState<boolean | undefined>(currentStatus)
    const [showList, setShowList] = useState<boolean>(false)
    const { changeOnlineStatus } = userAuth()

    useEffect(() => {
        setStatus(currentStatus)
    }, [currentStatus])

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setError('')
        setSuccess('')
        setShowList(false)
        setLoading(false)
        setIsOpen(false)
    }

    function closeSuccessAlert() {
        setSuccess('')
    }

    function closeErrorAlert() {
        setError('')
    }

    async function handleChangeStatus(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        if (status === currentStatus) {
            setLoading(false)
            return setError(`Online status is already set to ${status ? 'show' : 'hide'}`)
        }
        const res = await changeOnlineStatus(status!)
        if (res.status === 'success')
            setSuccess(res.message)
        else
            setError(res.message)

        setLoading(false)
    }

    function changeValue(choice: boolean) {
        setStatus(choice)
    }

    return {
        isOpen,
        error,
        success,
        loading,
        status,
        showList,
        handleOpenModal,
        handleCloseModal,
        handleChangeStatus,
        changeValue,
        closeErrorAlert,
        closeSuccessAlert,
        setShowList
    }
}
