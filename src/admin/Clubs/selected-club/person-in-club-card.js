import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";

import "./selected-club.css";
import PersonThumbnail from "../PersonThumbnail";

const PersonClubThumbnail = (props) => {
  console.log("id", props.idClub);
  const [show, setShow] = useState(false);
  const hideModal = () => {
    setShow(false);
  };
  return (
    <div className="person-club-card">
      <Card className="card-width" onClick={() => setShow(!show)}>
        <Card.Content>
          <Image
            floated="left"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            circular
          />
          <Card.Header className="header-name">{props.name}</Card.Header>
          <Card.Meta className="meta-custom">
            {props.gender} -{props.age} YEARS
          </Card.Meta>
          <Card.Description content>
            <div className="grid-sports">
              <label className="card-first-line-label">Primary sport</label>
              <label className="card-first-line-label">Secondary sport</label>
            </div>
            <div className="grid-sports">
              <label className="card-second-line-label">
                {props.primary_sport}
              </label>
              <label className="card-second-line-label">
                {props.secondary_sport}
              </label>
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
      <PersonThumbnail
        showModal={show}
        hideModal={hideModal}
        name={props.name}
        age={props.age}
        gender={props.gender}
        primary_sport={props.primary_sport}
        secondary_sport={props.secondary_sport}
        idUser={props.idUser}
        idClub={props.idClub}
        requested={props.requested}
      />
    </div>
  );
};

export default PersonClubThumbnail;
