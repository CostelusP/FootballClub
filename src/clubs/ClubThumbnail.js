import React from 'react'
import './Club.css'
import GroupAvatars from '../components/Avatar'

const ClubThumbnail = (props) => {
	const a=7;
	return (
		<div className='ClubCards'>
			<h3>{props.name}</h3>
			<h5>MEMBERS</h5>
			<div style={{display:'flex'}}>
			<GroupAvatars number={props.number} />
			{a>4?<label style={{marginTop:'20px', marginLeft:'5px'}}>+{a}</label>:null}
			</div>
			<p className='coach-p'>Coach</p>
			<p className='coach-name-p'>{props.coach}</p>
		</div>
	)
}

export default ClubThumbnail
