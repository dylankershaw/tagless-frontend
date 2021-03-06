import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ChartToggle from "../navigation/chart_toggle";
import RadarChart from "../label/radar_chart";
import DeleteButton from "./delete_button";
import BarList from "../label/bar_list";

class ImageShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: "bar"
    };
  }

  // iterates through each imageLabel to find the one associated with a given label, and returns its score
  findScore = label => {
    return this.props.image.imageLabels.find(imageLabel => {
      return imageLabel.label_id === label.id;
    }).relevancyScore;
  };

  // toggles between bar and radar charts
  toggleChartType = chartType => {
    this.setState({ chartType });
  };

  render() {
    // renders if valid image is returned from fetch
    if (this.props.image.id) {
      const imageUser = this.props.image.user;

      const sortedLabels = this.props.image.labels.sort((a, b) => {
        return this.findScore(b) - this.findScore(a);
      });

      return (
        <div>
          <div>
            UPLOADED BY:{" "}
            <Link to={`/users/${imageUser.id}`}>
              {imageUser.username.toUpperCase()}
            </Link>
          </div>
          <div>
            <img
              alt={this.props.image.labels[0].name}
              src={this.props.image.url}
              className="imageShowImage"
            />
            {/* renders delete button if user owns the image */}
            {this.props.image.user.id === this.props.user.id ? (
              <DeleteButton imageId={this.props.image.id} />
            ) : null}
          </div>
          <div className="chartToggle">
            <ChartToggle
              toggleChartType={this.toggleChartType}
              selection={this.state.chartType}
            />
          </div>
          <br />
          {this.state.chartType === "bar" ? (
            <BarList labels={sortedLabels} findScore={this.findScore} />
          ) : (
            <RadarChart labels={sortedLabels} findScore={this.findScore} />
          )}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          Image not found.<br />
        </div>
      );
    }
  }
}

function mapStateToProps({ image, user }) {
  return { image, user };
}

export default connect(mapStateToProps)(ImageShow);
