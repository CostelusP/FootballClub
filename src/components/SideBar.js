import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import '../Components.css'
import events_logo from '../assets/Events.svg'
import club_logo from '../assets/Clubs.svg'
import coaches_logo from '../assets/Coaches.svg'
import athletes_logo from '../assets/Athletes.svg'
import events_logo_white from '../assets/Events-white.svg'
import club_logo_white from '../assets/Clubs-White.svg'
import coaches_logo_white from '../assets/Coaches-white.svg'
import athletes_logo_white from '../assets/Athletes-white.svg'
import logout from '../assets/log-out.svg'
import avatar from '../assets/person.jpg'
import { LogOutDiv, LogOut } from '../styledComponents'

class SideBar extends Component {
	state = {
		coachespressed: false,
		athletespressed: false,
		clubsspressed: false,
		eventpressed: false,
		admin: true,
	}

	role = localStorage.getItem('role')
	name = localStorage.getItem('user')

	pressedHandlerClubs = () => {
		this.setState({
			coachespressed: false,
			athletespressed: false,
			clubsspressed: true,
			eventpressed: false,
		})
	}

	pressedHandlerAthletes = () => {
		this.setState({
			coachespressed: false,
			athletespressed: true,
			clubsspressed: false,
			eventpressed: false,
		})
	}

	pressedHandlerCoaches = () => {
		this.setState({
			coachespressed: true,
			athletespressed: false,
			clubsspressed: false,
			eventpressed: false,
		})
	}

	logOutHandler = () => {
		localStorage.clear()
		window.location.reload()
	}

	pressedHandlerEvents = () => {
		this.setState({
			coachespressed: false,
			athletespressed: false,
			clubsspressed: false,
			eventpressed: true,
		})
	}
	render() {
		return (
			<div className='sidebar'>
				<div className='sidebar-user'>
					<Image src={avatar} className='sidebar-icon' />
					<p className='sidebar-user-name'>{this.name}</p>
					<p className='sidebar-user-role'>
						{this.role === 'Administrator' ? 'Administrator' : 'Coach'}
					</p>
				</div>
				<div className='button-zone'>
					<div></div>
					<NavLink to='/coach' activeClassName='active'>
						<button
							className={
								this.role === 'Administrator'
									? 'sidebar-buttons'
									: 'coaches-button'
							}
							onClick={this.pressedHandlerCoaches}
						>
							<img
								alt='WhiteOrBlackImage'
								src={
									this.state.coachespressed ? coaches_logo_white : coaches_logo
								}
								className='button-icon'
							/>
							Coaches
						</button>
					</NavLink>

					<NavLink to='/events' activeClassName='active'>
						<button
							className='sidebar-buttons'
							onClick={this.pressedHandlerEvents}
						>
							<img
								alt='WhiteOrBlackImage'
								src={this.state.eventpressed ? events_logo_white : events_logo}
								className='button-icon'
							/>
							Events
						</button>
					</NavLink>
					<NavLink to='/clubs' activeClassName='active'>
						<button
							className='sidebar-buttons'
							onClick={this.pressedHandlerClubs}
						>
							<img
								alt='WhiteOrBlackImage'
								src={this.state.clubsspressed ? club_logo_white : club_logo}
								className='button-icon'
							/>
							Clubs
						</button>
					</NavLink>
					<NavLink to='/players' activeClassName='active'>
						<button
							className='sidebar-buttons'
							onClick={this.pressedHandlerAthletes}
						>
							<img
								alt='WhiteOrBlackImage'
								src={
									this.state.athletespressed
										? athletes_logo_white
										: athletes_logo
								}
								className='button-icon'
							/>
							Players
						</button>
					</NavLink>
				</div>
				<LogOut onClick={this.logOutHandler}>
					<img alt='logout' src={logout} />
					<LogOutDiv>Logout</LogOutDiv>
				</LogOut>
			</div>
		)
	}
}

export default SideBar
