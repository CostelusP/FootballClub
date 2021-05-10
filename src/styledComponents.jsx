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
	display: flex;
	justify-content: center;
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
const CancelButton = styled.button`
	width: 86px;
	height: 40px;
	right: 195px;
	bottom: 39px;
	border-radius: 8px;
	border: solid 1px black;
	margin-right: 5px;
	cursor: pointer;
`

const DeleteButton = styled.button`
	width: 86px;
	height: 40px;
	right: 195px;
	bottom: 39px;
	border-radius: 8px;
	border: solid 1px;
	margin-right: 5px;
	color: #44dabd;
	cursor: pointer;
`

const PaginationDiv = styled.div`
	margin: 20px 0px 0px 30px;
`

const GridPlayers = styled.div`
	display: flex;
	margin-bottom: -5px;
`
const LineSecondLabel = styled.label`
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	line-height: 24px;
	display: flex;
	align-items: right;
	color: #000000;
	margin-left: 60px;
`
const LineFirstLabel = styled.label`
	font-family: Inter;
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
	display: flex;
	align-items: center;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: #8e9296;
`

export {
	LogOutDiv,
	LogOut,
	PagesTitle,
	PagesContent,
	Button,
	PaginationDiv,
	CancelButton,
	DeleteButton,
	GridPlayers,
	LineSecondLabel,
	LineFirstLabel,
}
