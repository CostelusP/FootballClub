import React, { Component } from 'react'
import { Grid, GridRow, Pagination, Input } from 'semantic-ui-react'
import { GridColumn } from 'semantic-ui-react'
import './selected-club.css'
import PersonClubThumbnail from './CardPerson'
import header_icon from '../../assets/edit.svg'
import axios from 'axios'
import { PagesContent, PagesTitle, PaginationDiv } from '../../styledComponents'
import ModalAddClub from '../../modals/ModalAddClub'

class SelectedClub extends Component {
	state = {
		show: false,
		players: [],
		club: {},
		page: 1,
		numberPages: 0,
		search: '',
	}
	role = localStorage.getItem('role')
	showModal = () => {
		if (this.role === 'Administrator') this.setState({ show: true })
	}

	hideModal = () => {
		this.setState({
			show: false,
		})
	}

	getClub = () => {
		const id_array = window.location.pathname.split('/')
		const id = id_array[2]
		let url = `http://localhost:3100/clubs/club/${id}`
		const token = localStorage.getItem('token')
		axios
			.get(url, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
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
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
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
			let url = `http://localhost:3100/players/?page=1&search=${this.state.search}&limit=12&clubId=${id}&isFrom=Club`
			const token = localStorage.getItem('token')
			axios.get(url, { headers: { Authorization: token } }).then((response) => {
				this.setState({ players: response.data.players })
				this.setState({ numberpages: response.data.page_number })
			})
		}
	}

	setNumPage = (event, { activePage }) => {
		const id_array = window.location.pathname.split('/')
		const id = id_array[2]
		this.setState({ page: activePage })
		let url = `http://localhost:3100/players/?page=${activePage}&search=default&limit=12&clubId=${id}&isFrom=Club`
		const token = localStorage.getItem('token')
		axios
			.get(url, {
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

	hadleInput = (data) => {
		this.setState({ search: data.target.value })
	}

	render() {
		return (
			<PagesContent>
				<div style={{ display: 'flex' }}>
					<PagesTitle>{this.state.club.club?.name}</PagesTitle>
					<img
						alt='edit-club'
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
					nameModalClub={'Edit Club'}
					action={'EDIT'}
					clubToEdit={this.state.club.club}
					getClub={this.getClub}
				/>

				<div className='persons-grid'>
					{this.state.players &&
						this.state.players.map((player, index) => {
							const date_birth = player.date_of_birth
								.substring(0, player.date_of_birth.indexOf('T'))
								.split('-')
							const date_of_birth = `${date_birth[2]}.${date_birth[1]}.${date_birth[0]}`
							return (
								<PersonClubThumbnail
									key={index + '-person'}
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
