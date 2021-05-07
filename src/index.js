import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Layout from './App'
import * as serviceWorker from './serviceWorker'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import SideBar from './components/SideBar'

import { Authentication } from './auth/index'

require('typeface-inter')

const App = () => {
	const token = localStorage.getItem('token')
	if (token) {
		return (
			<BrowserRouter>
				<div className='rendered'>
					<SideBar />
					<Layout />
				</div>
			</BrowserRouter>
		)
	}
	return (
		<BrowserRouter>
			<Redirect from='/' to='/auth' />
			<Route path='/auth' component={Authentication} />
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
