import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import ComputerForm from './pages/ComputerForm';
import Home from './pages/Home';
import MonitorForm from './pages/MonitorForm'
import Test from './pages/Test'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/computer-register/" component={ComputerForm} />
            <Route path="/monitor-register/" component={MonitorForm} />
            <Route path="/test/" component={Test} />
        </BrowserRouter>
    )
}