import { createContext, useContext, useEffect, useState, ReactElement } from "react"
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
    sendPasswordResetEmail, signOut, updatePassword as passwordUpdate,
    EmailAuthProvider, reauthenticateWithCredential, setPersistence,
    browserSessionPersistence, User as FirebaseUser, UserCredential
} from "firebase/auth"

import {
    doc, onSnapshot, Timestamp, Unsubscribe,
    setDoc, getDoc, deleteDoc, updateDoc,
    arrayUnion, DocumentSnapshot, serverTimestamp
} from "firebase/firestore"

import {
    ref, uploadBytesResumable, getDownloadURL, deleteObject
} from "firebase/storage"

import {
    ref as databaseRef,
    onValue, onDisconnect,
    set, serverTimestamp as databaseTimestamp
} from "firebase/database"

import { auth, db, storage, database } from "./firebase"

type VoidResponse = {
    status: string,
    message: string
}
type DataResponse = {
    status: string,
    message?: string
    data?: DocumentSnapshot
}
type User = {
    email: string,
    firstName: string,
    lastName: string,
    userId: string,
    showOnlineStatus: boolean,
    profilePictureURL?: string | undefined
}

interface UserAuthInterface {
    currentUser: FirebaseUser | null
    fireStoreUser: User | null
    chats: DocumentSnapshot | undefined
    onlineStatus: Map<string, any> | undefined
    signUpWithEmail: (firstName: string, lastName: string, email: string, password: string, profilePicture: File | undefined) => Promise<VoidResponse>
    logOut: () => void
    logIn: (email: string, password: string, remember: boolean) => Promise<UserCredential>
    deleteAccount: (password: string) => Promise<VoidResponse>
    sendResetPasswordLink: (email: string) => Promise<VoidResponse>
    updatePassword: (oldPassword: string, newPassword: string) => Promise<VoidResponse>
    updateProfilePicture: (profilePicture: File, uid?: string | undefined) => Promise<VoidResponse>
    getUser: (userId: string) => Promise<DataResponse>
    createUserChat: (user: DocumentSnapshot) => Promise<DataResponse>
    getChat: (chatId: string, setter: Function) => Unsubscribe
    sendMessage: (text: string, chatId: string, receiverId: string) => Promise<VoidResponse>
    changeOnlineStatus: (showOnlineStatus: boolean) => Promise<VoidResponse>
    openMessages: (chatId: string) => void
    updateName: (firstName: string, lastName: string) => Promise<VoidResponse>
}

const UserContext = createContext<UserAuthInterface | null>(null)

export const userAuth = () => {
    return useContext(UserContext) as UserAuthInterface
}

export default function AuthContextProvider({ children }: { children: ReactElement }) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null)
    const [fireStoreUser, setFireStoreUser] = useState<User | null>(null)
    const [chats, setChats] = useState<DocumentSnapshot>()
    const [onlineStatus, setOnlineStatus] = useState<Map<string, {}>>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user)
                try {
                    const unSub1 = onSnapshot(doc(db, "userChats", user.uid), (userChats) => {
                        setChats(userChats)
                    })
                    const unSub2 = onSnapshot(doc(db, "users", user.uid), (userData) => {
                        setUserData(userData)
                    })
                    setLoading(false)
                    return () => {
                        unSub1()
                        unSub2()
                    }
                }
                catch (error) {
                    setCurrentUser(null)
                    logOut()
                    setLoading(false)
                }
            }
            else {
                setCurrentUser(null)
                setFireStoreUser(null)
                setLoading(false)
            }
        })
        return () => {
            setCurrentUser(null)
            setFireStoreUser(null)
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (currentUser?.uid && fireStoreUser?.showOnlineStatus) {
            const myConnectionRef = databaseRef(database, `connections/${currentUser.uid}`)
            const connectedRef = databaseRef(database, '.info/connected')
            const unsubscribe = onValue(connectedRef, (snap) => {
                if (snap.val() === true) {
                    set(myConnectionRef, {
                        connected: true,
                    })
                    onDisconnect(myConnectionRef).set({
                        connected: false,
                        lastOnline: databaseTimestamp()
                    })
                }
            })
            return () => {
                unsubscribe()
            }
        }
    }, [currentUser?.uid, fireStoreUser?.showOnlineStatus])

    useEffect(() => {
        if (chats?.data()) {
            const connectionsRef = databaseRef(database, 'connections')
            const unsubscribe = onValue(connectionsRef, data => {
                try {
                    const allChats = Object.entries(chats?.data()!)
                    const onlineStatus = new Map<string, {}>()
                    allChats.forEach(chat => {
                        onlineStatus.set(chat[1].userInfo?.userId, {
                            ...data.child(chat[1].userInfo?.userId).toJSON()
                        })
                    })
                    setOnlineStatus(onlineStatus)
                } catch (error) {
                    console.log(error)
                }
            })
            return () => {
                unsubscribe()
            }
        }
    }, [chats])

    async function changeOnlineStatus(showOnlineStatus: boolean): Promise<VoidResponse> {
        try {
            const userRef = doc(db, 'users', currentUser?.uid!)
            await updateDoc(userRef, {
                showOnlineStatus: showOnlineStatus
            })
            if (!showOnlineStatus) {
                const myConnectionRef = databaseRef(database, `connections/${currentUser?.uid}`)
                set(myConnectionRef, {
                    connected: false,
                    // lastOnline: databaseTimestamp()
                })
            }
            return { status: 'success', message: `Status updated successfully to ${showOnlineStatus ? 'show online status' : 'hide online status'}.` }
        } catch (error) {
            return { status: 'error', message: 'Error in updating online status please try again later.' }
        }
    }

    function logIn(email: string, password: string, remember: boolean): Promise<UserCredential> {
        if (!remember) {
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    return signInWithEmailAndPassword(auth, email, password)
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                })
        }
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function sendResetPasswordLink(email: string): Promise<VoidResponse> {
        try {
            await sendPasswordResetEmail(auth, email)
            return { status: 'success', message: 'Email sent please check inbox.' }

        } catch (error: any) {
            switch (error.code) {
                case 'auth/user-not-found': {
                    return { status: 'error', message: `A username with this email doesn't exist, try signing up instead.` }
                }
                case 'auth/invalid-email': {
                    return { status: 'error', message: `Invalid email, please provide a valid email.` }
                }
                default:
                    return { status: 'error', message: error.code }
            }
        }
    }

    function logOut() {
        if (fireStoreUser?.showOnlineStatus) {
            const myConnectionRef = databaseRef(database, `connections/${currentUser?.uid}`)
            set(myConnectionRef, {
                connected: false,
                lastOnline: databaseTimestamp()
            })
        }
        signOut(auth)
    }

    function createCredential(email: string, password: string) {
        const credential = EmailAuthProvider.credential(
            email,
            password
        )
        return credential
    }

    async function signUpWithEmail(firstName: string, lastName: string, email: string, password: string, profilePicture: File | undefined): Promise<VoidResponse> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const uid = userCredential.user.uid
            const res = await createAccount(uid, firstName, lastName, email)

            if (profilePicture) {
                updateProfilePicture(profilePicture, uid)
            }

            if (res.status !== 'success') {
                userCredential.user.delete()
            }

            return res
        }
        catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use': {
                    return { status: 'error', message: 'Email is already in use.' }
                }
                case 'auth/weak-password': {
                    return { status: 'error', message: 'Weak Password.' }
                }
                case 'auth/invalid-email': {
                    return { status: 'error', message: 'Please provide a valid email.' }
                }
                default: {
                    return { status: 'error', message: 'Failed to create an account.' }
                }
            }
        }
    }

    async function updateProfilePictureInAllChats(url: string) {
        const allChats = (Object.entries(chats?.data()!))
        allChats.forEach(async chat => {
            const userId = chat[1].userInfo.userId
            const chatId = chat[0]
            const userChatsRef = doc(db, 'userChats', userId)
            await updateDoc(userChatsRef, {
                [chatId + ".userInfo"]: {
                    profilePictureURL: url,
                    firstName: fireStoreUser?.firstName,
                    lastName: fireStoreUser?.lastName,
                    userId: fireStoreUser?.userId
                }
            })

        })
    }

    async function updateProfilePicture(profilePicture: File, uid?: string): Promise<VoidResponse> {
        if (uid || fireStoreUser)
            try {
                let userId: string

                if (uid) userId = uid
                else userId = fireStoreUser?.userId!

                const storageRef = ref(storage, 'Profile Pictures/' + userId)

                await uploadBytesResumable(storageRef, profilePicture)

                const downloadURL = await getDownloadURL(storageRef)

                const userRef = doc(db, 'users', userId)
                await updateDoc(userRef, {
                    profilePictureURL: downloadURL
                })

                await updateProfilePictureInAllChats(downloadURL)

                return { status: 'success', message: 'Profile picture updated successfully' }
            } catch (error: any) {
                return { status: 'error', message: error.code }
            }
        return { status: 'error', message: 'No current user' }
    }


    async function createAccount(userId: string, firstName: string, lastName: string, email: string): Promise<VoidResponse> {
        type user = {
            userId: string,
            firstName: string,
            lastName: string,
            email: string,
            showOnlineStatus: boolean
        }

        try {
            let newUser: user
            newUser = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                showOnlineStatus: true
            }
            const userRef = doc(db, 'users', userId)
            await setDoc(userRef, newUser)

            const chatRef = doc(db, 'userChats', userId)
            await setDoc(chatRef, {})

            return { status: 'success', message: 'Account successfully created.' }
        }
        catch (error: any) {
            console.log(error)
            return { status: 'error', message: error.message }
        }
    }

    async function updatePassword(oldPassword: string, newPassword: string): Promise<VoidResponse> {
        if (!currentUser)
            return { status: 'error', message: 'No current user.' }

        try {
            const credential = createCredential(currentUser.email!, oldPassword)
            await reauthenticateWithCredential(currentUser, credential)
            await passwordUpdate(currentUser, newPassword)
            return { status: 'success', message: 'Password updated successfully.' }
        }
        catch (error: any) {
            switch (error.code) {
                case 'auth/weak-password': {
                    return { status: 'error', message: 'Weak Password.' }
                }
                case 'auth/invalid-email': {
                    return { status: 'error', message: 'Please provide a valid email.' }
                }
                case 'auth/wrong-password': {
                    return { status: 'error', message: 'Wrong password please provide your current password, or reset your password through email.' }
                }
                case 'auth/too-many-requests': {
                    return { status: 'error', message: 'You have sent too many requests please try again in a bit.' }
                }
                default: {
                    return { status: 'error', message: 'Failed to update password.' }
                }
            }
        }
    }

    async function setUserData(data: DocumentSnapshot): Promise<void> {
        try {

            if (data.exists()) {
                const fireStoreUser: User = {
                    email: data.data()!.email!,
                    firstName: data.data()!.firstName!,
                    lastName: data.data()!.lastName!,
                    userId: data.data()!.userId!,
                    showOnlineStatus: data.data()!.showOnlineStatus!,
                    profilePictureURL: data.data()!.profilePictureURL || undefined
                }
                setFireStoreUser(fireStoreUser)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteAccount(password: string): Promise<VoidResponse> {
        if (!currentUser)
            return { status: 'error', message: 'No user found.' }

        try {
            const uid = currentUser.uid

            const credential = createCredential(currentUser.email!, password)
            await reauthenticateWithCredential(currentUser, credential)

            if (fireStoreUser?.profilePictureURL) {
                const pictureRef = ref(storage, 'Profile Pictures/' + uid)
                await deleteObject(pictureRef)
            }


            Object.entries(chats?.data()!).forEach(async chat => {
                const chatRef = doc(db, 'chats', chat[0])
                await updateDoc(chatRef, {
                    active: false
                })

                if (fireStoreUser?.profilePictureURL) {
                    const userChatRef = doc(db, 'userChats', chat[1].userInfo.userId)
                    await updateDoc(userChatRef, {
                        [chat[0] + '.userInfo']: {
                            firstName: fireStoreUser.firstName,
                            lastName: fireStoreUser.lastName,
                            userId: fireStoreUser.userId,
                            profilePictureURL: ""
                        }
                    })
                }
            })

            const userRef = doc(db, 'users', uid)
            await deleteDoc(userRef)

            const userChatRef = doc(db, 'userChats', uid)
            await deleteDoc(userChatRef)

            await currentUser.delete()

            return { status: 'success', message: 'Account successfully deleted.' }
        }
        catch (error: any) {
            switch (error.code) {
                case 'auth/weak-password': {
                    return { status: 'error', message: 'Weak Password.' }
                }
                case 'auth/invalid-email': {
                    return { status: 'error', message: 'Please provide a valid email.' }
                }
                case 'auth/wrong-password': {
                    return { status: 'error', message: 'Wrong password please provide your current password, or reset your password through email.' }
                }
                case 'auth/too-many-requests': {
                    return { status: 'error', message: 'You have sent too many requests please try again in a bit.' }
                }
                default: {
                    return { status: 'error', message: error.code }
                }
            }
        }
    }

    async function getUser(userId: string): Promise<DataResponse> {
        try {
            const userRef = doc(db, 'users', userId)
            const user = await getDoc(userRef)

            if (!user.exists()) {
                return { status: 'error', message: 'No user found' }
            }

            return { status: 'success', data: user }

        } catch (error: any) {
            return { status: 'error', message: error.code }
        }

    }

    async function createUserChat(user: DocumentSnapshot): Promise<DataResponse> {
        try {
            const otherChatUser = user.data()
            if (currentUser?.uid! === otherChatUser?.userId) {
                return { status: 'error', message: 'can not add yourself' }
            }

            const combinedId =
                currentUser?.uid! > otherChatUser?.userId ?
                    currentUser?.uid! + otherChatUser?.userId :
                    otherChatUser?.userId + currentUser?.uid!


            if (chats?.data()![combinedId])
                return { status: 'error', message: 'User already added' }


            const chatRef = doc(db, 'chats', combinedId)
            await setDoc(chatRef, {
                active: true,
                user1: currentUser?.uid,
                user2: otherChatUser?.userId,
                messages: []
            })

            const currentUserChatRef = doc(db, 'userChats', currentUser?.uid!)
            await updateDoc(currentUserChatRef, {
                [combinedId + ".userInfo"]: {
                    userId: otherChatUser?.userId!,
                    firstName: otherChatUser?.firstName,
                    lastName: otherChatUser?.lastName,
                    ...(otherChatUser?.profilePictureURL && otherChatUser?.profilePictureURL)
                },
                [combinedId + ".lastMessage"]: {

                },
                [combinedId + ".unOpened"]: {
                    count: 0
                }
            })

            const otherUserChatRef = doc(db, 'userChats', otherChatUser?.userId!)
            await updateDoc(otherUserChatRef, {
                [combinedId + '.userInfo']: {
                    userId: fireStoreUser?.userId!,
                    firstName: fireStoreUser?.firstName,
                    lastName: fireStoreUser?.lastName,
                    profilePictureURL: fireStoreUser?.profilePictureURL ? fireStoreUser?.profilePictureURL : '',
                },
                [combinedId + '.lastMessage']: {

                },
                [combinedId + ".unOpened"]: {
                    count: 0
                }
            })
            return { status: 'success', message: combinedId, }
        } catch (error: any) {
            console.log(error)
            return { status: 'error', message: error.code }
        }
    }

    function getChat(chatId: string, setter: Function): Unsubscribe {
        return onSnapshot(doc(db, "chats", chatId), (doc) => {
            setter(doc.data())
        })
    }

    async function sendMessage(text: string, chatId: string, receiverId: string): Promise<VoidResponse> {
        try {
            const message = {
                content: text,
                senderId: fireStoreUser?.userId,
                date: Timestamp.now()
            }

            const chatRef = doc(db, 'chats', chatId)
            await updateDoc(chatRef, {
                messages: arrayUnion(message)
            })

            const currentUserChatRef = doc(db, 'userChats', currentUser?.uid!)
            await updateDoc(currentUserChatRef, {
                [chatId + ".lastMessage"]: {
                    date: serverTimestamp(),
                    message: text
                }
            })

            const receiverUserChatRef = doc(db, 'userChats', receiverId)
            const userChats = await getDoc(receiverUserChatRef)
            await updateDoc(receiverUserChatRef, {
                [chatId + ".lastMessage"]: {
                    date: serverTimestamp(),
                    message: text,
                },
                [chatId + ".unOpened"]: {
                    count: Object.entries(userChats?.data()!)[0][1].unOpened.count + 1
                }
            })

            return { status: 'success', message: 'Message sent successfully' }

        } catch (error: any) {
            console.log(error)
            return { status: 'error', message: error.code }
        }
    }

    async function openMessages(chatId: string) {
        try {
            const userChatsRef = doc(db, 'userChats', currentUser?.uid!)
            await updateDoc(userChatsRef, {
                [chatId + ".unOpened"]: {
                    count: 0
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function updateName(firstName: string, lastName: string): Promise<VoidResponse> {
        try {
            const userRef = doc(db, 'users', currentUser?.uid!)
            await updateDoc(userRef, {
                firstName: firstName,
                lastName: lastName
            })
            Object.entries(chats?.data()!).forEach(async chat => {
                const userChatRef = doc(db, 'userChats', chat[1].userInfo.userId)
                await updateDoc(userChatRef, {
                    [chat[0] + '.userInfo']: {
                        firstName: firstName,
                        lastName: lastName,
                        userId: chat[1].userInfo.userId,
                        profilePictureURL: chat[1].userInfo.profilePictureURL
                    }
                })
            })
            return { status: 'success', message: 'Name updated successfully' }
        } catch (error) {
            console.log(error)
            return { status: 'error', message: "Name couldn't be updated." }
        }
    }

    return (
        <UserContext.Provider value={{
            currentUser,
            fireStoreUser,
            chats,
            onlineStatus,
            signUpWithEmail,
            logIn,
            sendResetPasswordLink,
            updatePassword,
            logOut,
            deleteAccount,
            updateProfilePicture,
            getUser,
            createUserChat,
            getChat,
            sendMessage,
            changeOnlineStatus,
            openMessages,
            updateName,
        }}>
            {!loading && children}
        </UserContext.Provider>
    )
}