import React, { Component } from 'react'
import './Athletes.css'
import axios from 'axios'
import { Pagination, Input, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import PersonClubThumbnail from '../clubs/selected-club/CardPerson'
import ModalAthletes from '../modals/ModalAthletes'
import ModalAdded from '../modals/ModalAdded'
import ModalDeleted from '../modals/ModalDeleted'
import {
	Button,
	PagesContent,
	PagesTitle,
	PaginationDiv,
} from '../styledComponents'

class Athletes extends Component {
	state = {
		membersClicked: false,
		show: false,
		showDelete: false,
		players: [],
		page: 1,
		numberpages: 0,
		search: '',
		addAthlete: '',
		inClub: '',
	}

	handleOpenModal = () => {
		this.setState({ show: true })
	}

	handleCloseModal = () => {
		this.setState({ show: false })
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

	hideDeleteConfirm = () => {
		this.setState({
			show: false,
			showDelete: true,
		})
	}

	playersHandler = () => {
		let url = `http://localhost:3100/players/?page=1&search=default&limit=12`
		const token = localStorage.getItem('token')
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			this.setState({ players: response.data.players })
			this.setState({ numberpages: response.data.page_number })
		})
	}
	componentDidMount() {
		this.playersHandler()
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.search !== this.state.search) {
			this.setState({ search: prevProps.search })
			let url = `http://localhost:3100/players/?page=1&search=${this.state.search}&limit=12`
			const token = localStorage.getItem('token')
			axios.get(url, { headers: { Authorization: token } }).then((response) => {
				this.setState({ players: response.data.players })
				this.setState({ numberpages: response.data.page_number })
			})
		}
	}
	setNumPage = (event, { activePage }) => {
		this.setState({ page: activePage })
		let url = `http://localhost:3100/players/?page=${activePage}&search=default&limit=12`
		const token = localStorage.getItem('token')
		axios
			.get(url, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				this.setState({ players: response.data.players })
				this.setState({ numberpages: response.data.page_number })
			})
			.catch((error) => {
				console.log(error)
			})
	}
	hadleInput = (date) => {
		this.setState({ search: date.target.value })
	}
	AthleteIsAdded = (response) => {
		this.setState({ addAthlete: response })
	}
	AddInClub = (response) => {
		this.setState({ inClub: response })
	}
	render() {
		return (
			<PagesContent>
				<PagesTitle>players</PagesTitle>
				<Grid>
					<GridRow>
						<GridColumn floated='left' align='left' computer='8' tablet='8'>
							<Input
								iconPosition='left'
								className='search-bar'
								icon={{
									name: 'search',
									link: true,
								}}
								onChange={this.hadleInput}
								placeholder='Search...'
							/>
						</GridColumn>
						<GridColumn floated='right' align='right' computer='6' tablet='8'>
							<Button onClick={this.handleOpenModal}>ADD NEW</Button>
						</GridColumn>
					</GridRow>
				</Grid>

				<ModalAthletes
					nameModalAthletes='Create Player'
					playerToEdit={null}
					handleOpenModal={this.state.show}
					handleCloseModal={this.handleCloseModal}
					showModal={this.state.show}
					hideModal={this.hideModal}
					hideAddConfirm={this.hideAddConfirm}
					addAthlete={this.AthleteIsAdded}
					inClub={this.AddInClub}
					playersHandler={this.playersHandler}
				/>

				<div className='persons-atheltes'>
					{this.state.players &&
						this.state.players.map((player, index) => {
							const date_birth = player.date_of_birth
								.substring(0, player.date_of_birth.indexOf('T'))
								.split('-')
							const date_of_birth = `${date_birth[2]}.${date_birth[1]}.${date_birth[0]}`
							return (
								<PersonClubThumbnail
									full_name={player.full_name}
									age={player.age}
									position={player.position}
									date_of_birth={date_of_birth}
									weight={player.weight}
									height={player.height}
									rating={player.rating}
									salary={player.salary}
									isFrom='Player'
									handleOpenModal={this.state.show}
									handleCloseModal={this.handleCloseModal}
									showModal={this.state.show}
									hideModal={this.hideModal}
									hideAddConfirm={this.hideAddConfirm}
									addAthlete={this.AthleteIsAdded}
									inClub={this.AddInClub}
									playerToEdit={player}
									playersHandler={this.playersHandler}
								/>
							)
						})}
				</div>
				<PaginationDiv>
					<Pagination
						defaultActivePage={1}
						totalPages={this.state.numberpages}
						onPageChange={this.setNumPage}
						activePage={this.state.page}
					/>
				</PaginationDiv>
			</PagesContent>
		)
	}
}

export default Athletes
