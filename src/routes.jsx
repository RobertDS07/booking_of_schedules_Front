import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import RegisterLogin from './components/RegisterLogin'

export default () => {

    return(
        <Router>
            <Switch>
                <Route exact path='/'>
                    <RegisterLogin/>
                </Route>

                <Route path='/register'>
                    <RegisterLogin register='true'/>
                </Route>

                <Route path='*'>
                    <h1>nothing</h1>
                </Route>
            </Switch>
        </Router>
    )
}