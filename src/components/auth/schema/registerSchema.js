import * as yup from 'yup'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const validationRegisterSchema = yup.object({
	fullName: yup
		.string()
		.min(3, 'Please enter you real name')
		.required('Full name is required!'),
	email: yup.string().email('Please enter a valid email address').required(),
	password: yup
		.string()
		.matches(PASSWORD_REGEX, 'Please enter a strong password')
		.required(),
	confirmPassword: yup
		.string()
		.required('Please confirm your password')
		.when('password', {
			is: (val) => (val && val.length > 0 ? true : false),
			then: yup
				.string()
				.oneOf([yup.ref('password')], 'Password does not match'),
		}),
})
