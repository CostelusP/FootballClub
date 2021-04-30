import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Marginer } from '../marginer'
import {
	BoldLink,
	BoxContainer,
	FieldContainer,
	FieldError,
	FormContainer,
	FormSuccess,
	Input,
	MutedLink,
	SubmitButton,
	FormError,
} from '../common'
import { AccountContext } from '../context'
import axios from 'axios'
import { validationRegisterSchema } from '../schema/registerSchema'

export function SignUpForm(props) {
	const { switchToSignin } = useContext(AccountContext)
	const [success, setSuccess] = useState(null)
	const [error, setError] = useState(null)

	const onSubmit = async (values) => {
		const { confirmPassword, ...data } = values
		const response = await axios
			.post('http://localhost:3000/user/createUser', data)
			.catch((err) => {
				if (err && err.response) setError(err.response.data.message)
				setSuccess(null)
			})

		if (response && response.data) {
			setError(null)
			setSuccess(response.data.message)
			formik.resetForm()
		}
	}

	const formik = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validateOnBlur: true,
		onSubmit,
		validationSchema: validationRegisterSchema,
	})

	return (
		<BoxContainer>
			{!error && <FormSuccess>{success ? success : ''}</FormSuccess>}
			{!success && <FormError>{error ? error : ''}</FormError>}
			<FormContainer onSubmit={formik.handleSubmit}>
				<FieldContainer>
					<Input
						name='fullName'
						placeholder='Full Name'
						value={formik.values.fullName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<FieldError>
						{formik.touched.fullName && formik.errors.fullName
							? formik.errors.fullName
							: ''}
					</FieldError>
				</FieldContainer>
				<FieldContainer>
					<Input
						name='email'
						placeholder='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<FieldError>
						{formik.touched.email && formik.errors.email
							? formik.errors.email
							: ''}
					</FieldError>
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
					<FieldError>
						{formik.touched.password && formik.errors.password
							? formik.errors.password
							: ''}
					</FieldError>
				</FieldContainer>
				<FieldContainer>
					<Input
						name='confirmPassword'
						type='password'
						placeholder='Confirm Password'
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<FieldError>
						{formik.touched.confirmPassword && formik.errors.confirmPassword
							? formik.errors.confirmPassword
							: ''}
					</FieldError>
				</FieldContainer>
				<Marginer direction='vertical' margin='1em' />
				<SubmitButton type='submit' disabled={!formik.isValid}>
					Signup
				</SubmitButton>
			</FormContainer>
			<Marginer direction='vertical' margin={5} />
			<MutedLink href='#'>
				Already have an account?
				<BoldLink href='#' onClick={switchToSignin}>
					sign in
				</BoldLink>
			</MutedLink>
		</BoxContainer>
	)
}
