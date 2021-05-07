import React, { Component } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import './EventsComponent.css'
import GroupAvatars from '../../components/Avatar'
import logo from './logo.png'

class EventsComponent extends Component {
	render() {
		return (
			<div className='card-events'>
				<Card fluid style={({ width: '540px' }, { height: '270px' })}>
					<Image className='events-image' src={logo} />

					<div className='events-text'>
						<div className='events-text2'>
							<h3>{this.props.title}</h3>
							<div className='body-events-text'>
								<p>{this.props.body}</p>
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

							<h4>Participants</h4>
							<GroupAvatars></GroupAvatars>
						</div>
					</div>
				</Card>
			</div>
		)
	}
}
export default EventsComponent
