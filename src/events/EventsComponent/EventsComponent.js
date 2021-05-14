import React, { Component } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import './EventsComponent.css'
import GroupAvatars from '../../components/Avatar'
import logo from './logo.png'

class EventsComponent extends Component {
	render() {
		return (
			<Card className='root'>
				<Image src={logo} className='events-image' />
				<div>
					<h3>{this.props.title}</h3>
					<div className='body-events-text'>
						<p>asdgfasasdgadsgasdgagfgasddgsag</p>
					</div>

					<div className='events-card-details'>
						<div className='events-calendar'>
							<Icon name='calendar alternate outline' />
							<p>{this.props.date}</p>
						</div>

						<div className='events-time'>
							<Icon name='clock outline' />
							<p>{this.props.time}</p>
						</div>
					</div>
					<div className='events-location'>
						<Icon name='location arrow ' />
						<p>{this.props.location}</p>
					</div>
				</div>
			</Card>
		)
	}
}
export default EventsComponent
