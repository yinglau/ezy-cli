import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './style.css'
import HomePage from '../HomePage'
import Header from '../../components/Header'

export default function App () {
  return (
    <div>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path={'/'} component={HomePage} />
        </Switch>
      </div>
    </div>
  )
}
