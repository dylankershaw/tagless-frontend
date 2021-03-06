import { withRouter } from "react-router";
import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";

import { submitSearch, enableTouched, disableTouched } from "../../actions";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { placeholder: "", searchTerm: "" };
  }

  isOnRoot = () => {
    return this.props.history.location.pathname === "/";
  };

  // animates placeholder values with sample search terms
  componentDidMount() {
    const terms = ["galaxy", "mountains", "sunset"];
    let termIndex = 0;
    let letterIndex = 0;
    let placeholder = "";
    let direction = "increasing";

    const animatePlacholder = setInterval(() => {
      direction === "increasing" ? addLetter() : removeLetter();

      // stops animation when field is touched
      !this.props.search.touched
        ? this.setState({
            placeholder
          })
        : stopAnimation();
    }, 250);

    // adds next term letter to placeholder
    const addLetter = () => {
      // removes pipe from placeholder and adds if after next letter
      placeholder =
        placeholder.slice(0, -1) + terms[termIndex][letterIndex] + "|";

      // changes direction if placeholder is entire term
      placeholder.length === terms[termIndex].length + 1
        ? (direction = "decreasing")
        : letterIndex++;
    };

    // removes last letter from placeholder
    const removeLetter = () => {
      placeholder = placeholder.slice(0, letterIndex) + "|";

      // changes direction when done with a term and cycles through terms
      if (placeholder.length === 1) {
        direction = "increasing";
        termIndex === terms.length - 1 ? (termIndex = 0) : termIndex++;
      } else {
        letterIndex--;
      }
    };

    const stopAnimation = () => {
      clearInterval(animatePlacholder);
      this.setState({ placeholder: "" });
    };
  }

  handleClick = () => {
    this.props.enableTouched();
  };

  handleChange = ev => {
    this.setState({ searchTerm: ev.target.value });
  };

  handleSubmit = () => {
    this.props.history.push(`/search/${this.state.searchTerm}`);
    this.props.submitSearch(this.state.searchTerm);
  };

  render() {
    return (
      <Form className="searchBar" onSubmit={this.handleSubmit}>
        {this.isOnRoot() ? (
          <span>
            <i className="fa fa-search w3-xxlarge" />
          </span>
        ) : null}
        <input
          id="searchBar"
          onClick={this.handleClick}
          value={this.state.value}
          onChange={this.handleChange}
          className={this.isOnRoot() ? "onRoot" : "offRoot"}
          placeholder={
            this.isOnRoot() ? this.state.placeholder : "enter a search term"
          }
          type="text"
        />
      </Form>
    );
  }

  componentWillUnmount() {
    this.props.disableTouched();
  }
}

function mapStateToProps({ search }) {
  return { search };
}

export default withRouter(
  connect(mapStateToProps, { submitSearch, enableTouched, disableTouched })(
    SearchBar
  )
);
