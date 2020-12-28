import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import PatrimonyForm from './pages/PatrimonyForm'
import Test from './pages/Test'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/patrimony-register" component={PatrimonyForm} />
            <Route path="/test/" component={Test} />
        </BrowserRouter>
    )
}