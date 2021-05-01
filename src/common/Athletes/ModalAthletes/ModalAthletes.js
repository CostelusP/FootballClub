import React, { Component } from "react";
import Dropzone from "react-dropzone";

import { Modal, Form, Icon } from "semantic-ui-react";
import "./ModalAthletes.css";
import axios from "axios";
import close_icon from "../../../assets/close.svg";
import ModalAdded from "../../Modals/ModalAdded";

class ModalAthletes extends Component {
  state = {
    namevalid: true,
    emailvalid: true,
    psportvalid: true,
    ssportvalid: true,
    gendervalid: true,
    agevalid: true,
    locationvalid: true,
    heightvalid: true,
    weightvalid: true,
    clubvalid: true,
    sports: [],
    name: "",
    email: "",
    psport: "",
    ssport: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    clubs: [],
    club: "",
  };
  optionsGender = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
  ];
  NameHandler = (data) => {
    if (/^[a-zA-Z ]+$/.test(data.target.value)) {
      this.setState({ namevalid: true });
      this.setState({ name: data.target.value });
    } else {
      this.setState({ namevalid: false });
    }
  };
  AgeHandler = (data) => {
    if (
      /([1-5][0-9])/.test(data.target.value) &&
      data.target.value.length < 3
    ) {
      this.setState({ agevalid: true });
      this.setState({ age: data.target.value });
    } else {
      this.setState({ agevalid: false });
    }
  };

  EmailHandler = (data) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.target.value)
    ) {
      this.setState({ emailvalid: true });
      this.setState({ email: data.target.value });
    } else {
      this.setState({ emailvalid: false });
    }
  };

  PsportHandler = (data, { value }) => {
    if (/^[a-zA-Z ]+$/.test(data.target.value)) {
      this.setState({ psportvalid: true });
      this.setState({ psport: value });
    } else {
      this.setState({ psportvalid: false });
    }
  };

  SsportHandler = (data, { value }) => {
    if (/^[a-zA-Z ]+$/.test(data.target.value)) {
      this.setState({ ssportvalid: true });
      this.setState({ ssport: value });
    } else {
      this.setState({ ssportvalid: false });
    }
  };

  GenderHandler = (data, { value }) => {
    if (/^[a-zA-Z]+$/.test(data.target.value)) {
      this.setState({ gendervalid: true });

      this.setState({ gender: value });
    } else {
      this.setState({ gendervalid: false });
    }
  };
  ClubHandler = (data, { value }) => {
    if (value !== "") {
      this.setState({ clubvalid: true });
      this.setState({ club: value });
    } else {
      this.setState({ clubvalid: false });
    }
  };
  HeightHandler = (data) => {
    if (
      /[1-2][0-90-9]+$/.test(data.target.value) &&
      data.target.value.length === 3 &&
      data.target.value > 0
    ) {
      this.setState({ heightvalid: true });
      this.setState({ height: data.target.value });
    } else {
      this.setState({ heightvalid: false });
    }
  };

  WeightHandler = (data) => {
    if (
      /[1-9][0-90-9]+$/.test(data.target.value) &&
      data.target.value < 400 &&
      data.target.value > 0
    ) {
      this.setState({ weightvalid: true });
      this.setState({ weight: data.target.value });
    } else {
      this.setState({ weightvalid: false });
    }
  };
  AthleteIsAdded = () => {
    this.props.addAthlete(this.state.name);
  };
  AddInClub = () => {
    this.props.inClub(this.state.club);
  };
  componentDidMount() {
    let url = "http://34.65.176.55:8081/api/sports/";
    const token = localStorage.getItem("token");
    axios.get(url, { headers: { Authorization: token } }).then((response) => {
      let sport =
        response &&
        response.data &&
        response.data.map((item, index) => {
          return {
            key: item.id,
            text: item.description,
            value: item.description,
          };
        });
      console.log(response.data, "aaaaa");
      this.setState({ sports: sport });
      console.log(this.state.sports, "asfuysaf");
    });
    {
      let url = "http://34.65.176.55:8081/api/club/clubs/";
      const token = localStorage.getItem("token");
      axios.get(url, { headers: { Authorization: token } }).then((response) => {
        let club =
          response &&
          response.data &&
          response.data.map((item, index) => {
            return {
              key: item.id,
              text: item.name,
              value: item.name,
            };
          });
        console.log(response.data, "aaaaa");
        this.setState({ clubs: club });
        console.log(this.state.clubs, "sport");
      });
    }
  }
  addClickedHandler = () => {
    if (
      this.state.namevalid &&
      this.state.emailvalid &&
      this.state.psportvalid &&
      this.state.ssportvalid &&
      this.state.agevalid &&
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.age.length > 0 &&
      this.state.height.length > 0 &&
      this.state.weight.length > 0
    ) {
      const token = localStorage.getItem("token");
      axios
        .post(
          "http://34.65.176.55:8081/api/athlete/",
          {
            name: this.state.name,
            email: this.state.email,
            primary_sport: this.state.psport,
            secondary_sport: this.state.ssport,
            gender: this.state.gender,
            age: this.state.age,
            height: this.state.height,
            weight: this.state.weight,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          this.AthleteIsAdded();
          this.AddInClub();
        })
        .catch((error) => {
          alert(error);
        });

      this.props.hideAddConfirm();
    }
  };

  cancelClickedHandler = () => {
    {
      this.setState({ img: "" });
      this.setState({ name: "" });
      this.setState({ gender: "" });
      this.setState({ age: "" });
      this.setState({ psport: "" });
      this.setState({ ssport: "" });
      this.setState({ height: "" });
      this.setState({ weight: "" });
      this.setState({ email: "" });
    }
    {
      this.setState({ namevalid: true });
      this.setState({ heightvalid: true });
      this.setState({ gendervalid: true });
      this.setState({ agevalid: true });
      this.setState({ psportvalid: true });
      this.setState({ ssportvalid: true });
      this.setState({ weightvalid: true });
      this.setState({ emailvalid: true });
    }
    this.props.handleCloseModal();
  };
  deleteClickedHandler = () => {
    this.props.hideDeleteConfirm();
  };
  nameHandle = (nameReceived) => {
    this.props.nameSet(nameReceived);
    this.setState({ nameAdded: nameReceived });
    this.showConfirmation();
  };

  render() {
    return (
      <Modal
        style={{ maxWidth: "600px" }}
        open={this.props.handleOpenModal}
        close={this.props.handleCloseModal}
        className="modal-athletes"
      >
        <Modal.Content>
          <Form>
            <div>
              <img
                src={close_icon}
                className="close-icon-athlete"
                alt=""
                onClick={this.cancelClickedHandler}
              />
            </div>
            <div className="modal-athletes-div">
              <h2>{this.props.NameModalAthletes}</h2>
              <div className="first-line-athletes">
                <hr></hr>
              </div>

              <p>General Information</p>
              <div className="modal-form-inputs-athletes">
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Name"
                    placeholder="Input placeholder"
                    error={
                      this.state.namevalid
                        ? null
                        : "The field can not be empty or contain special characters"
                    }
                    onChange={this.NameHandler}
                  />
                  <Form.Input
                    fluid
                    label="Email Adress"
                    placeholder="Input placeholder"
                    error={
                      this.state.emailvalid
                        ? null
                        : "Enter a valid email address"
                    }
                    onChange={this.EmailHandler}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Select
                    fluid
                    label="Primary Sport"
                    placeholder="Input placeholder"
                    options={this.state.sports || []}
                    error={
                      this.state.psportvalid
                        ? null
                        : "The field can not be empty.Select an option"
                    }
                    onChange={this.PsportHandler}
                  />
                  <Form.Select
                    fluid
                    options={this.state.sports || []}
                    label="Secondary Sport"
                    placeholder="Input placeholder"
                    error={
                      this.state.ssportvalid
                        ? null
                        : "The field can not be empty.Select an option"
                    }
                    onChange={this.SsportHandler}
                  />
                </Form.Group>
                <p>Personal Information </p>
                <Form.Group widths="equal">
                  <Form.Select
                    id="gender"
                    fluid
                    label="Gender"
                    value={this.state.gender}
                    placeholder="Input placeholder"
                    options={this.optionsGender}
                    error={
                      this.state.gendervalid
                        ? null
                        : "The field can not be empty."
                    }
                    onChange={this.GenderHandler}
                  />
                  <Form.Input
                    fluid
                    label="Age"
                    placeholder="Input placeholder"
                    error={
                      this.state.agevalid
                        ? null
                        : "The field can not be empty and must contain only digits.The maximum value is 49"
                    }
                    onChange={this.AgeHandler}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Height"
                    placeholder="Input Placeholder"
                    error={
                      this.state.heightvalid
                        ? null
                        : "The field can not be empty and must contain minimum 3 digits.The maximum value is 299"
                    }
                    onChange={this.HeightHandler}
                  />
                  <Form.Input
                    fluid
                    label="Weight"
                    placeholder="Input Placeholder"
                    error={
                      this.state.weightvalid
                        ? null
                        : "The field can not be empty and must contain only digits.The maximum value is 399"
                    }
                    onChange={this.WeightHandler}
                  />
                </Form.Group>
                <Form.Select
                  options={this.state.clubs || []}
                  className="input-description"
                  label="Assign to a club"
                  placeholder="Input placeholder"
                  onChange={this.ClubHandler}
                />
                <h3>Avatar Image</h3>
                <Dropzone onDrop={(files) => console.log(files)}>
                  {({ getRootProps, getInputProps }) => (
                    <div className="drag-and-drop-athlets">
                      <div
                        {...getRootProps({
                          className: "dropzone-athletes",
                          onDrop: (event) => event.stopPropagation(),
                        })}
                      >
                        <input {...getInputProps()} />
                        <div className="upload-file-athletes">
                          <Icon
                            name="cloud upload"
                            color="black"
                            style={{ margin: "7px" }}
                          />
                          <p>Upload File </p>
                        </div>
                      </div>
                      <p className="drag-drop-athletes">or drag&drop here</p>
                    </div>
                  )}
                </Dropzone>
                <div className="second-line-athletes">
                  <hr></hr>
                </div>

                <div className="modal-buttons-athletes">
                  <button
                    className="cancel-button-athletes"
                    onClick={this.cancelClickedHandler}
                  >
                    CANCEL
                  </button>
                  <button
                    className="button-athletes-add"
                    onClick={this.addClickedHandler}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalAthletes;
