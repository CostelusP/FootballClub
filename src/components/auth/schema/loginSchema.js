import * as yup from 'yup'

export const validationLoginSchema = yup.object({
	email: yup.string().required(),
	password: yup.string().required(),
})
