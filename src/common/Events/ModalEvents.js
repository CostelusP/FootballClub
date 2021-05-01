import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Modal, Form, Icon, TextArea } from 'semantic-ui-react'
import * as moment from 'moment'
import './ModalEvents.css'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import close_icon from '../../assets/close.svg'

class ModalEvents extends Component {
	state = {
		show: false,
		showdelete: false,
		clicked: false,
		titlevalid: true,
		bodyvalid: true,
		timevalid: true,
		datevalid: true,
		clubvalid: true,
		locationvalid: true,
		title: '',
		body: '',
		date: '',
		time: '',
		location: '',
		participants: '',
		img: '',
		address: '',
		invite: [],
		clubs: [],
		club: '',
	}

	EventIsAdedd = () => {
		this.props.EventAdded(this.state.title)
	}
	AddedInClub = () => {
		this.props.InClub(this.state.club)
	}

	ClubHandler = (data, { value }) => {
		if (/^[a-zA-Z ]+$/.test(data.target.value)) {
			this.setState({ clubvalid: true })
			this.setState({ club: value })
		} else {
			this.setState({ clubvalid: false })
		}
	}

	TitleHandler = (data) => {
		if (/^[a-zA-Z0-9-_. ]+$/.test(data.target.value)) {
			this.setState({ titlevalid: true })
			this.setState({ title: data.target.value })
		} else {
			this.setState({ titlevalid: false })
		}
	}

	BodyHandler = (data) => {
		if (data.target.value.length !== 0) {
			this.setState({ bodyvalid: true })
			this.setState({ body: data.target.value })
		} else this.setState({ bodyvalid: false })
	}
	DateHandler = (data) => {
		if (data.target.value.length !== 0) {
			this.setState({ date: data.target.value })
			this.setState({ datevalid: true })
		} else this.setState({ datevalid: false })
	}

	TimeHandler = (data) => {
		this.setState({ time: data.target.value })
	}
	LocationHandler = (data) => {
		if (data.target.value.length !== 0) {
			this.setState({ location: data.target.value })
			this.setState({ locationvalid: true })
		} else this.setState({ locationvalid: false })
	}
	ParticipantsHandler = (data) => {
		this.setState({ participants: data.target.value })
	}

	Results = () => (
		<div className='event-invite'>
			<h3> Email address</h3>
			<input type='email' />
			<Icon color='grey' name='plus' />
			<label> Add another</label>
		</div>
	)
	addClickedHandler = () => {
		if (
			this.state.titlevalid &&
			this.state.datevalid &&
			this.state.bodyvalid &&
			this.state.timevalid &&
			this.state.title.length > 0 &&
			this.state.body.length > 0 &&
			this.state.date.length > 0 &&
			this.state.time.length > 0
		) {
			const token = localStorage.getItem('token')

			if (this.props.NameModalEvents === 'Edit Event') {
				moment(this.state.data).format('yyyy-mm-dd')
				moment(this.state.time).format('HHMMSS')
				const url = `http://34.65.176.55:8081/api/event/put/${this.props.eventselected.id}/`
				axios
					.put(
						url,
						{
							img: this.state.img,
							name: this.state.title,
							date: this.state.date,
							description: this.state.body,
							time: this.state.time,
							location: this.state.location,
							club: this.state.club,
						},
						{
							headers: {
								Authorization: token,
							},
						}
					)
					.then((response) => {
						this.setState({
							body: '',
							date: '',
							time: '',
							location: '',
							participants: '',
							img: '',
							address: '',
							club: '',
						})
						this.EventIsAdedd()
						this.props.hideAddConfirm()
					})

					.catch((error) => {
						alert(error)
					})
			} else {
				moment(this.state.data).format('yyyy-mm-dd')
				console.log(this.state.log, 'date')
				moment(this.state.time).format('HHMMSS')
				console.log(this.state.log, 'time')
				axios
					.post(
						'http://34.65.176.55:8081/api/event/create/',
						{
							img: this.state.img,
							name: this.state.title,
							date: this.state.date,
							description: this.state.body,
							time: this.state.time,
							location: this.state.location,
							club: this.state.club,
						},
						{
							headers: {
								Authorization: token,
							},
						}
					)
					.then((response) => {
						this.EventIsAdedd()
						this.AddedInClub()
						this.props.hideAddConfirm()
					})
					.catch((error) => {
						alert(error)
					})
			}
		}
	}
	cancelClickedHandler = () => {
		this.setState({ titlevalid: true })
		this.setState({ datevalid: true })
		this.setState({ timevalid: true })
		this.setState({ bodyvalid: true })
	}
	deleteClickedHandler = () => {
		this.props.hideDeleteConfirm()
	}

	inviteHandler = () => {
		let members = this.state.invite
		members.push('')
		this.setState({ invite: members })
	}
	Edit = () => {
		return (
			<button className='button-delete-event' onClick={this.hideDeleteConfirm}>
				{' '}
				Detele
			</button>
		)
	}

	UNSAFE_componentWillReceiveProps(nextProps, nextState) {
		if (
			this.props.eventselected !== nextProps.eventselected &&
			nextProps.eventselected !== null
		) {
			console.log('this', this.props.eventselected)
			console.log('next', nextProps.eventselected)
			moment(this.state.data).format('dd-mm-yyyy')
			console.log(this.state.club, 'real ')
			this.setState({
				title: nextProps.eventselected.name,
				location: nextProps.eventselected.location,
				body: nextProps.eventselected.description,
				date: nextProps.eventselected.date,
				time: nextProps.eventselected.time,
				club: nextProps.eventselected.club,
			})
		}
	}
	componentDidMount() {
		let url = 'http://34.65.176.55:8081/api/club/clubs/'
		const token = localStorage.getItem('token')
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			let club =
				response &&
				response.data &&
				response.data.map((item, index) => {
					return {
						key: item.id,
						text: item.name,
						value: item.name,
					}
				})
			console.log(response.data, 'aaaaa')
			this.setState({ clubs: club })
			console.log(this.state.clubs, 'asfuysaf')
		})
	}

	deleteEvent = () => {
		const url = `http://34.65.176.55:8081/api/event/delete/${this.props.eventselected.id}/`
		axios
			.delete(url, {
				headers: {
					Authorization: this.token,
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				this.hideModal()
			})
			.catch((error) => {
				alert(error)
			})
	}
	hideDeleteConfirm = () => {
		this.setState({
			show: false,
			showDelete: true,
		})
		this.deleteEvent()
	}
	render() {
		return (
			<Modal
				className='modal-events'
				open={this.props.handleOpenModal}
				close={this.props.handleCloseModal}
				reciveData={this.props.passData}
			>
				<div className='modal-content-div'>
					<div className='close-icon-events'>
						<img
							src={close_icon}
							alt=''
							onClick={this.props.handleCloseModal}
						/>
					</div>
					<Form>
						<div className='buttom-modal-events'>
							<h2>{this.props.NameModalEvents}</h2>
							<div className='first-line-events'>
								<hr></hr>
							</div>
						</div>
						<div className='form-events'>
							<Form.Input
								label='Name'
								defaultValue={this.state.title}
								placeholder='Input placeholder'
								error={
									this.state.titlevalid
										? null
										: 'The field can not be empty or contain some special characters'
								}
								onChange={this.TitleHandler}
							/>
							<Form.Group widths='equal'>
								<Form.Input
									label='Date'
									type='date'
									value={this.props.date}
									value={this.state.date}
									placeholder='Input placeholder'
									error={
										this.state.datevalid ? null : 'The field can not be empty '
									}
									onChange={(newdate) => {
										this.setState({ date: newdate.target.value })
									}}
								/>
								<Form.Input
									label='Time'
									type='time'
									step='1'
									placeholder='Input placeholder'
									defaultValue={this.state.time}
									onChange={(ev) => {
										this.setState({ time: ev.target.value })
									}}
								/>
							</Form.Group>

							<Form.Input
								defaultValue={this.state.location}
								placeholder='Input placeholder'
								className='location-search-input'
								label='Location'
								error={
									this.state.locationvalid
										? null
										: 'The field can not be empty or contain some special characters'
								}
								onChange={this.LocationHandler}
							/>

							<Form.Field
								control={TextArea}
								style={{ height: '130px' }}
								label='Description'
								defaultValue={this.state.body}
								placeholder='Input placeholder'
								error={
									this.state.bodyvalid ? null : 'The field can not be empty '
								}
								onChange={this.BodyHandler}
							/>
							<Form.Select
								required
								options={this.state.clubs || []}
								className='input-description'
								label='Assign to a club'
								placeholder='Input placeholder'
								onChange={this.ClubHandler}
							/>

							<div className='invite-optional'>
								<p
									className='invite-members'
									onClick={() =>
										this.setState({ clicked: !this.state.clicked })
									}
								>
									Invite members
								</p>
							</div>
							<p className='invite-members-optional'>(Optional)</p>
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
							<div className='bottom-events-modal'>
								<hr></hr>

								<div className='buttons-features'>
									{this.props.NameModalEvents === 'Edit Event' ? (
										<this.Edit />
									) : null}
								</div>
								<div className='button-add-events'>
									<button
										className='button-close-event'
										onClick={this.props.handleCloseModal}
										inverted
									>
										Close
									</button>
									<button
										className='button-add-event'
										onClick={this.addClickedHandler}
									>
										ADD
									</button>
								</div>
							</div>
						</div>
					</Form>
				</div>
			</Modal>
		)
	}
}

export default ModalEvents
