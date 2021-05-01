import React from 'react'
import { Input } from 'semantic-ui-react'

const InputSearch = (props) => (
	<Input
		onChange={onchange}
		className='search-bar'
		icon={{ name: 'search', circular: true, link: true, float: 'left' }}
		iconPosition='left'
		placeholder='Search...'
	/>
)

export default InputSearch
