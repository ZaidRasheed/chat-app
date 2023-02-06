import './App.css'
import AuthContextProvider from "./context/authContext/authContext"
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import PrivateRoutes from './routes/PrivateRoutes'
import PublicRoutes from "./routes/PublicRoutes"

import LoadingSpinner from './components/UI/LoadingSpinner'

const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Home = lazy(() => import('./pages/Home'))

import Error from './pages/Error404'

function App() {

  return (
    <AuthContextProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/profile/*' element={<Home />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </Suspense>
    </AuthContextProvider>
  )
}

export default App
