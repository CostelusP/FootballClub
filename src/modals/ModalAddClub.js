import React, { Component } from 'react'
import { Form, Modal, Icon } from 'semantic-ui-react'
import Axios from 'axios'
import close_icon from '../assets/close.svg'
import './ModalAddClub.css'
import { Button, CancelButton, DeleteButton } from '../styledComponents'

class InputForm extends Component {
	state = {
		clicked: false,
		invitedMember: [],
		name: '',
		coach: '',
		nameValidation: true,
		coachValidation: true,
		coachesList: [],
		emailValidation: [],
		id: -1,
	}

	role = localStorage.getItem('role')

	handleId = (id_received) => {
		this.setState({ id: id_received })
	}

	members = this.state.invitedMember
	validation = this.state.emailValidation

	inviteMailHandler = (e, index) => {
		this.members[index] = e.target.value
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
			this.members[index] = e.target.value
			this.validation[index] = 'true'
		} else {
			this.validation[index] = 'false'
		}

		this.setState({
			emailValidation: this.validation,
			invitedMember: this.members,
		})
	}

	setClubAdded = () => {
		this.props.clubAdded(this.state.name)
	}

	Results = () =>
		this.state.invitedMember.map((item, index) => {
			return (
				<Form.Input
					onChange={(e) => this.inviteMailHandler(e, index)}
					type='email'
					placeholder='Input email'
					className='input-mail-invite'
					id={index}
					error={
						this.state.emailValidation[index] === 'true'
							? null
							: 'Enter a valid email address'
					}
				/>
			)
		})

	nameHandler = (e) => {
		if (/^[a-zA-Z ]+$/.test(e.target.value)) {
			this.setState({ name: e.target.value, nameValidation: true })
		} else {
			this.setState({ nameValidation: false })
		}
	}

	coachHandler = (e) => {
		if (/^[a-zA-Z ]+$/.test(e.target.value)) {
			this.setState({ coach: e.target.value, coachValidation: true })
		} else {
			this.setState({ coachValidation: false })
		}
	}

	Edit = () => {
		return (
			<button
				className='delete-button-club'
				onClick={this.deleteClickedHandler}
			>
				{' '}
				Detele
			</button>
		)
	}

	addAnother = () => (
		<div>
			<Icon color='grey' name='plus' />
			<label onClick={this.inviteHandler}> Add another</label>
		</div>
	)

	addClickedHandler = () => {
		const token = localStorage.getItem('token')

		if (
			this.state.nameValidation &&
			!!this.state.name &&
			this.state.coachValidation &&
			!!this.state.coach
		)
			Axios.post(
				'http://34.65.176.55:8081/api/club/',
				//"http://192.168.100.228:8001/api/club/",
				{
					name: this.state.name,
					coach: this.state.coach,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)
				.then((response) => {
					this.setClubAdded()
					this.props.hideAddConfirm()
				})
				.catch((error) => {
					alert(error)
				})
	}

	deleteClickedHandler = () => {
		this.props.hideDeleteConfirm()
	}

	inviteHandler = () => {
		let members = this.state.invitedMember
		let validation = this.state.emailValidation
		validation.push('true')
		members.push('')
		this.setState({ invitedMember: members, emailValidation: validation })
	}

	componentDidMount() {
		let url = 'http://34.65.176.55:8081/api/coach/'
		const token = localStorage.getItem('token')
		if (this.role == 1) this.setState({ coachValidation: true, coach: 'SFA' })
		Axios.get(
			url,

			{
				headers: {
					Authorization: token,
				},
			}
		).then((response) => {
			this.setState({ coachesList: response.data.coaches })
		})
	}

	render() {
		return (
			<Modal
				open={this.props.showModal}
				onClose={!this.props.hideDeleted}
				className='modal-form'
			>
				<Modal.Content>
					<Form>
						<div>
							<img
								src={close_icon}
								alt=''
								className='close-icon'
								onClick={this.props.hideModal}
							/>
						</div>
						<div>
							<h2>{this.props.name}</h2>
							<hr></hr>

							<div className='modal-form-inputs'>
								<Form.Input
									required
									onChange={this.nameHandler}
									error={
										this.state.nameValidation
											? null
											: 'The field can not be empty or contain special characters'
									}
									fluid
									label='Name'
									placeholder='Input placeholder'
									width='16'
								/>
								{this.role == 0 ? (
									<div>
										<label>Assign a Coach</label>
										<br />

										<div>
											<Form.Input
												list='Coach'
												placeholder='Input placeholder'
												fluid
												onChange={this.coachHandler}
												error={
													this.state.coachValidation
														? null
														: 'The field can not be empty or contain special characters'
												}
											/>
											<datalist id='Coach'>
												{this.state.coachesList.map((coac) => {
													return (
														<option
															key=''
															value={coac.first_name + ' ' + coac.last_name}
														/>
													)
												})}
											</datalist>
										</div>
									</div>
								) : null}

								<p
									className='label-invite-members'
									onClick={this.inviteHandler}
								>
									Invite members{' '}
								</p>
								<div>
									<div>
										{this.state.invitedMember.length ? (
											<h3>Email Addres</h3>
										) : null}
									</div>
									<this.Results />
									<div>
										{this.state.invitedMember.length ? (
											<this.addAnother />
										) : null}
									</div>
								</div>
								<div></div>

								<br />
								<br />
								<hr className='second-line'></hr>
								<div className='modal-form-buttons'>
									
									<div className='modal-form-buttons'>
									{this.props.editForm ? (
										<DeleteButton
											style={{ float: 'left', marginTop: '10px' }}
											onClick={this.deleteClickedHandler}
										>
											Delete
										</DeleteButton>
									) : null}
									<div
										style={{
											float: 'right',
											textAlign: 'right',
											marginTop: '10px',
										}}
									>
										<CancelButton
											style={{ display: 'inline-block' }}
											onClick={this.props.hideModal}
										>
											Cancel
										</CancelButton>
										<Button
											style={{ display: 'inline-block', marginRight: '0px' }}
											onClick={this.addClickedHandler}
										>
											{this.props.action}
										</Button>
									</div>
								</div>
								</div>
							</div>
						</div>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default InputForm
