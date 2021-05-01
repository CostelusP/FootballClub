import * as yup from 'yup'

export const validationLoginSchema = yup.object({
	email_address: yup
		.string()
		.email('Please enter a valid email address')
		.required(),
	password: yup.string().required(),
})
