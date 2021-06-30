import React, { Component } from 'react'
import EventsComponent from './EventsComponent/EventsComponent'
import './Events.css'
import { Pagination, Input, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import ModalEvents from '../modals/ModalEvents'
import axios from 'axios'
import {
	Button,
	PagesContent,
	PagesTitle,
	PaginationDiv,
} from '../styledComponents'

class Events extends Component {
	state = {
		show: false,
		showDelete: false,
		showAdd: false,
		events: [],
		ongoingevents: false,
		numberpages: 0,
		page: 1,
		search: '',
		time: 'prezent',
		EventAdded: '',
		InClub: '',
	}

	getEvents = () => {
		let search = ''
		if (this.state.search) search = this.state.search
		let url = `http://localhost:3100/events/?page=1&search=${search}&limit=4&time=${this.state.time}`
		const token = localStorage.getItem('token')
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			console.log(response)
			this.setState({ events: response.data.events })
			this.setState({ numberpages: response.data.page_number })
		})
	}

	componentDidUpdate(prevProps, prevState) {
		// if (prevProps.time !== this.state.time) {
		// 	this.setState({ time: prevProps.time })
		// 	this.getEvents()
		// }
		if (prevProps.search !== this.state.search) {
			this.setState({ search: prevProps.search })
			this.getEvents()
		}
	}

	handleOpenModal = () => {
		this.setState({ show: true })
	}

	handleCloseModal = () => {
		this.setState({ show: false })
	}

	presshandleOngoing = () => {
		this.setState(
			{
				time: 'prezent',
			},
			() => {
				this.getEvents()
			}
		)
	}

	presshandlePast = () => {
		this.setState(
			{
				time: 'past',
			},
			() => {
				this.getEvents()
			}
		)
	}

	presshandleFuture = () => {
		this.setState(
			{
				time: 'future',
			},
			() => {
				this.getEvents()
			}
		)
	}

	componentDidMount() {
		this.getEvents()
	}

	setNumPage = (event, { activePage }) => {
		this.setState({ page: activePage })
		const search = ''
		let url = `http://localhost:3100/events/?page=${activePage}&search=${search}&limit=4&time=${this.state.time}`
		const token = localStorage.getItem('token')
		axios
			.get(url, { headers: { Authorization: token } })
			.then((response) => {
				console.log(response)
				this.setState({ events: response.data.events })
				this.setState({ numberpages: response.data.page_number })
			})
			.then((response) => {})
			.catch((err) => {
				alert(err)
			})
	}

	hadleInput = (date) => {
		this.setState({ search: date.target.value }, () => {})
	}

	render() {
		return (
			<div>
				<PagesContent>
					<PagesTitle>Events</PagesTitle>
					<Grid>
						<GridRow>
							<GridColumn floated='left' align='left' computer='8' tablet='8'>
								<Input
									className='search-bar'
									iconPosition='left'
									icon={{
										name: 'search',
										link: true,
									}}
									onChange={this.hadleInput}
									placeholder='Search...'
								/>
							</GridColumn>
							<GridColumn floated='right' align='right' computer='6' tablet='8'>
								<Button onClick={this.handleOpenModal}>ADD NEW</Button>
							</GridColumn>
						</GridRow>
						<GridRow align='left' computer='8' tablet='8'>
							<button
								style={{ marginLeft: '45px' }}
								className='but'
								active
								onClick={this.presshandleOngoing}
							>
								Ongoing
							</button>
							<button className='but' onClick={this.presshandleFuture}>
								Future
							</button>
							<button className='but' onClick={this.presshandlePast}>
								Past
							</button>
						</GridRow>

						<div className='events-component'>
							{this.state.events &&
								this.state.events.map((event, index) => {
									const event_date = event.event_date
										.substring(0, event.event_date.indexOf('T'))
										.split('-')
									const date = `${event_date[2]}.${event_date[1]}.${event_date[0]}`
									const event_time = event.event_date
										.substring(event.event_date.indexOf('T') + 1)
										.split(':')
									const time = `${event_time[0]}:${event_time[1]}`

									return (
										<EventsComponent
											cardId={event.id}
											title={event.name}
											body={event.description}
											time={time}
											date={date}
											location={event.location}
											eventToEdit={event}
											isOfficial={event.is_official}
											score={event.score}
											getEvents={this.getEvents}
											handleCloseModal={this.handleCloseModal}
											eventType={this.state.time}
										/>
									)
								})}
						</div>
					</Grid>
					<PaginationDiv>
						<Pagination
							totalPages={this.state.numberpages}
							onPageChange={this.setNumPage}
							activePage={this.state.page}
						/>
					</PaginationDiv>
				</PagesContent>
				<ModalEvents
					nameModalEvent='Create Event'
					eventToEdit={null}
					handleOpenModal={this.state.show}
					handleCloseModal={this.handleCloseModal}
					getEvents={this.getEvents}
				/>
			</div>
		)
	}
}
export default Events
