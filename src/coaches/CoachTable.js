import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Checkbox } from 'semantic-ui-react'
import './Coach.css'
import edit_icon from '../assets/edit-icon.svg'
import trash_icon from '../assets/trash.svg'
import ModalAddCoach from '../modals/ModalAddCoach'
import ModalDeleted from '../modals/ModalDeleted'
import Axios from 'axios'
import { Pagination } from 'semantic-ui-react'
import { PaginationDiv } from '../styledComponents'

export default class CoachTable extends Component {
	state = {
		column: null,
		id: 0,
		direction: null,
		show: false,
		search: '',
		showDelete: false,
		coaches: [],
		page: 1,
		nameDeleted: '',
		idDeleted: -1,
		delete: false,
		numberPages: 0,
		personToEdit: {},
	}

	token = localStorage.getItem('token')

	nameHandle = (nameReceived) => {
		this.setState({ name: nameReceived })
	}

	showModal = () => {
		this.setState({
			show: true,
		})
	}

	hideModal = () => {
		this.setState({
			show: false,
		})
	}
	hideModalDeleted = () => {
		this.setState({ showDelete: false })
	}

	deleteItem = (deleteReceived) => {
		if (deleteReceived) {
			const url = `http://localhost:3100/users/coach/?id=${this.state.idDeleted}`
			Axios.delete(url, {
				headers: {
					Authorization: this.token,
					'Content-Type': 'application/json',
				},
			})
				.then((_) => {
					this.coachesHandler()
				})
				.catch((error) => {
					console.err(error)
					alert(error.response.data.message)
				})
		}
	}

	deleteHandler = (e, index) => {
		this.setState({
			idDeleted: this.state.coaches[index].coach.id,
			nameDeleted: this.state.coaches[index].coach.user_name,
			showDelete: true,
		})
		this.deleteItem()
	}

	editHandler = (e, index) => {
		this.setState({
			personToEdit: this.state.coaches[index].coach,
			show: true,
		})
	}

	handleSort = (clickedColumn) => () => {
		const { column, coaches, direction } = this.state

		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				coaches: _.sortBy(coaches, [clickedColumn]),
				direction: 'ascending',
			})

			return
		}

		this.setState({
			coaches: coaches.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.searchString !== this.props.searchString) {
			this.setState({ search: this.props.searchString }, function () {})
			this.coachesHandler()
		}
	}

	coachesHandler = () => {
		let url = `http://localhost:3100/users/coaches/?page=1&search=${this.props.searchString}&limit=10`
		const token = localStorage.getItem('token')
		Axios.get(
			url,

			{
				headers: {
					Authorization: token,
				},
			}
		).then((response) => {
			console.log(response)
			this.setState({ coaches: response.data.coaches })
			this.setState({ numberPages: response.data.page_number })
		})
	}

	componentDidMount() {
		this.coachesHandler()
	}

	setNumPage = (_, { activePage }) => {
		this.setState({ page: activePage })
		let url = `http://localhost:3100/users/coaches/?page=${activePage}&search=${this.state.search}&limit=10`
		Axios.get(url, {
			headers: {
				Authorization: this.token,
			},
		}).then((response) => {
			this.setState({ coaches: response.data.coaches })
			this.setState({ numberPages: response.data.page_number })
		})
	}

	render() {
		const { column, direction } = this.state

		return (
			<div>
				<Table sortable fixed>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell
								sorted={column === 'user_name' ? direction : null}
								onClick={this.handleSort('user_name')}
							>
								User Name
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === 'email_address' ? direction : null}
								onClick={this.handleSort('email_address')}
							>
								Email Address
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === 'club' ? direction : null}
								onClick={this.handleSort('club')}
							>
								Owned Clubs
							</Table.HeaderCell>
							<Table.HeaderCell>Actions</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.state.coaches.map((coaches, index) => {
							return (
								<Table.Row key={index}>
									<Table.Cell>
										<Checkbox className='table-checkbox' />
										{coaches.coach.user_name}
									</Table.Cell>
									<Table.Cell>{coaches.coach.email_address}</Table.Cell>
									<Table.Cell>{coaches.club.name || '-'}</Table.Cell>

									<Table.Cell>
										<img
											alt=''
											src={edit_icon}
											className='table-icons'
											onClick={(e) => this.editHandler(e, index)}
										/>
										<img
											alt=''
											onClick={(e) => this.deleteHandler(e, index)}
											src={trash_icon}
											id={index}
										/>
									</Table.Cell>
								</Table.Row>
							)
						})}
					</Table.Body>
				</Table>
				<PaginationDiv style={{ marginLeft: '0px' }}>
					<Pagination
						activePage={this.state.page}
						totalPages={this.state.numberPages}
						onPageChange={this.setNumPage}
					/>
				</PaginationDiv>

				<ModalAddCoach
					personToEdit={this.state.personToEdit}
					coachesHandler={this.coachesHandler}
					showModal={this.state.show}
					hideModal={this.hideModal}
					name={'Edit Coach'}
					action={'EDIT'}
					editForm={true}
				/>

				<ModalDeleted
					showDelete={this.state.showDelete}
					itemsHandler={this.coachesHandler}
					hideModal={this.hideModal}
					hideModalDeleted={this.hideModalDeleted}
					title={'Delete Coach'}
					name={this.state.nameDeleted}
					confirmDeleteItem={this.deleteItem}
					description={
						'If you delete coach’s account, all data associated with this profile will permanently deleted.'
					}
				/>
			</div>
		)
	}
}
