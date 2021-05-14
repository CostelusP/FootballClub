import React, { useState } from 'react'
import { Card, Image } from 'semantic-ui-react'

import './selected-club.css'
import PersonThumbnail from '../PersonThumbnail'
import {
	GridPlayers,
	LineSecondLabel,
	LineFirstLabel,
} from '../../styledComponents'
import ModalAthletes from '../../modals/ModalAthletes'

const PersonClubThumbnail = (props) => {
	const [show, setShow] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const hideModal = () => {
		setShow(false)
	}
	const handleCloseModal = () => {
		setShowModal(false)
	}
	const setShowModalOrCard = () => {
		if (props.isFrom === 'Player') return setShowModal(!showModal)
		return setShow(!show)
	}
	return (
		<div className='person-club-card'>
			<Card className='card-width' onClick={setShowModalOrCard}>
				<Card.Content>
					<Image
						floated='left'
						size='mini'
						src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
						circular
					/>
					<Card.Header className='header-name'>{props.full_name}</Card.Header>
					<Card.Meta className='meta-custom'>
						{props.position} - {props.age} YEARS
					</Card.Meta>
					<Card.Description content>
						<GridPlayers>
							<LineFirstLabel>Date of birth</LineFirstLabel>
							<LineSecondLabel>{props.date_of_birth}</LineSecondLabel>
						</GridPlayers>
						<GridPlayers>
							<LineFirstLabel>Rating</LineFirstLabel>
							<LineSecondLabel style={{ marginLeft: '110px' }}>
								{props.rating}
							</LineSecondLabel>
						</GridPlayers>
					</Card.Description>
				</Card.Content>
			</Card>
			<PersonThumbnail
				key={props.idUser + 'children'}
				showModal={show}
				hideModal={hideModal}
				full_name={props.full_name}
				age={props.age}
				position={props.position}
				date_of_birth={props.date_of_birth}
				weight={props.weight}
				height={props.height}
				rating={props.rating}
				salary={props.salary}
				idUser={props.idUser}
				idClub={props.idClub}
			/>
			<ModalAthletes
				nameModalAthletes='Edit Player'
				playerToEdit={props.playerToEdit}
				handleOpenModal={showModal}
				handleCloseModal={handleCloseModal}
				editPlayer={true}
				playersHandler={props.playersHandler}
			/>
		</div>
	)
}

export default PersonClubThumbnail
