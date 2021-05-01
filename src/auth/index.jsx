import React, { useState } from 'react'
import { LoginForm } from './login/loginForm'
import { AccountContext } from './context'
import { SignUpForm } from './signUp/signUp'
import { backdropVariants, expandingTransition } from '../common/constants'
import {
	InnerContainer,
	SmallText,
	BoxContainer,
	TopContainer,
	HeaderContainer,
	HeaderText,
	BackDrop,
	AppContainer,
} from './component'

export function Authentication(props) {
	console.log(props)
	const [isExpanded, setExpanded] = useState(false)
	const [active, setActive] = useState('signin')

	const playExpandingEffect = () => {
		setExpanded(true)
		setTimeout(() => {
			setExpanded(false)
		}, expandingTransition.duration * 1000 - 1500)
	}

	const switchActive = (active) => {
		setTimeout(() => setActive(active), 400)
	}

	const switchToSignup = () => {
		playExpandingEffect()
		switchActive('signup')
	}

	const switchToSignin = () => {
		playExpandingEffect()
		switchActive('signin')
	}

	const contextValue = {
		switchToSignup,
		switchToSignin,
		playExpandingEffect,
	}

	return (
		<AccountContext.Provider value={contextValue}>
			<AppContainer>
				<BoxContainer>
					<TopContainer>
						<BackDrop
							initial={false}
							animate={isExpanded ? 'expanded' : 'collapsed'}
							variants={backdropVariants}
							transition={expandingTransition}
						/>
						{active === 'signin' && (
							<HeaderContainer>
								<HeaderText>Welcome</HeaderText>
								<HeaderText>Back</HeaderText>
								<SmallText>Please sign-in to continue!</SmallText>
							</HeaderContainer>
						)}
						{active === 'signup' && (
							<HeaderContainer>
								<HeaderText>Create</HeaderText>
								<HeaderText>Account</HeaderText>
								<SmallText>Please sign-up to continue!</SmallText>
							</HeaderContainer>
						)}
					</TopContainer>
					<InnerContainer>
						{active === 'signin' && <LoginForm setAuthenticated={props} />}
						{active === 'signup' && <SignUpForm />}
					</InnerContainer>
				</BoxContainer>
			</AppContainer>
		</AccountContext.Provider>
	)
}
