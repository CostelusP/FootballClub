import { Component, useContext } from 'react'
import { AccountContext } from '../context'

const ProtectRoute = ({ component: Component, ...rest }) => {
	const { isLogged } = useContext(AccountContext)
}
