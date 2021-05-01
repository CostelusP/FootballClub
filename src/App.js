import React from 'react'
import Club from './admin/Clubs/Club'
import './Components.css'
import { Route, Redirect, Switch } from 'react-router-dom'
import Events from './common/Events/Events'
import SelectedEvents from './common/Events/SelectedEvents/SelectedEvents'
import SelectedClub from './admin/Clubs/selected-club/selected-club'
import Coach from './admin/Coaches/Coach'
import Athletes from './common/Athletes/Athletes'

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
