import { Button } from "semantic-ui-react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { enableTouched } from "../../actions";

class ImageNavbar extends Component {
  handleSearchClick = () => {
    this.props.enableTouched();
    const searchBar = document.getElementById("searchBar");
    searchBar.placeholder = "";
    searchBar.focus();
    searchBar.select();
  };

  render() {
    return (
      <Button.Group
        basic={this.props.isOnRoot ? true : false}
        inverted={this.props.isOnRoot ? true : false}
      >
        <Button
          as={Link}
          to="/"
          active={this.props.currentContainer === "search" ? true : false}
          onClick={this.props.isOnRoot ? this.handleSearchClick : null}
        >
          SEARCH
        </Button>
        <Button.Or />
        <Button
          as={Link}
          to="/upload"
          active={this.props.currentContainer === "upload" ? true : false}
        >
          UPLOAD
        </Button>
      </Button.Group>
    );
  }
}

export default connect(null, { enableTouched })(ImageNavbar);
