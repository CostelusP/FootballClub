import React from 'react'
import './Club.css'
import GroupAvatars from '../components/Avatar'
import {
	GridPlayers,
	LineFirstLabel,
	LineSecondLabel,
} from '../styledComponents'

const ClubThumbnail = (props) => {
	const a = 7
	return (
		<div className='ClubCards'>
			<h3>{props.name}</h3>
			<h4 className='h4-club'>{props.description}</h4>
			<h5 className='h5-club'>MEMBERS</h5>
			<div style={{ display: 'flex' }}>
				<GroupAvatars number={props.number} />
				{a > 4 ? (
					<label style={{ marginTop: '15px', marginLeft: '5px' }}>
						+{props.nrPlayers}
					</label>
				) : null}
			</div>
			<GridPlayers style={{ marginTop: '20px' }}>
				<LineFirstLabel>Coach</LineFirstLabel>
				<LineSecondLabel>{props.coach}</LineSecondLabel>
			</GridPlayers>
		</div>
	)
}

export default ClubThumbnail
