import React, { Component } from 'react'
import { Form, Modal, Icon } from 'semantic-ui-react'
import Axios from 'axios'
import close_icon from '../assets/close.svg'
import './ModalAddClub.css'
import { Button, CancelButton, DeleteButton } from '../styledComponents'
import ModalAdded from './ModalAdded'
import ModalDeleted from './ModalDeleted'
import { FormError } from '../auth/common'

class ModalAddClub extends Component {
	state = {
		name: '',
		description: '',
		nameValidation: true,
		descriptionValidation: true,
		showAdded: false,
		showDeleted: false,
		idForDelete: -1,
		error: '',
		coaches: [],
		coach: '',
		clubs: [],
	}

	nameHandler = (e) => {
		if (e.target.value !== '') {
			this.setState({ name: e.target.value, nameValidation: true })
		} else {
			this.setState({ nameValidation: false })
		}
	}

	CoachHandler = (e, result) => {
		this.setState({ coach: result.value })
	}

	descriptionHandler = (e) => {
		if (e.target.value !== '' && e.target.value.length <= 16) {
			this.setState({
				description: e.target.value,
				descriptionValidation: true,
			})
		} else {
			this.setState({ descriptionValidation: false })
		}
	}

	deleteItem = (deleteReceived) => {
		if (deleteReceived) {
			const url = `http://localhost:3100/clubs/deleteClub/?id=${this.state.idForDelete}`
			Axios.delete(url, {
				headers: {
					Authorization: this.token,
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					this.hideModal()
				})
				.catch((error) => {
					this.setState({ error: error.response.data.message })
				})
		}
	}

	hideModalAdded = () => {
		this.setState({
			showAdded: false,
		})
	}

	getCoaches = () => {
		const token = localStorage.getItem('token')

		const url = `http://localhost:3100/users/getCoaches`
		Axios.get(url, {
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				console.log('clubs', this.state.clubs)
				let coaches =
					response &&
					response.data &&
					response.data.map((item, _) => {
						return {
							key: item.ID,
							text: item.USER_NAME,
							value: item.ID,
						}
					})
				let final = []
				for (let i = 0; i < coaches.length; i++) {
					console.log(
						!this.state.clubs.find(
							(element) => element.club.user_id === coaches[i].key
						)
					)
					if (
						!this.state.clubs.find(
							(element) => element.club.user_id === coaches[i].key
						)
					)
						final.push(coaches[i])
				}
				coaches.unshift({ key: 1, value: 1, text: 'No Coach' })
				this.setState({ coaches: final })
			})
			.catch((err) => {
				alert(err)
			})
	}

	hideModalDeleted = () => {
		this.setState({
			showDeleted: false,
		})
	}

	showModalDeleted = () => {
		this.setState({
			showDeleted: true,
		})
	}
	addClickedHandler = () => {
		const token = localStorage.getItem('token')

		if (
			this.state.nameValidation &&
			!!this.state.name &&
			this.state.descriptionValidation &&
			!!this.state.description
		) {
			if (this.props.nameModalClub === 'Edit Club') {
				Axios.put(
					`http://localhost:3100/clubs/editClub/?id=${this.props.clubToEdit.id}`,
					{
						name: this.state.name,
						description: this.state.description,
						user_id: this.state.coach,
					},
					{
						headers: {
							Authorization: token,
						},
					}
				)
					.then(() => {
						this.setState({ showAdded: true })
						this.props.getClub()
						this.props.hideModal()
						this.setDefaultValues()
					})
					.catch((error) => {
						this.setState({ error: error.response.data.message })
					})
			} else {
				Axios.post(
					`http://localhost:3100/clubs/createClub`,
					{
						name: this.state.name,
						description: this.state.description,
						user_id: this.state.coach,
					},
					{
						headers: {
							Authorization: token,
						},
					}
				)
					.then(() => {
						this.setState({ showAdded: true })
						this.props.getClubs()
						this.props.hideModal()
						this.setDefaultValues()
					})
					.catch((error) => {
						this.setState({ error: error.response.data.message })
					})
			}
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps, _) {
		if (
			this.props.clubToEdit !== nextProps.clubToEdit &&
			nextProps.clubToEdit !== null
		) {
			console.log(nextProps.clubToEdit)
			this.setState({
				name: nextProps.clubToEdit.name,
				description: nextProps.clubToEdit.description,
				idForDelete: nextProps.clubToEdit.id,
				coach: nextProps.clubToEdit.user_id,
			})
		}
	}

	getClubs = () => {
		window.location.replace('http://localhost:3000/clubs')
		let url = `http://localhost:3100/clubs/?search=`
		const token = localStorage.getItem('token')
		Axios.get(url, {
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				this.setState({
					clubs: response.data,
				})
			})
			.catch((error) => {
				alert(error)
			})
	}

	setDefaultValues = () => {
		this.setState({
			name: '',
			description: '',
			descriptionValidation: true,
			nameValidation: true,
			coach: '',
		})
	}
	async componentDidMount() {
		let url = `http://localhost:3100/clubs/?search=`
		const token = localStorage.getItem('token')
		await Axios.get(url, {
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				console.log(response)
				this.setState({
					clubs: response.data,
				})
			})
			.catch((error) => {
				alert(error)
			})
		await this.getCoaches()
	}

	handleCloseModal = () => {
		if (this.props.nameModalClub === 'Add Club') {
			this.setDefaultValues()
		}
		this.props.hideModal()
	}

	render() {
		return (
			<div>
				<Modal
					open={this.props.showModal}
					onClose={this.handleCloseModal}
					className='modal-form'
				>
					<Modal.Content>
						<Form>
							<div>
								<img
									src={close_icon}
									alt='add-club'
									className='close-icon'
									onClick={this.handleCloseModal}
								/>
							</div>
							<div>
								<h2>{this.props.nameModalClub}</h2>
								<hr></hr>
								<FormError>
									{this.state.error ? this.state.error : ''}
								</FormError>
								<div className='modal-form-inputs'>
									<Form.Input
										required
										onChange={this.nameHandler}
										error={
											this.state.nameValidation
												? null
												: 'The field can not be empty'
										}
										fluid
										label='Name'
										placeholder='Input placeholder'
										width='16'
										value={this.state.name}
									/>
									<Form.Input
										required
										onChange={this.descriptionHandler}
										error={
											this.state.descriptionValidation
												? null
												: 'The field can not be empty or contain more than 10 characters'
										}
										fluid
										label='Description'
										placeholder='Input placeholder'
										width='16'
										value={this.state.description}
									/>
									<Form.Select
										options={this.state.coaches || []}
										label='Assign to a coach'
										placeholder='coach'
										value={this.state.coach}
										onChange={this.CoachHandler}
									/>
									<br />
									<br />
									<hr className='second-line'></hr>
									<div className='modal-form-buttons'>
										<div className='modal-form-buttons'>
											{this.props.name === 'Edit Club' ? (
												<DeleteButton
													style={{ float: 'left', marginTop: '10px' }}
													onClick={this.showModalDeleted}
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
													onClick={this.handleCloseModal}
												>
													Cancel
												</CancelButton>
												<Button
													style={{
														display: 'inline-block',
														marginRight: '0px',
													}}
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
				<ModalAdded
					hideAddConfirm={this.state.showAdded}
					hideModal={this.hideModalAdded}
					name={
						this.props.nameModalClub === 'Add Club'
							? 'Club Added'
							: 'Club Edited'
					}
					description={
						this.props.nameModalClub === 'Add Club'
							? `Club ${this.state.name} was added`
							: `Club ${this.state.name} was edited`
					}
				/>
				<ModalDeleted
					showDelete={this.state.showDeleted}
					itemsHandler={this.getClubs}
					hideModalDeleted={this.hideModalDeleted}
					hideModal={this.props.hideModal}
					title={'Delete club'}
					name={this.state.name}
					confirmDeleteItem={this.deleteItem}
					description={
						'If you delete this club, all data associated with this profile will permanently deleted.'
					}
				/>
			</div>
		)
	}
}

export default ModalAddClub
