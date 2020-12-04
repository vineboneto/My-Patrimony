import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ComputerRegister from './pages/ComputerRegister'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/computer-register" component={ComputerRegister} />
        </BrowserRouter>
    )
}