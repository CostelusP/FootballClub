import { Redirect, Route } from 'react-router'

const ProtectRoute = ({ component: Component, loggedIn, ...rest }) => {
	console.log('bb', loggedIn)
	return (
		<Route
			{...rest}
			render={(props) =>
				!loggedIn ? (
					<Redirect
						to={{
							pathname: '/auth',
							state: {
								from: props.location,
							},
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}
export { ProtectRoute }
