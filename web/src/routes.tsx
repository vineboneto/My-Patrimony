import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from 'pages/Home'
import { Patrimony as PatrimonyForm } from 'pages/Forms'
import PatrimonyList from 'pages/PatrimonyList'
import Swap from 'pages/Swap'
import Test from './pages/Test'

export default function Routes() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route path="/patrimony/create" component={PatrimonyForm} />
			<Route path="/patrimony/edit/:id" component={PatrimonyForm} />
			<Route path="/patrimony/swap" component={Swap} />
			<Route path="/patrimonies" component={PatrimonyList} />
			<Route path="/test/" component={Test} />
		</BrowserRouter>
	)
}
