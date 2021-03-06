import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Statistic, Loader } from "semantic-ui-react";
import _ from "lodash";

import UserShowNavbar from "../navigation/user_show_navbar";

class UserShowContainer extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.id;

    // sends userId to user#show and sets state as the returned user object
    fetch(`http://localhost:3000/api/v1/users/${userId}`).then(res =>
      res.json().then(user => this.setState({ user }))
    );
  }

  render() {
    // renders if fetch has not returned a response yet
    if (_.isEmpty(this.state.user)) {
      return (
        <div className="thinMargin">
          <UserShowNavbar />
          <Loader>Loading User...</Loader>
        </div>
      );

      // renders if user has images
    } else if (!_.isEmpty(this.state.user.images)) {
      const sortedImages = this.state.user.images.sort((a, b) => {
        return b.id - a.id;
      });

      return (
        <Grid container className="thinMargin">
          <UserShowNavbar />
          <Grid.Row centered>
            <Statistic>
              <Statistic.Label>{this.state.user.username}'s</Statistic.Label>
              <Statistic.Value>{sortedImages.length}</Statistic.Value>
              <Statistic.Label>images</Statistic.Label>
            </Statistic>
          </Grid.Row>
          <Grid.Row centered>
            {sortedImages.map(image => (
              <Link key={image.id} to={`/images/${image.id}`}>
                <img
                  alt=""
                  src={image.url}
                  height="225px"
                  className="tinyMargin"
                />
              </Link>
            ))}
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <div className="thinMargin">
          {this.state.user.username} has not uploaded any images.
        </div>
      );
    }
  }
}

export default UserShowContainer;
