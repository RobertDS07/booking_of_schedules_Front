import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import RegisterLogin from './components/RegisterLogin'

export default () => {
    const [logged, setLogged] = useState(false)

    const token = localStorage.getItem('authorization')

    if (!!token && !logged) {
      const verifyToken = async token => 
        await axios.post(process.env.API || 'http://localhost:8081/graphql', {
          query: `
            {
              checkToken(token: "${token}")
            }
          `
        })
      verifyToken(token) ? setLogged(true) : localStorage.clear()
    }


    return(
        <Router>
            <Switch>
                <Route exact path='/'>
                    {!!logged && <Redirect to='/home' />}
                    <RegisterLogin setLogged={setLogged}/>
                </Route>

                <Route path='/register'>
                    {!!logged && <Redirect to='/home' />}
                    <RegisterLogin register='true' setLogged={setLogged}/>
                </Route>

                <Route path='/home'>
                    {!logged && <Redirect to='/' />}
                    <h1>home</h1>
                </Route>

                <Route path='*'>
                    <h1>nothing</h1>
                </Route>
            </Switch>
        </Router>
    )
}