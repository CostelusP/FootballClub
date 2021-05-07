import React, { Component } from 'react'
import {
	Form,
	Grid,
	GridColumn,
	GridRow,
	Input,
	Modal,
} from 'semantic-ui-react'
import close_icon from '../assets/close.svg'
import axios from 'axios'
import ModalAdded from '../modals/ModalAdded'
import ModalDeleted from '../modals/ModalDeleted'
import { FormError } from '../auth/common'
import { CancelButton, Button, DeleteButton } from '../styledComponents'

class ModalAddCoach extends Component {
	state = {
		show: false,
		showAdd: false,
		emailValidation: true,
		passwordValidation: true,
		confirmPasswordValidation: true,
		user_name: '',
		confirm_password: '',
		nameAdded: '',
		email_address: '',
		password: '',
		id: -1,
		error: null,
	}

	hideModal = () => {
		this.setState({
			show: false,
			showDelete: false,
			showAdd: false,
		})
	}
	token = localStorage.getItem('token')
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
				.then((response) => {
					this.hideModal()
				})
				.catch((error) => {
					this.setState({ error: error.response.data.message })
				})
		}
	}

	hideDeleteConfirm = () => {
		console.log(this.props.personToEdit.id, this.props.personToEdit.user_name)
		this.setState({
			idDeleted: this.props.personToEdit.id,
			nameDeleted: this.props.personToEdit.user_name,
			show: false,
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
			nameAdded: event.target.value,
		})
	}

	nameHandle = (nameReceived) => {
		this.props.nameSet(nameReceived)
		this.showConfirmation()
	}

	showConfirmation = () => {
		this.props.hideAddConfirm()
		this.props.coachesHandler()
	}

	hideAddConfirm = () => {
		this.setState({ showAdd: true })
		this.props.hideConfirmEdit()
	}

	addClickedHandler = () => {
		console.log(
			this.state.emailValidation,
			this.state.passwordValidation,
			this.state.confirmPasswordValidation,
			!!this.state.confirm_password,
			!!this.state.password,
			!!this.state.email_address,
			!!this.state.user_name
		)
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
					.then((response) => {
						this.setState({
							email_address: '',
							user_name: '',
							password: '',
							confirm_password: '',
						})
						this.hideAddConfirm()
						this.props.coachesHandler()
					})
					.catch((error) => {
						console.log('Eroare')
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
					.then((response) => {
						this.setState({
							nameAdded: this.state.nameAdded,
							email_address: '',
							user_name: '',
							password: '',
							confirm_password: '',
						})
						this.nameHandle(this.state.nameAdded)
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
				error: null,
			})
		}
	}

	exitHandler = () => {
		this.setState(
			{
				email: '',
				firstName: '',
				lastName: '',
				emailValidation: true,
				firstNameValidation: true,
				lastNameValidation: true,
			},
			function () {}
		)
		this.props.hideModal()
	}

	deleteClickedHandler = () => {
		this.setState({
			email: '',
			firstName: '',
			lastName: '',
		})
		this.props.hideDeleteConfirm()
	}

	render() {
		return (
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
							<FormError>{this.state.error ? this.state.error : ''}</FormError>
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
								) : (
									''
								)}
								<label>Club Assign</label>
								<Input list='Club' placeholder='Input placeholder' fluid />
								<datalist id='Club'>
									<option value='English' />
									<option value='Chinese' />
									<option value='Dutch' />
								</datalist>
								<br />
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
				<ModalAdded
					hideAddConfirm={this.state.showAdd}
					hideModal={this.hideModal}
					name={'Coach edited'}
				/>
				{console.log('aaaa', this.state.nameDeleted)}
				<ModalDeleted
					hideShowDelete={this.state.showDelete}
					coachesHandler={this.props.coachesHandler}
					hideModal={this.props.hideModal}
					setName={this.nameHandle}
					title={'Delete Coach'}
					name={this.state.nameDeleted}
					confirmDelete={this.deleteItem}
					description={
						'If you delete coach’s account, all data associated with this profile will permanently deleted.'
					}
				/>
			</Modal>
		)
	}
}

export default ModalAddCoach
