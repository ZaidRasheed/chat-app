import { useState, useRef, FormEvent } from 'react'
import { userAuth } from '../context/authContext/authContext'

export default function useUpdateName({ currentFirstName, currentLastName }: { currentFirstName: string | undefined, currentLastName: string | undefined }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { updateName } = userAuth()

    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)

    function handleOpenModal() {
        setIsOpen(true)
    }
    function handleCloseModal() {
        setIsOpen(false)
        setLoading(false)
        setSuccess('')
        setError('')
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
        setSuccess('')

        if ((!firstNameRef.current || !firstNameRef.current.value) || (!lastNameRef.current || !lastNameRef.current.value)) {
            setLoading(false)
            return setError('Please provide valid names')
        }

        const firstName = firstNameRef.current.value.trim()
        const lastName = lastNameRef.current.value.trim()

        if (!firstName.length || !lastName.length) {
            setLoading(false)
            return setError("First and last Name can't be empty")
        }

        const regName = /^[a-zA-Z ]+$/

        if (!regName.test(firstName) || !regName.test(lastName)) {
            setLoading(false)
            return setError('First and Last name can only contain alphabetical values.')
        }

        if (firstName.length > 20 || lastName.length > 20) {
            setLoading(false)
            return setError('First and last names should not be longer than 20 characters each.')
        }
        const toTitleCase = (str: string) => str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())

        if (toTitleCase(firstName) === currentFirstName || toTitleCase(lastName) === currentLastName) {
            setLoading(false)
            return setError('Name provided is the same as the old one.')
        }


        updateName(toTitleCase(firstName), toTitleCase(lastName)).then(async res => {
            if (res.status === 'success') {
                setSuccess(res.message)
            }
            else {
                setError(res.message)
                setLoading(false)
            }

        })

    }

    return {
        isOpen,
        error,
        success,
        loading,
        firstNameRef,
        lastNameRef,
        handleCloseModal,
        handleOpenModal,
        closeErrorAlert,
        closeSuccessAlert,
        handleSubmit
    }
}
