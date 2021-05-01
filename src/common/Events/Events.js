import React, { Component } from 'react'
import EventsComponent from './EventsComponent/EventsComponent'
import './Events.css'
import { Pagination, Input, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import ModalEvents from './ModalEvents'
import ModalAdded from '../Modals/ModalAdded'
import ModalDeleted from '../Modals/ModalDeleted'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
	Button,
	PagesContent,
	PagesTitle,
	PaginationDiv,
} from '../../styledComponents'

class Events extends Component {
	state = {
		membersClicked: false,
		show: false,
		showDelete: false,
		showAdd: false,
		events: [],
		ongoingevents: false,
		numberpages: 0,
		page: 1,
		search: '',
		time: 1,
		EventAdded: '',
		InClub: '',
	}

	CallPoint = () => {
		let url = `http://34.65.176.55:8081/api/event/all/events/?page=1&search=${this.state.search}&time=${this.state.time}&limit=10/`
		const token = localStorage.getItem('token')
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			this.setState({ events: response.data.events })
			this.setState({ numberpages: response.data.page_number })
		})
	}

	EventIsAdded = (response) => {
		this.setState({ EventAdded: response })
	}

	AddedInClub = (response) => {
		this.setState({ InClub: response })
	}

	showModal = () => {
		this.setState({ show: true })
	}

	// componentDidUpdate(prevProps, prevState) {
	//   if (prevProps.time !== this.state.time) {
	//     this.setState({ time: prevProps.time });
	//     this.CallPoint();
	//   }
	// }

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

	hideDeleteConfirm = () => {
		this.setState({
			show: false,
			showDelete: true,
		})
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
				time: 1,
			},
			() => {
				this.CallPoint()
			}
		)
	}

	presshandlePast = () => {
		this.setState(
			{
				time: 3,
			},
			() => {
				this.CallPoint()
			}
		)
	}

	presshandleFuture = () => {
		this.setState(
			{
				time: 2,
			},
			() => {
				this.CallPoint()
			}
		)
	}

	componentDidMount() {
		let url = `http://34.65.176.55:8081/api/event/all/events/?page=1&search=${this.state.search}&time=${this.state.time}&limit=10/`
		const token = localStorage.getItem('token')
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			this.setState({ events: response.data.events })
			this.setState({ numberpages: response.data.page_number })
		})
	}

	setNumPage = (event, { activePage }) => {
		this.setState({ page: activePage })
		let url = `http://34.65.176.55:8081/api/event/all/events/?page=${activePage}&time=${this.state.time}&limit=10/`
		const token = localStorage.getItem('token')
		axios
			.get(url, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				this.setState({ events: response.data.events })
				this.setState({ numberpages: response.data.page_number })
			})
	}
	hadleInput = (date) => {
		this.setState({ search: date.target.value }, () => {
			this.CallPoint()
		})
	}
	render() {
		return (
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
									onClick: this.searchHandler,
								}}
								onChange={this.searchStringHandler}
								placeholder='Search...'
							/>
						</GridColumn>
						<GridColumn floated='right' align='right' computer='6' tablet='8'>
							<Button onClick={this.showModal}>ADD NEW</Button>
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
							this.state.events.map((event, index) => (
								<Link
									to={{
										pathname: `/event/detail/${event.id}`,
										state: { eventid: event.id },
									}}
									className='style-card-events-link'
								>
									<EventsComponent
										cardId={event.id}
										title={event.name}
										body={event.description}
										time={event.time}
										date={event.date}
										location={event.location}
									/>
								</Link>
							))}
					</div>
				</Grid>
				<PaginationDiv>
					<Pagination
						defaultActivePage={1}
						totalPages={this.state.numberpages}
						onPageChange={this.setNumPage}
						activePage={this.state.page}
					/>
				</PaginationDiv>

				<ModalEvents
					NameModalEvents='Add Event'
					handleOpenModal={this.state.show}
					handleCloseModal={this.handleCloseModal}
					showModal={this.state.show}
					hideModal={this.hideModal}
					hideAddConfirm={this.hideAddConfirm}
					EventAdded={this.EventIsAdded}
					InClub={this.AddedInClub}
				/>

				<ModalDeleted
					hideAddConfirm={this.state.showDelete}
					hideModal={this.hideModal}
				/>
				<ModalAdded
					hideAddConfirm={this.state.showAdd}
					hideModal={this.hideModal}
					name={'Event Added'}
					description={`Event "${this.state.EventAdded}" was added on "${this.state.InClub}"`}
				/>

				<div className='events-component'>
					{this.state.events &&
						this.state.events.map((event, index) => (
							<Link
								to={{
									pathname: `/event/detail/${event.id}`,
									state: { eventid: event.id },
								}}
								className='style-card-events-link'
							>
								<EventsComponent
									cardId={event.id}
									title={event.name}
									body={event.description}
									time={event.time}
									date={event.date}
									location={event.location}
								/>
							</Link>
						))}
				</div>
			</PagesContent>
		)
	}
}
export default Events
