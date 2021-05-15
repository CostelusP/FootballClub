import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Modal, Form, Icon } from 'semantic-ui-react'
import './ModalAthletes.css'
import axios from 'axios'
import close_icon from '../assets/close.svg'
import { Button, CancelButton, DeleteButton } from '../styledComponents'
import { date } from 'yup'
import ModalAdded from '../modals/ModalAdded'
import ModalDeleted from './ModalDeleted'

class ModalAthletes extends Component {
	state = {
		namevalid: true,
		salaryValid: true,
		ratingValid: true,
		agevalid: true,
		locationvalid: true,
		heightvalid: true,
		weightvalid: true,
		clubvalid: true,
		full_name: '',
		age: '',
		height: '',
		salary: '',
		weight: '',
		position: '',
		date_of_birth: date,
		rating: '',
		clubs: [],
		club: '',
		showAdded: false,
		showDeleted: false,
		idForDelete: -1,
	}

	NameHandler = (data) => {
		if (/^[a-zA-Z ]+$/.test(data.target.value)) {
			this.setState({ namevalid: true })
			this.setState({ full_name: data.target.value })
		} else {
			this.setState({ namevalid: false })
		}
	}
	SalaryHandler = (data) => {
		if (/^[0-9]*$/.test(data.target.value)) {
			this.setState({ salaryValid: true })
			this.setState({ salary: data.target.value })
		} else {
			this.setState({ salaryValid: false })
		}
	}

	RatingHandler = (data) => {
		if (/^[0-9]*$/.test(data.target.value)) {
			this.setState({ ratingValid: true })
			this.setState({ rating: data.target.value })
		} else {
			this.setState({ ratingValid: false })
		}
	}

	HeightHandler = (data) => {
		if (
			/[1-2][0-90-9]+$/.test(data.target.value) &&
			data.target.value.length === 3 &&
			data.target.value > 0
		) {
			this.setState({ heightvalid: true })
			this.setState({ height: data.target.value })
		} else {
			this.setState({ heightvalid: false })
		}
	}
	ClubHandler = (e, result) => {
		this.setState({ club: result.value })
	}

	AgeHandler = (data) => {
		this.setState({ age: data.target.value })
	}

	DateHandler = (data) => {
		this.setState({ date_of_birth: data.target.value })
	}

	PositionHandler = (data) => {
		this.setState({ position: data.target.value })
	}

	WeightHandler = (data) => {
		if (
			/[1-9][0-90-9]+$/.test(data.target.value) &&
			data.target.value < 400 &&
			data.target.value > 0
		) {
			this.setState({ weightvalid: true })
			this.setState({ weight: data.target.value })
		} else {
			this.setState({ weightvalid: false })
		}
	}

	deleteItem = (deleteReceived) => {
		if (deleteReceived) {
			const url = `http://localhost:3100/players/deletePlayer/?id=${this.state.idForDelete}`
			axios
				.delete(url, {
					headers: {
						Authorization: this.token,
						'Content-Type': 'application/json',
					},
				})
				.then((_) => {})
				.catch((error) => {
					this.setState({ error: error.response.data.message })
				})
		}
	}

	getClubs = () => {
		let url = 'http://localhost:3100/clubs/?search=default'
		const token = localStorage.getItem('token')
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			let club =
				response &&
				response.data &&
				response.data.map((item, index) => {
					return {
						key: item.club.id,
						text: item.club.name,
						value: item.club.id,
					}
				})
			this.setState({ clubs: club })
		})
	}

	componentDidMount() {
		this.getClubs()
	}

	addClickedHandler = () => {
		if (
			this.state.namevalid &&
			this.state.heightvalid &&
			this.state.weightvalid &&
			this.state.salaryValid &&
			this.state.ratingValid &&
			this.state.salary.length > 0 &&
			this.state.date_of_birth.length > 0 &&
			this.state.full_name.length > 0 &&
			this.state.position.length > 0 &&
			this.state.age.length > 0 &&
			this.state.height.length > 0 &&
			this.state.weight.length > 0 &&
			this.state.club.length > 0
		) {
			const token = localStorage.getItem('token')
			if (!this.props.editPlayer) {
				axios
					.post(
						'http://localhost:3100/players/createPlayer',
						{
							full_name: this.state.full_name,
							age: this.state.age,
							height: this.state.height,
							weight: this.state.weight,
							salary: this.state.salary,
							position: this.state.position,
							rating: this.state.rating,
							date_of_birth: this.state.date_of_birth,
							club_id: this.state.club,
						},
						{
							headers: {
								Authorization: token,
							},
						}
					)
					.then((response) => {
						this.props.handleCloseModal()
						this.setState({ showAdded: true })
						this.props.playersHandler()
					})
					.catch((error) => {
						alert(error)
					})
			} else {
				axios
					.put(
						`http://localhost:3100/players/editPlayer/?id=${this.props.playerToEdit.id}`,
						{
							full_name: this.state.full_name,
							age: this.state.age,
							height: this.state.height,
							weight: this.state.weight,
							salary: this.state.salary,
							position: this.state.position,
							rating: this.state.rating,
							date_of_birth: this.state.date_of_birth,
							club_id: this.state.club,
						},
						{
							headers: {
								Authorization: token,
							},
						}
					)
					.then((response) => {
						this.props.handleCloseModal()
						this.setState({ showAdded: true })
						this.props.playersHandler()
					})
					.catch((error) => {
						alert(error)
					})
			}
		}
		this.cancelClickedHandler()
	}

	cancelClickedHandler = () => {
		this.setState({
			img: '',
			full_name: '',
			salary: '',
			age: '',
			date_of_birth: '',
			position: '',
			height: '',
			weight: '',
			rating: '',
			club: '',
		})

		this.setState({
			namevalid: true,
			ratingValid: true,
			salaryValid: true,
			weightvalid: true,
			heightvalid: true,
		})
		this.props.handleCloseModal()
	}

	UNSAFE_componentWillReceiveProps(nextProps, nextState) {
		console.log('brbrb', nextProps)
		console.log(this.props.playerToEdit !== nextProps.playerToEdit)
		if (
			this.props.playerToEdit !== nextProps.playerToEdit &&
			nextProps.playerToEdit !== null
		) {
			const date_birth = nextProps.playerToEdit.date_of_birth.substring(
				0,
				nextProps.playerToEdit.date_of_birth.indexOf('T')
			)
			this.setState({
				full_name: nextProps.playerToEdit.full_name,
				position: nextProps.playerToEdit.position,
				rating: nextProps.playerToEdit.rating,
				date_of_birth: date_birth,
				weight: nextProps.playerToEdit.weight.toString(),
				height: nextProps.playerToEdit.height.toString(),
				age: nextProps.playerToEdit.age.toString(),
				salary: nextProps.playerToEdit.salary.toString(),
				idForDelete: nextProps.playerToEdit.id,
				club: nextProps.playerToEdit.club_id,
			})
		}
	}

	hideModalAdded = () => {
		this.setState({
			showAdded: false,
		})
	}

	hideModalDeleted = () => {
		this.setState({
			showDeleted: false,
		})
	}

	deleteHandler = () => {
		this.setState({ showDeleted: true })
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
							{console.log(this.props.playerToEdit)}
							<img
								src={close_icon}
								className='close-icon-athlete'
								alt=''
								onClick={this.cancelClickedHandler}
							/>
							<div>
								<h2>{this.props.nameModalAthletes}</h2>
								<hr></hr>
								<div className='modal-form-inputs'>
									<p>General Information</p>
									<div className='modal-form-inputs-athletes'>
										<Form.Group widths='equal'>
											<Form.Input
												fluid
												width='10'
												label='Full Name'
												placeholder='name'
												error={
													this.state.namevalid
														? null
														: 'The field can not be empty or contain special characters'
												}
												defaultValue={this.state.full_name}
												onChange={this.NameHandler}
											/>
											<Form.Input
												width='10'
												fluid
												label='Salary'
												placeholder='salary'
												defaultValue={this.state.salary}
												error={
													this.state.salaryValid ? null : 'Enter only digits'
												}
												onChange={this.SalaryHandler}
											/>
										</Form.Group>

										<Form.Group widths='equal'>
											<Form.Input
												fluid
												label='Position'
												placeholder='position'
												options={this.state.sports || 'global'}
												onChange={this.PositionHandler}
												defaultValue={this.state.position}
											/>
											<Form.Input
												fluid
												label='Rating'
												placeholder='rating'
												error={
													this.state.ratingValid
														? null
														: 'The field can not be empty.Enter only digits'
												}
												onChange={this.RatingHandler}
												defaultValue={this.state.rating}
											/>
										</Form.Group>
										<p>Personal Information </p>
										<Form.Group widths='equal'>
											<Form.Input
												type='date'
												fluid
												label='Date of Birth'
												placeholder='date'
												onChange={this.DateHandler}
												defaultValue={this.state.date_of_birth}
											/>
											<Form.Input
												fluid
												label='Age'
												placeholder='age'
												onChange={this.AgeHandler}
												defaultValue={this.state.age}
											/>
										</Form.Group>

										<Form.Group widths='equal'>
											<Form.Input
												fluid
												label='Height'
												placeholder='height'
												error={
													this.state.heightvalid
														? null
														: 'The field can not be empty and must contain minimum 3 digits.The maximum value is 299'
												}
												onChange={this.HeightHandler}
												defaultValue={this.state.height}
											/>
											<Form.Input
												fluid
												label='Weight'
												placeholder='Input Placeholder'
												error={
													this.state.weightvalid
														? null
														: 'The field can not be empty and must contain only digits.The maximum value is 399'
												}
												onChange={this.WeightHandler}
												defaultValue={this.state.weight}
											/>
										</Form.Group>
										<Form.Select
											options={this.state.clubs || []}
											className='input-description'
											label='Assign to a club'
											placeholder='clubs'
											value={this.state.club}
											onChange={this.ClubHandler}
										/>
										<h3>Avatar Image</h3>
										<Dropzone onDrop={(files) => console.log(files)}>
											{({ getRootProps, getInputProps }) => (
												<div className='drag-and-drop-athlets'>
													<div
														{...getRootProps({
															className: 'dropzone-athletes',
															onDrop: (event) => event.stopPropagation(),
														})}
													>
														<input {...getInputProps()} />
														<div className='upload-file-athletes'>
															<Icon
																name='cloud upload'
																color='black'
																style={{ margin: '7px' }}
															/>
															<p>Upload File </p>
														</div>
													</div>
													<p className='drag-drop-athletes'>
														or drag&drop here
													</p>
												</div>
											)}
										</Dropzone>
										<div className='second-line-athletes'>
											<hr></hr>
										</div>
									</div>

									<div className='modal-form-buttons'>
										{this.props.nameModalAthletes === 'Edit Player' ? (
											<DeleteButton
												style={{ float: 'left', marginTop: '10px' }}
												onClick={this.deleteHandler}
											>
												Delete
											</DeleteButton>
										) : null}
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
												onClick={this.cancelClickedHandler}
											>
												Cancel
											</CancelButton>
											<Button
												style={{ display: 'inline-block', marginRight: '0px' }}
												onClick={this.addClickedHandler}
											>
												{this.props.nameModalAthletes === 'Edit Player'
													? 'EDIT'
													: 'ADD'}
											</Button>
										</div>
									</div>
								</div>
							</div>
						</Form>
					</Modal.Content>
				</Modal>
				<ModalAdded
					hideAddConfirm={this.state.showAdded}
					hideModal={this.hideModal}
					name={
						this.props.nameModalAthletes === 'Create Player'
							? 'Player Added'
							: 'Player Edited'
					}
					description={
						this.props.nameModalAthletes === 'Create Player'
							? `Player ${this.state.full_name} was added on ${this.state.inClub}`
							: `Player ${this.state.full_name} was edited`
					}
				/>
				<ModalDeleted
					showDelete={this.state.showDeleted}
					itemsHandler={this.props.playersHandler}
					hideModalDeleted={this.hideModalDeleted}
					hideModal={this.props.handleCloseModal}
					title={'Delete player'}
					name={this.state.full_name}
					confirmDeleteItem={this.deleteItem}
					description={
						'If you delete player, all data associated with this profile will permanently deleted.'
					}
				/>
			</div>
		)
	}
}

export default ModalAthletes
