import React from 'react'
import './Club.css'
import GroupAvatars from '../components/Avatar'

const ClubThumbnail = (props) => {
	return (
		<div className='ClubCards'>
			<h3>{props.name}</h3>
			<h5>MEMBERS</h5>
			<GroupAvatars number={props.number} />
			<p className='coach-p'>Coach</p>
			<p className='coach-name-p'>{props.coach}</p>
		</div>
	)
}

export default ClubThumbnail
