import styled from 'styled-components'

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
const LogOut = styled.div`
	position: absolute;
	bottom: 60px;
	margin-left: 67px;
	cursor: pointer;
`
const PagesTitle = styled.h2`
	width: 177px;
	height: 42px;
	margin-left: 30px !important;
	margin-top: 30px !important;
	font-family: Inter;
	font-style: normal;
	font-weight: normal;
	font-size: 36px;
	line-height: 42px;
	display: flex;
	align-items: center;
	text-transform: capitalize;
	color: #000000;
`

const PagesContent = styled.div`
	position: absolute;
	background: #f9f9f9;
	height: 100%;
	width: 82%;
	left: 18%;
	margin-right: 0px;
`

const Button = styled.button`
	background-color: #1a1a1a;
	text-align: center;
	color: #44dabd;
	padding: 5px;
	border-radius: 8px;
	width: 150px;
	height: 40px;
	cursor: pointer;
	margin-right: 30px;
`
const PaginationDiv = styled.div`
	margin: 20px 0px 0px 30px;
`

export { LogOutDiv, LogOut, PagesTitle, PagesContent, Button, PaginationDiv }
