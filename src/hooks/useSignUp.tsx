import { useState, useRef, FormEvent } from 'react'
import { userAuth } from '../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'

export default function useSignUp() {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)

    const emailRef = useRef<HTMLInputElement>(null)
    const emailConfirmRef = useRef<HTMLInputElement>(null)

    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)

    const profilePicRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    function closeErrorAlert() {
        setError('')
    }

    const { signUpWithEmail } = userAuth()

    const navigate = useNavigate()

    async function handleSignUp(event: FormEvent) {
        event.preventDefault()
        setError('')
        setLoading(true)
        const toTitleCase = (str: string) => str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())

        const firstName = toTitleCase(firstNameRef.current!.value.trim())
        const lastName = toTitleCase(lastNameRef.current!.value.trim())

        const email = emailRef.current!.value.trim()
        const emailConfirm = emailConfirmRef.current!.value.trim()

        const password = passwordRef.current!.value
        const passwordConfirm = passwordConfirmRef.current!.value

        const profilePicture = profilePicRef.current!.files![0]


        if (password.length < 6) {
            setLoading(false)
            return setError('Weak Password.')
        }

        if (email !== emailConfirm) {
            setLoading(false)
            return setError('Emails do not match.')
        }

        if (password !== passwordConfirm) {
            setLoading(false)
            return setError('Passwords do not match.')
        }

        if (firstName.length < 2 || lastName.length < 2) {
            setLoading(false)
            return setError('Please provide valid first and last name.')
        }

        const regName = /^[a-zA-Z ]+$/

        if (!regName.test(firstName.trim()) || !regName.test(lastName.trim())) {
            setLoading(false)
            return setError('First and Last name can only contain alphabetical values.')
        }

        const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!regEmail.test(email.trim())) {
            setLoading(false)
            return setError('Please provide a valid Email.')
        }

        if (firstName.length > 20 || lastName.length > 20) {
            setLoading(false)
            return setError('First and last names should not be longer than 20 characters each.')
        }

        if (email.length > 80) {
            setLoading(false)
            return setError('Email should not be longer than 80 characters.')
        }

        const allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/svg+xml']

        if (profilePicture) {
            if (!allowedTypes.includes(profilePicture.type)) {
                setLoading(false)
                return setError('File format is unacceptable, please upload SVG, PNG or JPG only')
            }

            const size = profilePicture.size / 1000000
            if (size > 1) {
                setLoading(false)
                return setError('Photo is too big, maximum size for profile pictures is 1MB')
            }
        }

        try {
            const res = await signUpWithEmail(firstName, lastName, email, password, profilePicture)
            if (res.status === 'success')
                navigate('/profile/chats')

            else {
                setLoading(false)
                setError(res.message)
            }
        }
        catch (error: any) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        firstNameRef,
        lastNameRef,
        emailRef,
        emailConfirmRef,
        passwordRef,
        passwordConfirmRef,
        profilePicRef,
        loading,
        handleSignUp,
        error,
        closeErrorAlert
    }
}
