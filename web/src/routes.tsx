import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import ComputerForm from './pages/ComputerForm'
import Home from './pages/Home'
import MonitorForm from './pages/MonitorForm'
import OwnerForm from './pages/OwnerForm'
import PrinterForm from './pages/PrinterForm';
import StabiliserForm from './pages/StabiliserForm'

import PatrimonyList from './pages/PatrimonyList'
import Test from './pages/Test'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/computer-register/" component={ComputerForm} />
            <Route path="/monitor-register/" component={MonitorForm} />
            <Route path="/owner-register/" component={OwnerForm} />
            <Route path="/printer-register/" component={PrinterForm} />
            <Route path="/stabiliser-register/" component={StabiliserForm} />
            <Route path="/patrimony-list/" component={PatrimonyList} />
            <Route path="/test/" component={Test} />
        </BrowserRouter>
    )
}