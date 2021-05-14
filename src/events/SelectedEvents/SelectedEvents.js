import React, { Component } from 'react'
import ImageEvent from './Rectangle30.png'
import './SelectedEvents.css'
import ModalEvents from '../../modals/ModalEvents'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import { Image, Icon, Card, Checkbox } from 'semantic-ui-react'
import ShowPersonEvent from './ShowPersonEvent/ShowPersonEvent'
import ModalAdded from '../../modals/ModalAdded'
import ModalDeleted from '../../modals/ModalDeleted'

class SelectedEvents extends Component {
	state = {
		show: false,
		showAdd: false,
		showDelete: false,
		displaycheck: false,
		eventselected: [],
		EventAdded: '',
	}
	EventIsAdded = (response) => {
		this.setState({ EventAdded: response })
	}
	hideModal = () => {
		this.setState({
			show: false,
			showDelete: false,
			showAdd: false,
		})
	}

	hideAddConfirm = () => {
		this.setState({
			show: false,
			showAdd: true,
		})
	}

	handleOpenModal = () => {
		this.setState({ show: true })
	}

	passData = () => {
		return this.props.location.state
	}

	handleCloseModal = () => {
		this.setState({ show: false })
	}
	handleEditCard = () => {
		if (this.state.displaycheck === false) {
			this.setState({ displaycheck: true })
			this.setState({ buttonChange: 'DONE' })
		} else {
			this.setState({ displaycheck: false })
			this.setState({ buttonChange: 'Compare Performance' })
		}
	}

	componentDidMount() {
		let url = `http://34.65.176.55:8081/api/event/detail/${this.props.location.state.eventid}/`
		const token = localStorage.getItem('token')
		axios
			.get(url, {
				headers: { Authorization: token },
			})
			.then((response) => {
				this.setState({ eventselected: response.data })
			})
	}
	render() {
		return (
			<div className='cards-event'>
				<div className='page-top'>
					<div className='label-event'>
						<h3>{'Events > '}</h3>
						<h2> {this.state.eventselected.name}</h2>
					</div>

					<div className='div-event-button-edit'>
						<h2> {this.state.eventselected.name}</h2>
						<button
							className='event-button-edit'
							onClick={this.handleOpenModal}
						>
							EDIT
						</button>
					</div>
					<div className='event-bar'>
						<Icon name='calendar alternate outline' />
						<p>{this.state.eventselected.date}</p>

						<div className='time-event'>
							<Icon name='clock outline' />
							<p>{this.state.eventselected.time}</p>
						</div>
						<div className='location-event'>
							<Icon name='location arrow ' />
							<p>{this.state.eventselected.location}</p>
						</div>
					</div>
				</div>
				<div className='card-event'>
					<Card centered fluid>
						<Image src={ImageEvent} wrapped ui={false} />
						<Card.Content className='card-content-event'>
							<div className='first-paragraph'>
								<h3>{this.state.eventselected.description}</h3>
								<p>{this.state.eventselected.description}</p>
							</div>
						</Card.Content>
					</Card>
				</div>

				<div className='athletes-bottom-page'>
					<div className='cards-features'>
						<h3>Participants ({this.props.CountNumberParticipantsEvent})</h3>

						<button
							className='event-button-compare'
							onClick={this.handleEditCard}
						>
							{this.state.displaycheck ? 'Done' : 'Compare Performance'}
						</button>
					</div>
					<div>
						{this.state.displaycheck ? (
							<p className='paragraph-select-athlete'>
								Select participants you want to compare
							</p>
						) : null}
					</div>
					<div className='show-person-parent'>
						{this.state.eventselected.participants_detail &&
							this.state.eventselected.participants_detail.map(
								(sevent, index) => (
									<ShowPersonEvent
										checkboxdisplay={this.state.displaycheck}
										name={sevent.first_name + ' ' + sevent.first_name}
									/>
								)
							)}
					</div>

					<div>
						{this.state.displaycheck ? (
							<div>
								<p className='paragraph-metrics'>
									Select metrics you want to be compared
								</p>
								<div className='metrics'>
									<div className='metric'>
										<Checkbox className='select-metric' label='Heart rate' />
									</div>
									<div className='metric'>
										<Checkbox className='select-metric' label='Calories' />
									</div>
									<div className='metric'>
										<Checkbox className='select-metric' label='Av.speed' />
									</div>
									<div className='metric'>
										<Checkbox className='select-metric' label='Distance' />
									</div>
								</div>
								<Bar
									data={this.state.barChartData}
									options={{
										title: {
											display: true,
											text: 'Graph',
											fontSize: 20,
										},
										legend: {
											display: true,
											position: 'right',
										},
									}}
									width={400}
									height={200}
								/>
							</div>
						) : null}
					</div>
				</div>

				<ModalEvents
					NameModalEvents='Edit Event'
					handleOpenModal={this.state.show}
					handleCloseModal={this.handleCloseModal}
					IdEvent={this.props.location.state.eventid}
					hideAddConfirm={this.hideAddConfirm}
					eventselected={this.state.eventselected}
					EventAdded={this.EventIsAdded}
					editForm={true}
				/>
				<ModalAdded
					hideAddConfirm={this.state.showAdd}
					hideModal={this.hideModal}
					name={'Event Modified'}
					description={`Event "${this.state.EventAdded}" was modified with succes!`}
				/>
				<ModalDeleted
					hideAddConfirm={this.state.showDelete}
					hideModal={this.hideModal}
					setName={this.nameHandle}
					title={'Delete Event'}
					name={this.state.nameDeleted}
					ConfirmDelete={this.deleteItem}
					description={
						'If you delete this event, all data associated with this event will permanently deleted.'
					}
				/>
			</div>
		)
	}
}

export default SelectedEvents
