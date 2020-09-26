import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import RegisterLogin from './components/RegisterLogin'
import Main from './components/Main'

export default () => {
  const [logged, setLogged] = useState(localStorage.getItem('authorization'))

  if (!!logged) {
    const verifyToken = (async logged => {
      const token = await axios.post(process.env.API || 'http://localhost:8081/graphql', {
        query: `
            {
              checkToken(token: "${logged}")
            }
          `
      })

      const { checkToken } = await token.data.data
      return checkToken

    })(logged)

    verifyToken.then(e => {
      if (!e) {
        setLogged(false)
        localStorage.clear()
      }
    })
  }


  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {!!logged && <Redirect to='/home' />}
          <RegisterLogin setLogged={setLogged} />
        </Route>

        <Route path='/register'>
          {!!logged && <Redirect to='/home' />}
          <RegisterLogin register='true' setLogged={setLogged} />
        </Route>

        <Route path='/home'>
          {!logged && <Redirect to='/' />}
          <Main />
        </Route>

        <Route path='*'>
          <h1>nothing</h1>
        </Route>
      </Switch>
    </Router>
  )
}