import './App.css'
import styled from 'styled-components'
import { Authentication } from './components/auth/index'
import imageLogin from './assets/images/loginImage.jpg'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
const AppContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: url(${imageLogin}) no-repeat center center fixed;
	background-size: cover;
`

function App() {
	return (
		<Router>
			<AppContainer>
				<Switch>
					<Route path='/auth' component={Authentication} exact />
				</Switch>
			</AppContainer>
		</Router>
	)
}

export default App
