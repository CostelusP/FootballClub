import React, { Component } from 'react'
import { Grid, GridRow, Pagination, Input } from 'semantic-ui-react'
import { GridColumn } from 'semantic-ui-react'
import './selected-club.css'
import PersonClubThumbnail from './CardPerson'
import header_icon from '../../assets/edit.svg'
import InputForm from '../../modals/ModalAddClub'
import ModalDeleted from '../../modals/ModalDeleted'
import ModalAdded from '../../modals/ModalAdded'
import Axios from 'axios'

class SelectedClub extends Component {
	state = {
		membersClicked: false,
		show: false,
		showDelete: false,
		showAdd: false,
		members: [],
		clubDetails: '',
		request: false,
		owner: '',
		page: 1,
		numberPages: 1,
		searchString: '',
	}
	showModal = () => {
		this.setState({ show: true })
	}
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

	id_array = window.location.pathname.split('/')
	id = parseInt(this.id_array[2]) + 1

	requestsClickHandler = () => {
		let url = `http://34.65.176.55:8081/api/club/${this.id}/requested/?page=1&search`
		//let url = `http://192.168.100.228:8001/api/club/${this.id}/requested/?page=1&search&`;
		this.requestedMembersHandler()
	}

	requestedMembersHandler = () => {
		let url = `http://34.65.176.55:8081/api/club/${this.id}/requested/?page=1&search=${this.state.searchString}`
		const token = localStorage.getItem('token')
		Axios.get(
			url,

			{
				headers: {
					Authorization: token,
				},
			}
		)
			.then((response) => {
				this.setState({
					request: true,
					members: response.data.Members,
					clubDetails: response.data.Club_details,
					numberPages: response.data.page_number,
				})
			})
			.catch((error) => {
				alert(error)
			})
	}

	membersHandler = () => {
		let url = `http://34.65.176.55:8081/api/club/${this.id}/?page=1&search=${this.state.searchString}`
		const token = localStorage.getItem('token')
		Axios.get(
			url,

			{
				headers: {
					Authorization: token,
				},
			}
		)
			.then((response) => {
				this.setState({
					request: false,
					members: response.data.Members,
					clubDetails: response.data.Club_details,
					owner: response.data.Club_details.id_Owner,
					numberPages: response.data.page_number,
				})
			})
			.catch((error) => {
				alert(error)
			})
	}

	membersClickHandler = () => {
		this.membersHandler()
	}

	componentDidMount() {
		//let url = `http://34.65.176.55:8081/api/club/${this.id}/`;
		let url = `http://192.168.100.228:8001/api/club/${this.id}/?page=1&search&`
		this.membersHandler()
	}

	searchStringHandler = (e) => {
		this.setState({ searchString: e.target.value })
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchString !== this.state.searchString) {
			if (this.state.request) this.requestedMembersHandler()
			else this.membersHandler()
		}
	}

	hideDeleteConfirm = () => {
		this.setState({
			show: false,
			showDelete: true,
		})
	}

	setNumPage = (event, { activePage }) => {
		const token = localStorage.getItem('token')
		this.setState({ page: activePage })
		let url = `http://34.65.176.55:8081/api/club/${this.id}/?page=${activePage}&search=${this.state.searchString}`
		Axios.get(url, {
			headers: {
				Authorization: token,
			},
		}).then((response) => {
			this.setState({
				members: response.data.Members,
				clubDetails: response.data.Club_details,
				owner: response.data.Club_details.id_Owner,
				numberPages: response.data.page_number,
			})
		})
	}

	render() {
		var clubid = 0
		if (this.state.request === false) {
			clubid = 0
		} else {
			clubid = this.state.clubDetails.id
		}
		return (
			<div className='selected-club-main'>
				<div className='header-selected-club'>
					<h2>{this.state.clubDetails.name}</h2>
					<img
						src={header_icon}
						className='icon-header'
						onClick={this.showModal}
					/>
				</div>
				<label className='header-details'>Coach</label>
				<br />
				<label className='header-details-name'>
					{this.state.owner.first_name + ' ' + this.state.owner.last_name}
				</label>
				<div>
					<div className='selector-buttons'>
						<button className='button-club' onClick={this.membersClickHandler}>
							Members
						</button>
						<button className='button-club' onClick={this.requestsClickHandler}>
							Requests
						</button>
					</div>

					<Grid>
						<GridRow>
							<GridColumn floated='left' align='left' computer='8' tablet='16'>
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
							<GridColumn
								floated='right'
								align='right'
								computer='8'
								tablet='16'
							>
								<button className='button'>Add new</button>
							</GridColumn>
						</GridRow>
					</Grid>
					<InputForm
						showModal={this.state.show}
						hideModal={this.hideModal}
						hideDeleteConfirm={this.hideDeleteConfirm}
						hideAddConfirm={this.hideAddConfirm}
						name={'Edit Club'}
						action={'Save'}
						editForm={true}
					/>
					<ModalDeleted
						hideAddConfirm={this.state.showDelete}
						hideModal={this.hideModal}
					/>
					<ModalAdded
						hideAddConfirm={this.state.showAdd}
						hideModal={this.hideModal}
						name={'Club modified'}
						description={
							'Your club with name “Biking Club” has been succesfully modified in the system.'
						}
					/>
					<div className='persons-grid'>
						{this.state.members &&
							this.state.members.map((member, index) => {
								console.log(this.clubid, 'asfs')
								return (
									<PersonClubThumbnail
										key=''
										name={
											member.id_User.first_name + ' ' + member.id_User.last_name
										}
										gender={member.id_User.gender === 0 ? 'male' : 'female'}
										age={member.id_User.age}
										primary_sport={
											member.id_User.primary_sport
												? member.id_User.primary_sport.description
												: 'none'
										}
										requested={this.state.request}
										idUser={member.id_User.email}
										idClub={this.state.clubDetails.id}
										secondary_sport={
											member.id_User.secondary_sport
												? member.id_User.secondary_sport.description
												: 'none'
										}
									/>
								)
							})}
					</div>
				</div>
				<div className='pagination-numbers'>
					<Pagination
						activePage={this.state.page}
						totalPages={this.state.numberPages}
						onPageChange={this.setNumPage}
					/>
				</div>
			</div>
		)
	}
}

export default SelectedClub
