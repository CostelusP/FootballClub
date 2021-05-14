import React, { Component } from 'react'
import { Grid, GridRow, Pagination, Input } from 'semantic-ui-react'
import { GridColumn } from 'semantic-ui-react'
import './selected-club.css'
import PersonClubThumbnail from './CardPerson'
import header_icon from '../../assets/edit.svg'
import ModalDeleted from '../../modals/ModalDeleted'
import ModalAdded from '../../modals/ModalAdded'
import Axios from 'axios'
import { PagesContent, PagesTitle, PaginationDiv } from '../../styledComponents'
import ModalAddClub from '../../modals/ModalAddClub'

class SelectedClub extends Component {
	state = {
		membersClicked: false,
		show: false,
		showDelete: false,
		showAdd: false,
		players: [],
		club: {},
		request: false,
		owner: '',
		page: 1,
		numberPages: 0,
		search: '',
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

	getClub = () => {
		const id_array = window.location.pathname.split('/')
		const id = id_array[2]
		let url = `http://localhost:3100/clubs/club/${id}`
		const token = localStorage.getItem('token')
		Axios.get(url, {
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				console.log('aici', response.data)
				this.setState({
					club: response.data,
				})
			})
			.catch((error) => {
				// alert(error)
			})
	}
	playersHandler = () => {
		const id_array = window.location.pathname.split('/')
		const id = id_array[2]
		let url = `http://localhost:3100/players/?page=1&search=default&limit=12&clubId=${id}&isFrom=Club`
		const token = localStorage.getItem('token')
		Axios.get(url, { headers: { Authorization: token } }).then((response) => {
			console.log('aaaaa', response.data)
			this.setState({ players: response.data.players })
			this.setState({ numberPages: response.data.page_number })
		})
	}
	componentDidMount() {
		this.getClub()
		this.playersHandler()
	}

	componentDidUpdate(prevProps, prevState) {
		const id_array = window.location.pathname.split('/')
		const id = id_array[2]
		if (prevProps.search !== this.state.search) {
			this.setState({ search: prevProps.search })
			console.log(this.state.search)
			let url = `http://localhost:3100/players/?page=1&search=${this.state.search}&limit=12&clubId=${id}&isFrom=Club`
			const token = localStorage.getItem('token')
			Axios.get(url, { headers: { Authorization: token } }).then((response) => {
				console.log(response.data)
				this.setState({ players: response.data.players })
				this.setState({ numberpages: response.data.page_number })
			})
		}
	}

	showDeleteConfirm = () => {
		this.setState({
			showDelete: true,
		})
	}

	setNumPage = (event, { activePage }) => {
		const id_array = window.location.pathname.split('/')
		const id = id_array[2]
		this.setState({ page: activePage })
		let url = `http://localhost:3100/players/?page=${activePage}&search=default&limit=12&clubId=${id}&isFrom=Club`
		const token = localStorage.getItem('token')
		Axios.get(url, {
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				this.setState({ players: response.data.players })
				this.setState({ numberPages: response.data.page_number })
			})
			.catch((error) => {
				console.log(error)
			})
	}
	hadleInput = (date) => {
		this.setState({ search: date.target.value })
	}

	render() {
		return (
			<PagesContent>
				<div style={{ display: 'flex' }}>
					<PagesTitle>{this.state.club.club?.name}</PagesTitle>
					<img
						alt='editClub'
						src={header_icon}
						className='icon-header'
						onClick={this.showModal}
					/>
				</div>
				<label className='header-details'>Coach</label>
				<label className='header-details-name'>
					{this.state.club.coach?.user_name
						? this.state.club.coach?.user_name
						: '-'}
				</label>
				<div style={{ marginTop: '50px' }}>
					<Grid>
						<GridRow>
							<GridColumn floated='left' align='left' computer='8' tablet='8'>
								<Input
									className='search-bar'
									iconPosition='left'
									icon={{
										name: 'search',
										link: true,
										onClick: this.hadleInput,
									}}
									onChange={this.hadleInput}
									placeholder='Search...'
								/>
							</GridColumn>
						</GridRow>
					</Grid>
				</div>
				<ModalAddClub
					showModal={this.state.show}
					hideModal={this.hideModal}
					hideDeleteConfirm={this.hideDeleteConfirm}
					hideAddConfirm={this.hideAddConfirm}
					name={'Edit Club'}
					action={'Save'}
					editForm={true}
					clubToEdit={this.state.club.club}
					getClub={this.getClub}
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
					{this.state.players &&
						this.state.players.map((player, index) => {
							console.log(player, 'asfs')
							const date_birth = player.date_of_birth
								.substring(0, player.date_of_birth.indexOf('T'))
								.split('-')
							const date_of_birth = `${date_birth[2]}.${date_birth[1]}.${date_birth[0]}`
							return (
								<PersonClubThumbnail
									key=''
									full_name={player.full_name}
									age={player.age}
									position={player.position}
									date_of_birth={date_of_birth}
									weight={player.weight}
									height={player.height}
									rating={player.rating}
									salary={player.salary}
								/>
							)
						})}
				</div>

				<PaginationDiv>
					<Pagination
						totalPages={this.state.numberPages}
						onPageChange={this.setNumPage}
						activePage={this.state.page}
					/>
				</PaginationDiv>
			</PagesContent>
		)
	}
}

export default SelectedClub
