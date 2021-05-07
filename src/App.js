import React from 'react'
import Club from './clubs/Club'
import './Components.css'
import { Route, Redirect, Switch } from 'react-router-dom'
import Events from './events/Events'
import SelectedEvents from './events/SelectedEvents/SelectedEvents'
import SelectedClub from './clubs/selected-club/SelectedClub'
import Coach from './coaches/Coach'
import Athletes from './athletes/Athletes'

function App() {
	return (
		<div>
			<Switch>
				<Route path='/athletes' component={Athletes} />
				<Route exact path='/clubs/:id' component={SelectedClub} />
				<Route exact path='/clubs' component={Club} />
				<Route path='/coach' component={Coach} />
				<Route path='/events' component={Events} />
				<Route exact path='/event/:cardId' component={SelectedEvents} />
				<Route path='/event' component={SelectedEvents} />
				<Redirect from='/' to='/clubs' />
			</Switch>
		</div>
	)
}

export default App
