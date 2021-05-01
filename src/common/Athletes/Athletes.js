import React, { Component } from 'react'
import './Athletes.css'
import InputSearch from '../InputSearch'
import axios from 'axios'
import {
	Icon,
	Pagination,
	Input,
	Grid,
	GridRow,
	GridColumn,
} from 'semantic-ui-react'
import PersonClubThumbnail from '../../admin/Clubs/selected-club/person-in-club-card'
import ModalAthletes from './ModalAthletes/ModalAthletes'
import ModalAdded from '../Modals/ModalAdded'
import ModalDeleted from '../Modals/ModalDeleted'
import {
	Button,
	PagesContent,
	PagesTitle,
	PaginationDiv,
} from '../../styledComponents'

class Athletes extends Component {
	state = {
		membersClicked: false,
		show: false,
		showDelete: false,
		showAdd: false,
		athletes: [],
		page: 1,
		numberpages: 0,
		search: '',
		addAthlete: '',
		inClub: '',
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.search !== this.state.search) {
			this.setState({ search: prevProps.search })

			let url = `http://34.65.176.55:8081/api/athlete/?page=1&search=${this.state.search}&limit=10/`
			const token = localStorage.getItem('token')
			axios.get(url, { headers: { Authorization: token } }).then((response) => {
				this.setState({ athletes: response.data.athletes })
				this.setState({ numberpages: response.data.page_number })
			})
		}
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
	componentDidMount() {
		let url = `http://34.65.176.55:8081/api/athlete/?page=1&limit=10`
		const token = localStorage.getItem('token')
		axios.get(url, { headers: { Authorization: token } }).then((response) => {
			this.setState({ athletes: response.data.athletes })
			this.setState({ numberpages: response.data.page_number })
		})
	}
	setNumPage = (event, { activePage }) => {
		this.setState({ page: activePage })
		let url = `http://34.65.176.55:8081/api/athlete/?page=${activePage}&limit=10/`
		const token = localStorage.getItem('token')
		axios
			.get(url, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				this.setState({ athletes: response.data.athletes })
				this.setState({ numberpages: response.data.page_number })
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
				<PagesTitle>Athletes</PagesTitle>
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
					NameModalAthletes='Add Athlete'
					handleOpenModal={this.state.show}
					handleCloseModal={this.handleCloseModal}
					showModal={this.state.show}
					hideModal={this.hideModal}
					hideAddConfirm={this.hideAddConfirm}
					addAthlete={this.AthleteIsAdded}
					inClub={this.AddInClub}
				/>

				<ModalDeleted
					hideAddConfirm={this.state.showDelete}
					hideModal={this.hideModal}
				/>
				<ModalAdded
					hideAddConfirm={this.state.showAdd}
					hideModal={this.hideModal}
					name={'Athlete Added'}
					description={`Athlete ${this.state.addAthlete} was added on ${this.state.inClub}`}
				/>
				<div className='persons-atheltes'>
					{this.state.athletes &&
						this.state.athletes.map((athlete, index) => (
							<PersonClubThumbnail
								name={athlete.first_name + ' ' + athlete.last_name}
								gender={athlete.gender}
								age={athlete.age}
								primary_sport={athlete.primary_sport}
								secondary_sport={athlete.secondary_sport}
							/>
						))}
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
