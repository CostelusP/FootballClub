import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import close_icon from "../../assets/close.svg";

class ModalDeleted extends Component {
  deleteHandler = () => {
    this.props.ConfirmDelete(true);
    this.props.hideModal();
  };

  render() {
    return (
      <div>
        <Modal
          size="tiny"
          open={this.props.hideAddConfirm}
          onClose={this.props.hideModal}
        >
          <Modal.Header>
            <div>
              <img
                alt=""
                src={close_icon}
                className="close-icon"
                onClick={this.props.hideModal}
              />
            </div>
            <h2> {this.props.title} </h2>
          </Modal.Header>
          <Modal.Content>
            <p>
              Are you sure you want to delete {this.props.name}?{" "}
              {this.props.description}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <button className="cancel-button" onClick={this.props.hideModal}>
              Cancel
            </button>
            <button className="button" onClick={this.deleteHandler}>
              Delete
            </button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalDeleted;
