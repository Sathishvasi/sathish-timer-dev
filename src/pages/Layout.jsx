import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Timer from "../components/Timer/Timer";
import FormInput from "../components/FormInput/FormInput";
import bannerImg from "../assets/img/banner-img.png";
import logo from "../assets/img/demo.png"
import { connect } from "react-redux";
import bannerImgFinal from "../assets/img/banner-completed.png";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.timerValue);
  }

  render() {
    const {  } = this.state;
    // let bannerImage = !this.props.bannerImageFinal ? bannerImg : bannerImgFinal;
    return (
      <div className="timer fadein">
        <a href="https://github.com/Sathishvasi/sathish-timer" className="corner-ribbon" target="_blank">Github</a>
        <div className="timer-header">
          <img src={logo} alt="Logo img"/>
          <h5>SATHISH TIMER</h5>
        </div>
        <div className="timer-card">
          <div className="timer-banner">
            <img src={bannerImg} className="fadein" alt="Banner"/> 
            {/* {!this.props.bannerImageFinal ? <img src={bannerImg} className="fadein" alt="Banner"/> : <img src={bannerImgFinal} className="fadein" alt="Banner"/>} */}
          </div>
          <div className="timer-content">
            <BrowserRouter>
              <Switch>
                <Route
                  name="Layout"
                  exact
                  path="/sathish-timer"
                  render={(props) => <FormInput {...props} />}
                />
                <Route
                  name="Timer Page"
                  path="/sathish-timer/timer"
                  render={(props) => <Timer {...props} />}
                />
              </Switch>
                <Redirect exact from="/" to="/sathish-timer"></Redirect>
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    timerValue: state.timerValue,
    bannerImageFinal: state.bannerImageFinal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTimerValue: (value) => dispatch({ type: "SET_TIMER_VALUE", value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
