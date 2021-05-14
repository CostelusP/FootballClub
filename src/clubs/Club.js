import React, { Component } from 'react'
import ModalAddClub from '../modals/ModalAddClub'
import { Link } from 'react-router-dom'
import ClubThumbnail from './ClubThumbnail'
import { Grid, GridRow, Input } from 'semantic-ui-react'
import { GridColumn } from 'semantic-ui-react'
import axios from 'axios'
import './Club.css'
import { Button, PagesContent, PagesTitle } from '../styledComponents'

class Club extends Component {
	state = {
		show: false,
		clubs: [],
		search: '',
	}

	showModal = () => {
		this.setState({ show: true })
	}

	hideModal = () => {
		this.setState({ show: false })
	}

	searchStringHandler = (e) => {
		this.setState({ search: e.target.value })
	}

	getClubs = () => {
		let url = `http://localhost:3100/clubs/?search=${this.state.search}`
		const token = localStorage.getItem('token')
		axios
			.get(url, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				this.setState({
					clubs: response.data,
				})
			})
	}

	componentDidMount() {
		this.getClubs()
	}

	componentDidUpdate(_, prevState) {
		if (prevState.search !== this.state.search) {
			this.getClubs()
		}
	}

	render() {
		return (
			<PagesContent>
				<PagesTitle>Clubs</PagesTitle>
				<div>
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
									onChange={this.searchStringHandler}
									placeholder='Search...'
								/>
							</GridColumn>
							<GridColumn floated='right' align='right' computer='8' tablet='8'>
								<Button onClick={this.showModal}>ADD NEW</Button>
							</GridColumn>
						</GridRow>
					</Grid>
					<ModalAddClub
						showModal={this.state.show}
						hideModal={this.hideModal}
						name={'Add Club'}
						action={'ADD'}
						getClubs={this.getClubs}
					/>
					<div className='grid-container'>
						{this.state.clubs &&
							this.state.clubs.map((club, _) => (
								<Link to={`/clubs/${club.club.id}`} className='linkStyle'>
									<ClubThumbnail
										key={club.club.id + '-club_person'}
										name={club.club.name}
										description={club.club.description}
										coach={club.coach.user_name || '-'}
										className='grid-item'
										number={3}
										id={club.club.id}
									/>
								</Link>
							))}
					</div>
				</div>
			</PagesContent>
		)
	}
}

export default Club
