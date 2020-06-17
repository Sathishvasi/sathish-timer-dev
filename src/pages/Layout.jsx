import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Timer from "../components/Timer/Timer";

class Test extends Component {
  constructor(props) {
    super(props);

  
    this.state = {
    };
  }

  render() {

    return (
      <div className="login fadein">
          Timer Layout Page
          <Timer/>
      </div>
    );
  }
}

export default Test;
