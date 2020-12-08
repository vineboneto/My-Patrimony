import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import ComputerForm from './pages/ComputerForm';
import Home from './pages/Home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/computer-form" component={ComputerForm} />
            <Route exact path="/" component={Home} />
        </BrowserRouter>
    )
}