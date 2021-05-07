import React, { Component } from 'react'
import InputForm from '../modals/ModalAddClub'
import { Link } from 'react-router-dom'
import ClubThumbnail from './ClubThumbnail'
import { Grid, GridRow, Input } from 'semantic-ui-react'
import { GridColumn } from 'semantic-ui-react'
import ModalAdded from '../modals/ModalAdded'
import axios from 'axios'
import './Club.css'
import { Button, PagesContent, PagesTitle } from '../styledComponents'

class Club extends Component {
	clubs = [
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
		{ id_Owner: { first_name: 'aaa', last_name: 'bb' } },
	]
	state = {
		show: false,
		showAdd: false,
		clubs: [],
		searchString: '',
		clubAdded: '',
	}

	showModal = () => {
		this.setState({ show: true })
	}

	hideModal = () => {
		this.setState({ show: false, showAdd: false })
	}

	hideAddConfirm = () => {
		this.getClub()
		this.setState({
			show: false,
			showAdd: true,
		})
	}

	searchStringHandler = (e) => {
		this.setState({ searchString: e.target.value })
	}

	getClub = () => {
		let url = `http://34.65.176.55:8081/api/club/?search=${this.state.searchString}`
		const token = localStorage.getItem('token')
		axios
			.get(url, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				this.setState(
					{
						clubs: response.data.clubs,
						noOfMembers: response.data.numbers,
					},
					function () {}
				)
			})
	}

	setClubAdded = (response) => {
		this.setState({ clubAdded: response })
	}

	componentDidMount() {
		this.getClub()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchString !== this.state.searchString) {
			this.getClub()
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
										onClick: this.searchHandler,
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
					<InputForm
						showModal={this.state.show}
						hideModal={this.hideModal}
						hideAddConfirm={this.hideAddConfirm}
						name={'Add Club'}
						action={'Add'}
						editForm={false}
						clubAdded={this.setClubAdded}
						object={[]}
					/>
					<ModalAdded
						hideAddConfirm={this.state.showAdd}
						hideModal={this.hideModal}
						name={'Club added'}
						description={`Your club with name ${this.state.clubAdded} has been succesfully added in the system.`}
						object={this.props.object}
					/>
					<div className='grid-container'>
						{this.state.clubs &&
							this.clubs.map((club, index) => (
								<Link to={`/clubs/${index}`} className='linkStyle'>
									<ClubThumbnail
										key={index}
										name={club.name}
										coach={
											club.id_Owner.first_name + ' ' + club.id_Owner.last_name
										}
										className='grid-item'
										number={3}
										id={index}
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
