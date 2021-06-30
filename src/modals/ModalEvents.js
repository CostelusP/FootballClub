import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Modal, Form, Icon, TextArea } from 'semantic-ui-react'
import * as moment from 'moment'
import './ModalEvents.css'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import close_icon from '../assets/close.svg'
import { Button, CancelButton, DeleteButton } from '../styledComponents'
import ModalAdded from './ModalAdded'
import ModalDeleted from './ModalDeleted'

class ModalEvents extends Component {
	state = {
		showAdded: false,
		showDeleted: false,
		name: '',
		body: '',
		date: '',
		time: '',
		location: '',
		img: '',
		isOfficial: 'false',
		clubs: [],
		club: '',
		idForDelete: -1,
	}
	options = [
		{
			key: 1,
			text: 'true',
			value: 'true',
		},
		{
			key: 2,
			text: 'false',
			value: 'false',
		},
	]

	ClubHandler = (e, result) => {
		this.setState({ club: result.value })
	}

	EventOfficialHandler = (e, result) => {
		console.log(result.value)
		this.setState({ isOfficial: result.value })
	}

	NameHandler = (data) => {
		this.setState({ name: data.target.value })
	}

	BodyHandler = (data) => {
		this.setState({ body: data.target.value })
	}

	DateHandler = (data) => {
		this.setState({ date: data.target.value })
	}

	TimeHandler = (data) => {
		this.setState({ time: data.target.value })
	}

	LocationHandler = (data) => {
		this.setState({ location: data.target.value })
	}

	setDefaultValues = () => {
		this.setState({
			body: '',
			date: '',
			time: '',
			location: '',
			is_official: 'false',
			img: '',
			address: '',
			club: '',
			name: '',
		})
	}

	addClickedHandler = () => {
		console.log(this.state.isOfficial)
		if (
			this.state.name.length > 0 &&
			this.state.body.length > 0 &&
			this.state.date.length > 0 &&
			this.state.time.length > 0 &&
			this.state.location.length > 0
		) {
			const token = localStorage.getItem('token')

			if (this.props.nameModalEvent === 'Edit Event') {
				moment(this.state.data).format('yyyy-mm-dd')
				const url = `http://localhost:3100/events/editEvent/?id=${this.props.eventToEdit.id}`
				axios
					.put(
						url,
						{
							img: this.state.img,
							is_official: this.state.isOfficial,
							name: this.state.name,
							event_date: this.state.date,
							event_time: this.state.time,
							description: this.state.body,
							location: this.state.location,
							club_id: this.state.club,
						},
						{
							headers: {
								Authorization: token,
							},
						}
					)
					.then((response) => {
						this.setState({ showAdded: true })
						this.setDefaultValues()
						this.props.getEvents()
						this.props.handleCloseModal()
					})

					.catch((error) => {
						alert(error)
					})
			} else {
				moment(this.state.data).format('yyyy-mm-dd')
				axios
					.post(
						`http://localhost:3100/events/createEvent`,
						{
							name: this.state.name,
							event_date: this.state.date,
							description: this.state.body,
							event_time: this.state.time,
							location: this.state.location,
							club_id: this.state.club,
							is_official: this.state.isOfficial,
						},
						{
							headers: {
								Authorization: token,
							},
						}
					)
					.then((response) => {
						this.setState({ showAdded: true })
						this.setDefaultValues()
						this.props.getEvents()
						this.props.handleCloseModal()
					})
					.catch((error) => {
						alert(error)
					})
			}
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps, nextState) {
		if (
			this.props.eventToEdit === nextProps.eventToEdit &&
			nextProps.eventToEdit !== null
		) {
			const event_date = nextProps.eventToEdit.event_date
				.substring(0, nextProps.eventToEdit.event_date.indexOf('T'))
				.split('-')
			const date = `${event_date[0]}-${event_date[1]}-${event_date[2]}`

			const event_time = nextProps.eventToEdit.event_date
				.substring(nextProps.eventToEdit.event_date.indexOf('T') + 1)
				.split(':')
			const time = `${event_time[0]}:${event_time[1]}`
			const isOfficial =
				nextProps.eventToEdit.is_official === 'T' ? 'true' : 'false'

			this.setState({
				name: nextProps.eventToEdit.name,
				location: nextProps.eventToEdit.location,
				body: nextProps.eventToEdit.description,
				date: date,
				time: time,
				club: nextProps.eventToEdit.club_id,
				isOfficial: isOfficial,
				idForDelete: nextProps.eventToEdit.id,
			})
		}
	}
	getClubs = () => {
		let url = 'http://localhost:3100/clubs/?search=default'
		const token = localStorage.getItem('token')
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			let clubs =
				response &&
				response.data &&
				response.data.map((item, index) => {
					return {
						key: item.club.id,
						text: item.club.name,
						value: item.club.id,
					}
				})
			this.setState({ clubs })
		})
	}
	componentDidMount() {
		this.getClubs()
	}

	deleteEvent = () => {
		const url = `http://localhost:3100/events/deleteEvent/?id=${this.state.idForDelete}`
		axios
			.delete(url, {
				headers: {
					Authorization: this.token,
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log('Deleted')
			})
			.catch((error) => {
				alert(error)
			})
	}
	hideModalDelete = () => {
		this.setState({
			showDeleted: false,
		})
	}
	showModalDelete = () => {
		this.setState({
			showDeleted: true,
		})
	}
	hideModalAdded = () => {
		this.setState({
			showAdded: false,
		})
	}

	render() {
		return (
			<div>
				<Modal
					open={this.props.handleOpenModal}
					close={this.props.handleCloseModal}
					className='modal-form'
				>
					<Modal.Content>
						<Form>
							<img
								src={close_icon}
								alt=''
								onClick={this.props.handleCloseModal}
								className='close-icon-athlete'
							/>
							<div>
								<h2>{this.props.nameModalEvent}</h2>
								<hr></hr>
								<div className='modal-form-inputs'>
									<Form.Input
										label='Name'
										defaultValue={this.state.name}
										placeholder='name'
										onChange={this.NameHandler}
										required
									/>
									<Form.Group widths='equal'>
										<Form.Input
											required
											label='Date'
											type='date'
											defaultValue={this.state.date}
											onChange={(newdate) => {
												this.setState({ date: newdate.target.value })
											}}
										/>
										<Form.Input
											required
											label='Time'
											type='time'
											step='1'
											defaultValue={this.state.time}
											onChange={(ev) => {
												this.setState({ time: ev.target.value })
											}}
										/>
									</Form.Group>

									<Form.Input
										required
										defaultValue={this.state.location}
										placeholder='location'
										label='Location'
										onChange={this.LocationHandler}
									/>

									<Form.Field
										control={TextArea}
										style={{ height: '130px' }}
										label='Description'
										defaultValue={this.state.body}
										placeholder='description'
										onChange={this.BodyHandler}
									/>
									<Form.Select
										required
										options={this.options}
										label='Official Event'
										placeholder='is official'
										onChange={this.EventOfficialHandler}
										defaultValue={this.state.isOfficial}
										disabled={
											this.props.nameModalEvent === 'Edit Event' ? true : false
										}
									/>
									<Form.Select
										required
										options={this.state.clubs || []}
										className='input-description'
										label='Assign to a club'
										placeholder='club'
										onChange={this.ClubHandler}
										value={this.state.club}
									/>

									<div>{this.state.clicked ? this.Results() : null}</div>
									<p className='event-cover'>Event cover</p>
									<Dropzone onDrop={(files) => console.log(files)}>
										{({ getRootProps, getInputProps }) => (
											<div className='container-event'>
												<div
													{...getRootProps({
														className: 'dropzone-event',
														onDrop: (event) => event.stopPropagation(),
													})}
												>
													<input {...getInputProps()} />
													<div className='upload-file-event'>
														<Icon
															style={{ margin: '3px' }}
															name='cloud upload'
															color='black'
														/>
														<p>Upload File </p>
													</div>
												</div>
												<p className='drag-drop-event'>or drag&drop here</p>
											</div>
										)}
									</Dropzone>
									<div className='second-line-athletes'>
										<hr></hr>
									</div>
									<div className='modal-form-buttons'>
										{this.props.nameModalEvent === 'Edit Event' ? (
											<DeleteButton
												style={{ float: 'left', marginTop: '10px' }}
												onClick={this.showModalDelete}
											>
												Delete
											</DeleteButton>
										) : null}
									</div>
									<div
										style={{
											float: 'right',
											textAlign: 'right',
											marginTop: '10px',
											marginBottom: '20px',
										}}
									>
										<CancelButton
											style={{ display: 'inline-block' }}
											onClick={this.props.handleCloseModal}
										>
											Close
										</CancelButton>
										<Button
											style={{ display: 'inline-block', marginRight: '0px' }}
											onClick={this.addClickedHandler}
										>
											{this.props.nameModalEvent === 'Edit Event'
												? 'EDIT'
												: 'ADD'}
										</Button>
									</div>
								</div>
							</div>
						</Form>
					</Modal.Content>
				</Modal>
				<ModalAdded
					hideAddConfirm={this.state.showAdded}
					hideModal={this.hideModalAdded}
					name={
						this.props.nameModalEvent === 'Create Event'
							? 'Event Added'
							: 'Event Edited'
					}
					description={
						this.props.nameModalEvent === 'Create Event'
							? `Event ${this.state.name} was added`
							: `Event ${this.state.name} was edited`
					}
				/>

				<ModalDeleted
					showDelete={this.state.showDeleted}
					itemsHandler={this.props.getEvents}
					hideModalDeleted={this.hideModalDelete}
					hideModal={this.props.handleCloseModal}
					title={'Delete player'}
					name={this.state.name}
					confirmDeleteItem={this.deleteEvent}
					description={
						'If you delete this club, all data associated with this profile will permanently deleted.'
					}
				/>
			</div>
		)
	}
}

export default ModalEvents
