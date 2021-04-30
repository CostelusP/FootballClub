import React, { Component } from 'react'
import { LeftSideBar } from './sideBar'
import { NavLink, Link, useHistory } from 'react-router-dom'
import avatar from '../../assets/images/person.jpg'
import logout from '../../assets/images/log-out.svg'
import {
	AvatarDiv,
	LogOut,
	LogOutDiv,
	StyledAvatar,
	UserName,
	UserRole,
} from './components'

export function SideBar(props) {
	const history = useHistory()
	const userName = 'Costelus Pamparau'
	const role = 'Administrator'
	// const user=localStorage.getItem('user_name')
	// const role=localStorage.getItem('role')==='F'? 'Coach':'Administrator'
	const logOutHandler = () => {
		localStorage.clear()
		history.push('/auth')
	}

	return (
		<LeftSideBar>
			<AvatarDiv>
				<StyledAvatar src={avatar} />
			</AvatarDiv>
			<UserName>{userName}</UserName>
			<UserRole>{role}</UserRole>

			<LogOut onClick={logOutHandler}>
				<img alt='logOut' src={logout} />
				<LogOutDiv>Logout</LogOutDiv>
			</LogOut>
		</LeftSideBar>
	)
}

export default SideBar
