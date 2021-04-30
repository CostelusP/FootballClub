/* eslint-disable no-script-url */
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Marginer } from '../marginer'
import {
	BoldLink,
	BoxContainer,
	FieldContainer,
	FieldError,
	FormContainer,
	FormError,
	Input,
	MutedLink,
	SubmitButton,
} from '../common'
import { AccountContext } from '../context'
import axios from 'axios'
import { validationLoginSchema } from '../schema/loginSchema'

export function LoginForm(props) {
	const { switchToSignup } = useContext(AccountContext)
	const [error, setError] = useState(null)
	const [loginStatus, setLoginStatus] = useState(false)

	const onSubmit = async (values) => {
		setError(null)
		const response = await axios
			.post('http://localhost:3100/users/login', values)
			.catch((err) => {
				if (err && err.response) setError(err.response.data.message)
				console.error(err)
				setLoginStatus(false)
			})

		if (response) {
			alert('Welcome back in. Authenticating...')
		}
		if (response.data && response.data.message === 'User logged in') {
			localStorage.setItem('token', response.data.access_token)
			setLoginStatus(true)
		}
	}

	const formik = useFormik({
		initialValues: { email_address: '', password: '' },
		validateOnBlur: true,
		onSubmit,
		validationSchema: validationLoginSchema,
	})

	return (
		<BoxContainer>
			<FormError>{error ? error : ''}</FormError>
			<FormContainer onSubmit={formik.handleSubmit}>
				<FieldContainer>
					<Input
						name='email_address'
						placeholder='Email'
						value={formik.values.email_address}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{
						<FieldError>
							{formik.touched.email_address && formik.errors.email_address
								? formik.errors.email_address
								: ''}
						</FieldError>
					}
				</FieldContainer>
				<FieldContainer>
					<Input
						name='password'
						type='password'
						placeholder='Password'
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{
						<FieldError>
							{formik.touched.password && formik.errors.password
								? formik.errors.password
								: ''}
						</FieldError>
					}
				</FieldContainer>
				<MutedLink href='#'>Forgot Password?</MutedLink>
				<Marginer direction='vertical' margin='1em' />
				<SubmitButton type='submit' disabled={!formik.isValid}>
					Login
				</SubmitButton>
			</FormContainer>
			<Marginer direction='vertical' margin={5} />
			<MutedLink href='javascript:void(0);'>
				Dont have an Account?
				<BoldLink href='javascript:void(0);' onClick={switchToSignup}>
					sign up
				</BoldLink>
			</MutedLink>
		</BoxContainer>
	)
}
