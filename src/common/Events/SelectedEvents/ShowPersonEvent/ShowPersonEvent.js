import React, { Component } from "react";
import "./ShowPersonEvent.css";
import { Card, Checkbox } from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";
// import { Checkbox } from "@material-ui/core";

class ShowPersonEvent extends Component {
  EditPersonEvent = () => {
    return <checkbox className="checkbox-event"></checkbox>;
  };

  render() {
    console.log(this.props.checkboxdisplay, "sadas");
    return (
      <div>
        <div className="show-cards-event">
          <Card>
            <Card.Content className="show-card-event">
              <div className="content-show-card-event">
                <div className="avatar-check">
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                  ></Avatar>
                  <div>
                    {" "}
                    {this.props.checkboxdisplay ? (
                      <Checkbox className="checkbox-event"></Checkbox>
                    ) : null}
                  </div>
                </div>
                <h2>{this.props.name}</h2>
                <h3>Female 28 years</h3>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}
export default ShowPersonEvent;
