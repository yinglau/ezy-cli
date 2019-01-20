import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'

import HomePage from '../HomePage'

export default function App () {
  return (
    <div>
      <div>this is header</div>
      <div>
        <Link to={'/'}>home</Link><br />
      </div>
      <Switch>
        <Route exact path={'/'} component={HomePage} />
      </Switch>
      <div>this is footer</div>
    </div>
  )
}
