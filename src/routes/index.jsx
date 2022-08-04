import { useState } from "react"
import { Route, Switch } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Registration from "../pages/Registration"

function Routes (){

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    return (
        <Switch>
            <Route exact path='/'>
                <Login setUser={setUser}/>
            </Route>
            <Route exact path='/registration'>
                <Registration/>
            </Route>
            <Route exact path='/dashboard'>
               <Dashboard user={user} setUser={setUser}/> 
            </Route>
        </Switch>
    )
}

export default Routes