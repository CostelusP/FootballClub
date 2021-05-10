import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import personImage from '../assets/person.jpg'
import './PersonThumbnail.css'
import Axios from 'axios'
import {
	GridPlayers,
	LineFirstLabel,
	LineSecondLabel,
} from '../styledComponents'

class PersonThumbnail extends Component {
	render() {
		return (
			<div>
				<Modal
					size='tiny'
					open={this.props.showModal}
					onClose={this.props.hideModal}
				>
					<Modal.Content>
						<img alt='imagePerson' src={personImage} className='person-image' />
						<label className='person-name'>{this.props.full_name}</label>
						<p className='person-details'>
							{this.props.position} - {this.props.age}
						</p>

						<div className='person-sports-div'>
							<hr className='person-hr' />
							<div style={{ margin: '0 auto', width: '75%' }}>
								<GridPlayers style={{ margin: '0 auto', width: '60%' }}>
									<LineFirstLabel>Date of birth</LineFirstLabel>
									<LineSecondLabel>{this.props.date_of_birth}</LineSecondLabel>
								</GridPlayers>
								<GridPlayers style={{ margin: '0 auto', width: '60%' }}>
									<LineFirstLabel>Weight</LineFirstLabel>
									<LineSecondLabel style={{ marginLeft: '95px' }}>
										{this.props.weight} kg
									</LineSecondLabel>
								</GridPlayers>
								<GridPlayers style={{ margin: '0 auto', width: '60%' }}>
									<LineFirstLabel>Height</LineFirstLabel>
									<LineSecondLabel style={{ marginLeft: '99px' }}>
										{this.props.height} m
									</LineSecondLabel>
								</GridPlayers>
								<GridPlayers style={{ margin: '0 auto', width: '60%' }}>
									<LineFirstLabel>Rating</LineFirstLabel>
									<LineSecondLabel style={{ marginLeft: '100px' }}>
										{this.props.rating}
									</LineSecondLabel>
								</GridPlayers>
								<GridPlayers style={{ margin: '0 auto', width: '60%' }}>
									<LineFirstLabel>Salary</LineFirstLabel>
									<LineSecondLabel style={{ marginLeft: '97px' }}>
										{this.props.salary}$
									</LineSecondLabel>
								</GridPlayers>
							</div>
							<hr className='person-hr' />
						</div>
						<button
							className='button-modal-added'
							onClick={this.props.hideModal}
						>
							Close
						</button>
					</Modal.Content>
				</Modal>
			</div>
		)
	}
}

export default PersonThumbnail
