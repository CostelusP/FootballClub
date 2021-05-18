import React, { Component } from 'react'
import './Athletes.css'
import axios from 'axios'
import { Pagination, Input, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import PersonClubThumbnail from '../clubs/selected-club/CardPerson'
import ModalAthletes from '../modals/ModalAthletes'
import {
	Button,
	PagesContent,
	PagesTitle,
	PaginationDiv,
} from '../styledComponents'
import jwt from 'jwt-decode'

class Athletes extends Component {
	state = {
		show: false,
		players: [],
		page: 1,
		numberpages: 0,
		search: 'default',
	}

	showModal = () => {
		this.setState({ show: true })
	}

	hideModal = () => {
		this.setState({
			show: false,
		})
	}

	playersHandler = () => {
		const role = localStorage.getItem('role')
		const token = localStorage.getItem('token')
		const decoded = jwt(token)
		const userId = decoded.user.id
		let url = `http://localhost:3100/players/?page=1&search=default&limit=12&role=${role}&userId=${userId}`
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			this.setState({ players: response.data.players })
			this.setState({ numberpages: response.data.page_number })
		})
	}

	componentDidMount() {
		this.playersHandler()
	}

	componentDidUpdate(prevProps, prevState) {
		const role = localStorage.getItem('role')
		const token = localStorage.getItem('token')
		const decoded = jwt(token)
		const userId = decoded.user.id
		if (prevProps.search !== this.state.search) {
			this.setState({ search: prevProps.search })
			let url = `http://localhost:3100/players/?page=1&search=${this.state.search}&limit=12&clubId=null&isFrom=null&role=${role}&userId=${userId}`

			axios.get(url).then((response) => {
				this.setState({ players: response.data.players })
				this.setState({ numberpages: response.data.page_number })
			})
		}
	}

	setNumPage = (event, { activePage }) => {
		const role = localStorage.getItem('role')
		const token = localStorage.getItem('token')
		const decoded = jwt(token)
		const userId = decoded.user.id
		this.setState({ page: activePage })
		let url = `http://localhost:3100/players/?page=${activePage}&search=default&limit=12&clubId=null&isFrom=null&role=${role}&userId=${userId}`
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
							<Button onClick={this.showModal}>ADD NEW</Button>
						</GridColumn>
					</GridRow>
				</Grid>

				<ModalAthletes
					nameModalAthletes='Create Player'
					playerToEdit={null}
					handleOpenModal={this.state.show}
					handleCloseModal={this.hideModal}
					playersHandler={this.playersHandler}
				/>

				<div className='persons-atheltes'>
					{this.state.players &&
						this.state.players.map((player, _) => {
							const date_birth = player.date_of_birth
								.substring(0, player.date_of_birth.indexOf('T'))
								.split('-')
							const date_of_birth = `${date_birth[2]}.${date_birth[1]}.${date_birth[0]}`
							return (
								<PersonClubThumbnail
									key={player.id + 'club-thumb'}
									full_name={player.full_name}
									age={player.age}
									position={player.position}
									date_of_birth={date_of_birth}
									weight={player.weight}
									height={player.height}
									rating={player.rating}
									salary={player.salary}
									isFrom='Player'
									playerToEdit={player}
									playersHandler={this.playersHandler}
								/>
							)
						})}
				</div>
				<PaginationDiv>
					<Pagination
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
