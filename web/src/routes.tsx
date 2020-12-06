import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
// import ComputerForm from './pages/ComputerForm'
import ComputerForm from './pages/Register/ComputerForm';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/computer-form" component={ComputerForm} />
        </BrowserRouter>
    )
}