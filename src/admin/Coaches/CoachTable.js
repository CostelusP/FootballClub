import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Checkbox, GridRow, Grid } from 'semantic-ui-react'
import './CoachTable.css'
import edit_icon from '../../assets/edit-icon.svg'
import trash_icon from '../../assets/trash.svg'
import ModalAddCoach from './ModalAddCoach'
import ModalDeleted from '../../common/Modals/ModalDeleted'
import Axios from 'axios'
import { Pagination } from 'semantic-ui-react'
import { PaginationDiv } from '../../styledComponents'

export default class CoachTable extends Component {
	state = {
		column: null,
		id: 0,
		direction: null,
		show: false,
		showAdd: false,
		search: '',
		showDelete: false,
		coaches: [],
		page: 1,
		nameDeleted: '',
		coaches_page: [],
		idDeleted: -1,
		delete: false,
		numberPages: 0,
		personToEdit: [],
	}

	token = localStorage.getItem('token')

	nameHandle = (nameReceived) => {
		this.setState({ name: nameReceived })
	}

	showModalEdit = (prs) => {
		this.setState({
			show: true,
			personToEdit: prs,
		})
	}

	showModal = () => {
		this.setState({
			show: true,
		})
	}

	hideModal = () => {
		this.setState({
			show: false,
			showDelete: false,
			showAdd: false,
		})
	}

	deleteItem = (deleteReceived) => {
		if (deleteReceived) {
			const url = `http://34.65.176.55:8081/api/coach/${this.state.idDeleted}/`
			Axios.delete(url, {
				headers: {
					Authorization: this.token,
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					this.coachesHandler()
				})
				.catch((error) => {
					alert(error)
				})
		}
	}

	hideDeleteConfirm = (e, index) => {
		this.setState({
			idDeleted: this.state.coaches_page[index].id,
			nameDeleted:
				this.state.coaches_page[index].first_name +
				' ' +
				this.state.coaches_page[index].first_name,
			show: false,
			showDelete: true,
		})
		this.deleteItem()
	}

	hideConfirmEdit = () => {
		this.setState({ show: false })
	}

	editHandler = (e, index) => {
		this.setState(
			{ personToEdit: this.state.coaches_page[index] },
			function () {}
		)
		this.showModalEdit(this.state.coaches_page[index])
	}

	handleSort = (clickedColumn) => () => {
		const { column, coaches_page, direction } = this.state

		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				coaches_page: _.sortBy(coaches_page, [clickedColumn]),
				direction: 'ascending',
			})

			return
		}

		this.setState({
			coaches_page: coaches_page.reverse(),
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
		let url = `http://34.65.176.55:8081/api/coach/?page=1&search=${this.props.searchString}&limit=10/`
		const token = localStorage.getItem('token')
		Axios.get(
			url,

			{
				headers: {
					Authorization: token,
				},
			}
		).then((response) => {
			this.setState({ coaches_page: response.data.coaches })

			this.setState({ numberPages: response.data.page_number })
		})
	}

	componentDidMount() {
		this.coachesHandler()
	}

	setNumPage = (event, { activePage }) => {
		this.setState({ page: activePage })
		let url = `http://34.65.176.55:8081/api/coach/?page=${activePage}&search=${this.state.search}&limit=10/`
		Axios.get(url, {
			headers: {
				Authorization: this.token,
			},
		}).then((response) => {
			this.setState({ coaches_page: response.data.coaches })
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
								sorted={column === 'first_name last_name' ? direction : null}
								onClick={this.handleSort('first_name last_name')}
							>
								First and Last Name
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === 'email' ? direction : null}
								onClick={this.handleSort('email')}
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
						{this.state.coaches_page.map((coaches, index) => {
							return (
								<Table.Row key={index}>
									<Table.Cell>
										<Checkbox className='table-checkbox' />
										{coaches.first_name + ' ' + coaches.last_name}
									</Table.Cell>
									<Table.Cell>{coaches.email}</Table.Cell>
									<Table.Cell>{coaches.club}</Table.Cell>
									<Table.Cell>
										<img
											alt=''
											src={edit_icon}
											className='table-icons'
											onClick={(e) => this.editHandler(e, index)}
										/>
										<img
											alt=''
											onClick={(e) => this.hideDeleteConfirm(e, index)}
											src={trash_icon}
											id={index}
										/>
									</Table.Cell>
								</Table.Row>
							)
						})}
					</Table.Body>
				</Table>
				<PaginationDiv>
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
					hideConfirmEdit={this.hideConfirmEdit}
					hideAddConfirm={this.hideAddConfirm}
					hideDeleteConfirm={(e) => this.hideDeleteConfirm}
					id={this.state.id}
					name={'Edit Coach'}
					action={'Save'}
					editForm={true}
				/>

				<ModalDeleted
					hideAddConfirm={this.state.showDelete}
					hideModal={this.hideModal}
					setName={this.nameHandle}
					title={'Delete Coach'}
					name={this.state.nameDeleted}
					ConfirmDelete={this.deleteItem}
					description={
						'If you delete coach’s account, all data associated with this profile will permanently deleted.'
					}
				/>
			</div>
		)
	}
}
