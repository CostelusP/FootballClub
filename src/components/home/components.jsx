import { Avatar, withStyles } from '@material-ui/core'
import styled from 'styled-components'

const AvatarDiv = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 60px;
`

const UserName = styled.p`
	display: flex;
	justify-content: center;
	color: white;
	font-family: 'Inter', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 22px;
`
const UserRole = styled.p`
	display: flex;
	justify-content: center;
	text-align: center;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	font-family: Inter;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 12px;
	color: #8e9296;
`
const LogOut = styled.div`
	position: absolute;
	bottom: 60px;
	margin-left: 67px;
	cursor: pointer;
`

const LogOutDiv = styled.div`
	letter-spacing: 0.06em;
	text-transform: uppercase;
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 12px;
	background: #1a1a1a;
	color: white;
	cursor: pointer;
	overflow: hidden;
	display: inline-block;
	margin-left: 5px;
	margin-bottom: 3px;
`

const StyledAvatar = withStyles({
	root: {
		height: '90px',
		width: '90px',
	},
})(Avatar)

export { AvatarDiv, StyledAvatar, UserName, UserRole, LogOut, LogOutDiv }
