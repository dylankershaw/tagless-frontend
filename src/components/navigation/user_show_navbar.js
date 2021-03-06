import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import React from "react";

import AuthNavbar from "../navigation/auth_navbar";
import blackLogo from "../../logos/blackLogo.png";

const UserShowNavbar = () => (
  <Grid.Row columns={3} centered className="userShowNavbar">
    <Grid.Column>
      <Link to="/">{"< SEARCH ALL IMAGES"}</Link>
      <br />
      <Link to="/upload">{"< UPLOAD AN IMAGE"}</Link>
    </Grid.Column>
    <Grid.Column>
      <img alt="tagless logo" src={blackLogo} height="100" />
    </Grid.Column>
    <Grid.Column>
      <AuthNavbar />
    </Grid.Column>
  </Grid.Row>
);

export default UserShowNavbar;
