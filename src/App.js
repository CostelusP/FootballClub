import React from 'react'
import Club from './clubs/Club'
import './Components.css'
import { Route, Redirect, Switch } from 'react-router-dom'
import Events from './events/Events'
import SelectedClub from './clubs/selected-club/SelectedClub'
import Coach from './coaches/Coach'
import Players from './athletes/Athletes'

function App() {
	return (
		<div>
			<Switch>
				<Route path='/players' component={Players} />
				<Route exact path='/clubs/:id' component={SelectedClub} />
				<Route exact path='/clubs' component={Club} />
				<Route path='/coach' component={Coach} />
				<Route path='/events' component={Events} />
				<Redirect from='/' to='/clubs' />
			</Switch>
		</div>
	)
}

export default App
