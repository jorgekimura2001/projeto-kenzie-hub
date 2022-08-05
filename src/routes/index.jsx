import { useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Registration from "../pages/Registration"

function Router (){

    const [user, setUser] = useState({})

    const [loading, setLoading] = useState(false)

    return (
        <Routes>
            <Route path='/login' element={<Login setUser={setUser} loading={loading} setLoading={setLoading}/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}/>
            <Route path="*" element={<Navigate replace to='/login' />}/>
        </Routes>
    )
}

export default Router