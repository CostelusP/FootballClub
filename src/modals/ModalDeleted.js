import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import close_icon from '../assets/close.svg'
import { Button, CancelButton } from '../styledComponents'

class ModalDeleted extends Component {
	deleteHandler = () => {
		this.props.confirmDelete(true)
		this.props.hideModal()
		this.props.coachesHandler()
	}

	render() {
		return (
			<div>
				<Modal
					size='tiny'
					open={this.props.hideShowDelete}
					onClose={this.props.hideModal}
				>
					{console.log(this.props.hideShowDelete)}
					<Modal.Header>
						<div>
							<img
								alt=''
								src={close_icon}
								className='close-icon'
								onClick={this.props.hideModal}
							/>
						</div>
						<h2> {this.props.title} </h2>
					</Modal.Header>
					<Modal.Content>
						<p>
							Are you sure you want to delete {this.props.name}?{' '}
							{this.props.description}
						</p>
					</Modal.Content>
					<Modal.Actions>
						<div
							style={{
								float: 'right',
								textAlign: 'right',
								marginTop: '10px',
								marginBottom: '20px',
							}}
						>
							<CancelButton
								style={{ display: 'inline-block' }}
								onClick={this.props.hideModal}
							>
								Cancel
							</CancelButton>
							<Button
								style={{ display: 'inline-block', marginRight: '0px' }}
								onClick={this.deleteHandler}
							>
								Delete
							</Button>
						</div>
					</Modal.Actions>
				</Modal>
			</div>
		)
	}
}

export default ModalDeleted
