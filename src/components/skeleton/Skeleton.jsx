import { Component } from "react";

import "./skeleton.scss";

class Skeleton extends Component {
  render() {
    return (
      <div className="skeleton">
        <div className="skeleton__title">
          Please select a character to see information
        </div>
        <div className="skeleton__header">
          <div className="skeleton__header-circle"></div>
          <div className="skeleton__header-rect"></div>
        </div>
        <div className="skeleton__footer">
          <div className="skeleton__footer-rect"></div>
          <div className="skeleton__footer-rect"></div>
          <div className="skeleton__footer-rect"></div>
        </div>
      </div>
    );
  }
}

export default Skeleton;
