import MainLayout from "../components/layout/MainLayout"
import { lazy, Suspense } from 'react'
import LoadingSpinner from "../components/UI/LoadingSpinner"
import { Routes, Route } from 'react-router-dom'
import { userAuth } from "../context/authContext/authContext"

const Chats = lazy(() => import('./Chats'))
const FindChat = lazy(() => import("../components/FindChat"))
const SingleChat = lazy(() => import("./SingleChat"))
const Friends = lazy(() => import("./Friends"))
const Settings = lazy(() => import('./Settings'))
const ChatsErrorPage = lazy(() => import('../components/ChatsErrorPage'))

export default function Home() {
    const { chats } = userAuth()

    return (
        <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route
                        path="/chats"
                        element={<Chats chats={chats} />}
                    />

                    <Route path="/chat/:chatId"
                        element={<FindChat />}
                    >
                        <Route
                            index
                            element={<SingleChat chats={chats} />}
                        />
                    </Route>

                    <Route
                        path="/friends"
                        element={<Friends chats={chats} />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />
                    <Route path='*' element={<ChatsErrorPage />} />
                </Routes>
            </Suspense>
        </MainLayout>
    )
}
