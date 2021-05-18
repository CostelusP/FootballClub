import React, { Component } from 'react'
import { Form, Input, Modal } from 'semantic-ui-react'
import close_icon from '../assets/close.svg'
import axios from 'axios'
import ModalAdded from '../modals/ModalAdded'
import ModalDeleted from '../modals/ModalDeleted'
import { FormError } from '../auth/common'
import { CancelButton, Button, DeleteButton } from '../styledComponents'

class ModalAddCoach extends Component {
	state = {
		showDelete: false,
		showAdd: false,
		emailValidation: true,
		passwordValidation: true,
		confirmPasswordValidation: true,
		user_name: '',
		confirm_password: '',
		email_address: '',
		password: '',
		idDeleted: -1,
		error: null,
		userName: '',
	}
	token = localStorage.getItem('token')
	hideModalDeleted = () => {
		this.setState({
			showDelete: false,
		})
	}

	hideModalAdded = () => {
		this.setState({
			showAdd: false,
		})
	}

	deleteItem = (deleteReceived) => {
		if (deleteReceived) {
			const url = `http://localhost:3100/users/coach/?id=${this.state.idDeleted}`
			axios
				.delete(url, {
					headers: {
						Authorization: this.token,
						'Content-Type': 'application/json',
					},
				})
				.then((_) => {
					this.hideModal()
				})
				.catch((error) => {
					console.error(error.response.data.message)
					this.setState({ error: error.response.data.message })
				})
		}
	}

	hideDeleteConfirm = () => {
		this.setState({
			idDeleted: this.props.personToEdit.id,
			nameDeleted: this.props.personToEdit.user_name,
			showDelete: true,
			showAdd: false,
		})
		this.deleteItem()
	}

	emailHandler = (event) => {
		if (
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(event.target.value)
		) {
			this.setState({
				emailValidation: true,
				email_address: event.target.value,
			})
		} else {
			this.setState({
				emailValidation: false,
			})
		}
	}

	passwordHandler = (event) => {
		if (
			/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
				event.target.value
			)
		) {
			this.setState({
				passwordValidation: true,
				password: event.target.value,
			})
		} else {
			this.setState({
				passwordValidation: false,
			})
		}
	}
	confirmPasswordHandler = (event) => {
		if (this.state.password === event.target.value) {
			this.setState({
				confirmPasswordValidation: true,
				confirm_password: event.target.value,
			})
		} else {
			this.setState({
				confirmPasswordValidation: false,
			})
		}
	}
	nameHandler = (event) => {
		this.setState({
			user_name: event.target.value,
		})
	}

	hideAddConfirm = () => {
		this.setState({ showAdd: true })
	}

	addClickedHandler = () => {
		if (
			this.state.emailValidation &&
			this.state.passwordValidation &&
			this.state.confirmPasswordValidation &&
			!!this.state.confirm_password &&
			!!this.state.password &&
			!!this.state.email_address &&
			!!this.state.user_name
		) {
			const token = localStorage.getItem('token')
			if (this.props.editForm) {
				axios
					.put(
						`http://localhost:3100/users/editUser/?id=${this.props.personToEdit.id}`,
						{
							user_name: this.state.user_name,
							email_address: this.state.email_address,
							password: this.state.password,
						},
						{
							headers: {
								Authorization: token,
							},
						}
					)
					.then((_) => {
						this.props.hideModal()
						this.setState({
							userName: this.state.user_name,
							email_address: '',
							user_name: '',
							password: '',
							confirm_password: '',
							showAdd: true,
						})
						this.props.coachesHandler()
					})
					.catch((error) => {
						this.setState({ error: error.response.data.message })
					})
			} else {
				axios
					.post(
						'http://localhost:3100/users/createUser',
						{
							user_name: this.state.user_name,
							password: this.state.password,
							email_address: this.state.email_address,
						},
						{
							headers: {
								Authorization: token,
							},
						}
					)
					.then((_) => {
						this.setState({
							userName: this.state.user_name,
							email_address: '',
							user_name: '',
							password: '',
							confirm_password: '',
							showAdd: true,
						})
						this.props.hideModal()
						this.props.coachesHandler()
					})
					.catch((error) => {
						this.setState({ error: error.response.data.message })
					})
			}
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps, nextState) {
		if (
			this.props.personToEdit !== nextProps.personToEdit &&
			nextProps.personToEdit !== null
		) {
			this.setState({
				user_name: nextProps.personToEdit.user_name,
				password: 'TestStrong*/&',
				email_address: nextProps.personToEdit.email_address,
				confirm_password: 'true',
			})
		}
	}

	exitHandler = () => {
		this.setState({
			email: '',
			firstName: '',
			lastName: '',
			emailValidation: true,
			firstNameValidation: true,
			lastNameValidation: true,
		})
		this.props.hideModal()
	}

	deleteClickedHandler = () => {
		this.setState({
			email: '',
			firstName: '',
			lastName: '',
			showDelete: true,
		})
	}

	render() {
		return (
			<div>
				<Modal
					open={this.props.showModal}
					onClose={this.props.hideModal}
					className='modal-form'
				>
					<Modal.Content>
						<Form>
							<div>
								<img
									alt=''
									src={close_icon}
									className='close-icon'
									onClick={this.exitHandler}
								/>
							</div>
							<div>
								<h2>{this.props.name}</h2>
								<hr></hr>
								<FormError>
									{this.state.error ? this.state.error : ''}
								</FormError>
								<div className='modal-form-inputs'>
									<Form.Input
										required
										fluid
										onChange={this.nameHandler}
										label='User Name'
										placeholder='User name'
										width='16'
										defaultValue={this.state.user_name}
									/>
									<Form.Input
										required
										onChange={this.emailHandler}
										error={
											this.state.emailValidation
												? null
												: 'Enter a valid email address'
										}
										fluid
										label='Email Address'
										placeholder='Email Address'
										width='16'
										defaultValue={this.state.email_address}
									/>
									<Form.Input
										required
										onChange={this.passwordHandler}
										error={
											this.state.passwordValidation
												? null
												: 'Enter a strong password'
										}
										type='password'
										fluid
										label='Password'
										placeholder='Password'
										width='16'
										defaultValue={this.state.password}
									/>
									{!this.props.editForm ? (
										<Form.Input
											required
											onChange={this.confirmPasswordHandler}
											error={
												this.state.confirmPasswordValidation
													? null
													: 'Password does not match'
											}
											type='password'
											fluid
											label='Confirm Password'
											placeholder='password'
											width='16'
											defaultValue={this.state.confirm_password}
										/>
									) : null}

									<br />

									<hr className='second-line'></hr>
									<div className='modal-form-buttons'>
										{this.props.editForm ? (
											<DeleteButton
												style={{ float: 'left', marginTop: '10px' }}
												onClick={this.hideDeleteConfirm}
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
												onClick={this.exitHandler}
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
						</Form>
					</Modal.Content>
				</Modal>
				<ModalAdded
					hideAddConfirm={this.state.showAdd}
					hideModal={this.hideModalAdded}
					name={
						this.props.name === 'Edit Coach' ? 'Coach edited' : 'Coach created'
					}
					description={
						this.props.name === 'Edit Coach'
							? `Coach ${this.state.userName} was edited`
							: `Coach ${this.state.userName} was created`
					}
				/>
				<ModalDeleted
					showDelete={this.state.showDelete}
					itemsHandler={this.props.coachesHandler}
					hideModal={this.props.hideModal}
					hideModalDeleted={this.hideModalDeleted}
					title={'Delete Coach'}
					name={this.state.user_name}
					confirmDeleteItem={this.deleteItem}
					description={
						'If you delete coach’s account, all data associated with this profile will permanently deleted.'
					}
				/>
			</div>
		)
	}
}

export default ModalAddCoach
