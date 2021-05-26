import React, { Component } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import ModalEvents from '../../modals/ModalEvents'
import './EventsComponent.css'
import logo from './logo.png'

class EventsComponent extends Component {
	state = {
		show: false,
	}

	showModal = () => {
		this.setState({ show: true })
	}

	hideModal = () => {
		this.setState({ show: false })
	}

	render() {
		return (
			<div>
				<Card className='root' onClick={this.showModal}>
					<Image src={logo} className='events-image' />
					<div style={{ width: '250px', color: 'black' }}>
						{this.props.eventType === 'prezent' ? (
							<div className='score-match'>Pending</div>
						) : null}
						{this.props.eventType === 'past' ? (
							this.props.isOfficial === 'Official Event' ? (
								<div className='score-match'>{this.props.score}</div>
							) : (
								<div className='score-match'>Finished</div>
							)
						) : null}
						{this.props.eventType === 'future' ? (
							<div className='score-match'>Good luck</div>
						) : null}
						<h3 className='h3-event-details'>{this.props.title}</h3>
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
						<div className='official-event'>{this.props.isOfficial}</div>
					</div>
				</Card>
				<ModalEvents
					eventToEdit={this.props.eventToEdit}
					nameModalEvent='Edit Event'
					handleOpenModal={this.state.show}
					handleCloseModal={this.hideModal}
					getEvents={this.props.getEvents}
				/>
			</div>
		)
	}
}
export default EventsComponent
