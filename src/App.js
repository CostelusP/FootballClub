import './App.css'
import styled from 'styled-components'
import { Authentication } from './components/auth/index'
import imageLogin from './assets/images/loginImage.jpg'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SideBar from './components/home/home'

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/auth' component={Authentication} exact />
				<Route path='/home' component={SideBar} exact />
			</Switch>
		</Router>
	)
}

export default App
