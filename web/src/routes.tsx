import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ComputerForm from './pages/ComputerForm'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/computer-form" component={ComputerForm} />
        </BrowserRouter>
    )
}