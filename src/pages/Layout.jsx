import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Timer from "../components/Timer/Timer";
import bannerImg from "../assets/img/banner-img.png";
import logo from "../assets/img/demo.png"

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="timer fadein">
        <a href="https://github.com/Sathishvasi/stock-criczz" class="corner-ribbon">Github</a>
        <div className="timer-header">
          <img src={logo} alt="Logo img"/>
          <h5>SATHISH TIMER</h5>
        </div>
        <div className="timer-card">
          <div className="timer-banner">
            <img src={bannerImg} alt="Banner"/>
          </div>
          <div className="timer-content">
            <div class="form__group field">
              <input type="number" class="form__field" placeholder="Name" name="name" id='name' required />
              <label for="name" class="form__label">Enter some minutes</label>
            </div>
            <button className="start-timer">START TIMER</button>
            {/* <Timer /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
