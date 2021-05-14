import React, { Component } from 'react'
import CoachTable from './CoachTable'
import { Grid, GridRow, GridColumn, Input } from 'semantic-ui-react'
import './Coach.css'
import ModalAddCoach from '../modals/ModalAddCoach'
import ModalAdded from '../modals/ModalAdded'
import { Button, PagesContent, PagesTitle } from '../styledComponents'

class Coach extends Component {
	state = {
		show: false,
		showAdd: false,
		coaches: [],
		name: '',
		searchString: '',
		searchOk: false,
	}

	constructor(props) {
		super(props)
		this.childTable = React.createRef()
	}

	nameHandle = (nameReceived) => {
		this.setState({ name: nameReceived })
	}

	showModal = () => {
		this.setState({ show: true })
	}

	hideModal = () => {
		this.setState({ show: false, showAdd: false })
	}

	hideAddConfirm = () => {
		this.setState({
			show: false,
			showAdd: true,
		})
	}

	searchStringHandler = (e) => {
		this.setState({ searchString: e.target.value })
	}

	handlerCoachesChild = () => {
		this.childTable.current.coachesHandler()
	}

	render() {
		return (
			<PagesContent>
				<PagesTitle>Coaches</PagesTitle>
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
				<div className='coach-table'>
					<CoachTable
						ref={this.childTable}
						searchString={this.state.searchString}
						searchPressed={this.state.searchOk}
					/>
				</div>
				<ModalAddCoach
					showModal={this.state.show}
					hideModal={this.hideModal}
					coachesHandler={this.handlerCoachesChild}
					name={'Add Coach'}
					action={'Add'}
					editForm={false}
				/>
				<ModalAdded
					hideAddConfirm={this.state.showAdd}
					hideModal={this.hideModal}
					name={'Coach added'}
					description={'Coach ' + this.state.name + ' was added'}
				/>
			</PagesContent>
		)
	}
}

export default Coach
