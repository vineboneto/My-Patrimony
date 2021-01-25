import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from 'pages/Home'
import { Patrimony as PatrimonyForm } from 'pages/Forms'
import { Patrimony as PatrimonyList } from 'pages/List'
import Transfer from 'pages/Transfer'
import Test from './pages/Test'

export default function Routes() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route exact path="/patrimony/:id" component={PatrimonyForm} />
			<Route exact path="/patrimony/" component={PatrimonyForm} />
			<Route exact path="/patrimony-transfer" component={Transfer} />
			<Route path="/patrimonies" component={PatrimonyList} />
			<Route path="/test/" component={Test} />
		</BrowserRouter>
	)
}
