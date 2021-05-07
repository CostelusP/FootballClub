import React, { Component } from 'react'
import { Image, Modal } from 'semantic-ui-react'
import checked_icon from '../assets/checkmark-circle.svg'
import close_icon from '../assets/close.svg'
import './Modals.css'

class ModalAdded extends Component {
	render() {
		return (
			<div>
				<Modal
					size='tiny'
					open={this.props.hideAddConfirm}
					onClose={this.props.hideModal}
				>
					<Modal.Content>
						<div>
							<img
								alt=''
								src={close_icon}
								className='close-icon'
								onClick={this.props.hideModal}
							/>
						</div>
						<Image src={checked_icon} centered size='tiny' />
						<h2 className='modal-add-title'> {this.props.name} </h2>
						<p className='modal-add-description'>{this.props.description}</p>
						<button
							className='button-modal-added'
							onClick={this.props.hideModal}
						>
							Close
						</button>
					</Modal.Content>
				</Modal>
			</div>
		)
	}
}

export default ModalAdded
