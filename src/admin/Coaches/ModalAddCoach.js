import React, { Component } from "react";
import { Form, Input, Modal } from "semantic-ui-react";
import close_icon from "../../assets/close.svg";
import "../Clubs/ModalAddClub/ModalAddClub.css";
import Axios from "axios";
import ModalAdded from "../../common/Modals/ModalAdded";
import ModalDeleted from "../../common/Modals/ModalDeleted";

class ModalAddCoach extends Component {
  state = {
    show: false,
    showAdd: false,
    emailValidation: true,
    lastNameValidation: true,
    firstNameValidation: true,
    lastName: "",
    nameAdded: "",
    firstName: "",
    email: "",
    id: -1,
    url: "http://34.65.176.55:8081/coaches",
  };

  hideModal = () => {
    this.setState({
      show: false,
      showDelete: false,
      showAdd: false,
    });
  };
  token = localStorage.getItem("token");
  deleteItem = (deleteReceived) => {
    if (deleteReceived) {
      const url = `http://34.65.176.55:8081/api/coach/${this.state.idDeleted}/`;
      Axios.delete(url, {
        headers: {
          Authorization: this.token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          this.hideModal();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  hideDeleteConfirm = () => {
    this.setState({
      idDeleted: this.props.personToEdit.id,
      nameDeleted:
        this.props.personToEdit.first_name +
        " " +
        this.props.personToEdit.first_name,
      show: false,
      showDelete: true,
    });
    this.deleteItem();
  };

  Edit = () => {
    return (
      <button className="delete-button-club" onClick={this.hideDeleteConfirm}>
        {" "}
        Detele
      </button>
    );
  };

  firstNameHandler = (event) => {
    if (/^[a-zA-Z ]+$/.test(event.target.value)) {
      this.setState({
        firstNameValidation: true,
        firstName: event.target.value,
      });
    } else {
      this.setState({
        firstNameValidation: false,
      });
    }
  };

  lastNameHandler = (event) => {
    if (/^[a-zA-Z ]+$/.test(event.target.value)) {
      this.setState({
        lastNameValidation: true,
        lastName: event.target.value,
      });
    } else {
      this.setState({
        lastNameValidation: false,
      });
    }
  };
  emailHandler = (event) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(event.target.value)
    ) {
      this.setState({
        emailValidation: true,
        email: event.target.value,
      });
    } else {
      this.setState({
        emailValidation: false,
      });
    }
  };

  nameHandle = (nameReceived) => {
    this.props.nameSet(nameReceived);
    this.setState({ nameAdded: nameReceived });

    this.showConfirmation();
  };

  showConfirmation = () => {
    this.props.hideAddConfirm();
    this.props.coachesHandler();
  };

  hideAddConfirm = () => {
    this.setState({ showAdd: true });
    this.props.hideConfirmEdit();
  };

  addClickedHandler = () => {
    if (
      this.state.lastNameValidation &&
      this.state.firstNameValidation &&
      this.state.emailValidation &&
      !!this.state.email &&
      !!this.state.firstName &&
      !!this.state.lastName
    ) {
      const token = localStorage.getItem("token");
      if (this.props.editForm) {
        Axios.put(
          `http://34.65.176.55:8081/api/coach/${this.props.personToEdit.id}/`,
          {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
          .then((response) => {
            this.setState({
              email: "",
              firstName: "",
              lastName: "",
            });
            this.hideAddConfirm();
            this.props.coachesHandler();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        Axios.post(
          "http://34.65.176.55:8081/api/coach/",
          {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
          .then((response) => {
            this.setState({
              nameAdded: response.data.name,
              email: "",
              firstName: "",
              lastName: "",
            });

            this.nameHandle(response.data.name);
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (
      this.props.personToEdit !== nextProps.personToEdit &&
      nextProps.personToEdit !== null
    ) {
      this.setState({
        firstName: nextProps.personToEdit.first_name,
        lastName: nextProps.personToEdit.last_name,
        email: nextProps.personToEdit.email,
      });
    }
  }

  exitHandler = () => {
    this.setState(
      {
        email: "",
        firstName: "",
        lastName: "",
        emailValidation: true,
        firstNameValidation: true,
        lastNameValidation: true,
      },
      function () {}
    );
    this.props.hideModal();
  };

  deleteClickedHandler = () => {
    this.setState({
      email: "",
      firstName: "",
      lastName: "",
    });
    this.props.hideDeleteConfirm();
  };

  render() {
    return (
      <Modal
        open={this.props.showModal}
        onClose={this.props.hideModal}
        className="modal-form"
      >
        <Modal.Content>
          <Form>
            <div>
              <img
                alt=""
                src={close_icon}
                className="close-icon"
                onClick={this.exitHandler}
              />
            </div>
            <div>
              <h2>{this.props.name}</h2>
              <hr></hr>

              <div className="modal-form-inputs">
                <Form.Input
                  required
                  error={
                    this.state.firstNameValidation
                      ? null
                      : "The field can not be empty or contain special characters"
                  }
                  onChange={this.firstNameHandler}
                  fluid
                  label="First Name"
                  placeholder="Input placeholder"
                  width="16"
                  defaultValue={this.state.firstName}
                />

                <Form.Input
                  required
                  onChange={this.lastNameHandler}
                  error={
                    this.state.lastNameValidation
                      ? null
                      : "The field can not be empty or contain special characters"
                  }
                  fluid
                  label="Last Name"
                  placeholder="Input placeholder"
                  width="16"
                  defaultValue={this.state.lastName}
                />

                <Form.Input
                  required
                  onChange={this.emailHandler}
                  error={
                    this.state.emailValidation
                      ? null
                      : "Enter a valid email address"
                  }
                  fluid
                  label="Email Addres"
                  placeholder="Input placeholder"
                  width="16"
                  defaultValue={this.state.email}
                />
                <label>Club Assign</label>
                <Input list="Club" placeholder="Input placeholder" fluid />
                <datalist id="Club">
                  <option value="English" />
                  <option value="Chinese" />
                  <option value="Dutch" />
                </datalist>

                <br />
                <br />
                <div className="modal-form-buttons">
                  <hr className="second-line"></hr>
                  <div>{this.props.editForm ? <this.Edit /> : null}</div>
                  <button className="cancel-button" onClick={this.exitHandler}>
                    {" "}
                    Cancel
                  </button>
                  <button className="button" onClick={this.addClickedHandler}>
                    {this.props.action}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Content>
        <ModalAdded
          hideAddConfirm={this.state.showAdd}
          hideModal={this.hideModal}
          name={"Coach edited"}
        />
        <ModalDeleted
          hideAddConfirm={this.state.showDelete}
          hideModal={this.hideModal}
          setName={this.nameHandle}
          title={"Delete Coach"}
          name={this.state.nameDeleted}
          ConfirmDelete={this.deleteItem}
          description={
            "If you delete coach’s account, all data associated with this profile will permanently deleted."
          }
        />
      </Modal>
    );
  }
}

export default ModalAddCoach;
