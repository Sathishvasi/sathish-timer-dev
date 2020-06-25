import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Timer from "../components/Timer/Timer";
import bannerImg from "../assets/img/banner-img.png";
import logo from "../assets/img/demo.png"
import { connect } from "react-redux";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableForm: false
    };
    this.startTimer = this.startTimer.bind(this);

    console.log(this.props.demoVal);
  }

  componentDidUpdate(){
    console.log(this.props.demoVal);
  }

  startTimer(){
    this.props.setdemoVal({
      demoVal: 'kumar',
    });
    this.setState({disableForm: true})
  }

  render() {
    const { disableForm } = this.state;
    return (
      <div className="timer fadein">
        <a href="https://github.com/Sathishvasi/sathish-timer" className="corner-ribbon" target="_blank">Github</a>
        <div className="timer-header">
          <img src={logo} alt="Logo img"/>
          <h5>SATHISH TIMER</h5>
        </div>
        <div className="timer-card">
          <div className="timer-banner">
            <img src={bannerImg} alt="Banner"/>
          </div>
          <div className="timer-content">
            {!disableForm && 
              <div className="timer-content__input">
              <div className="form__group field">
                <input type="number" className="form__field" placeholder="Name" name="name" id='name' required />
                <label htmlFor="name" className="form__label">Enter some minutes</label>
              </div>
              <button className="start-timer" onClick={this.startTimer}>START TIMER</button>
              </div>
            }
            {disableForm && 
              <Timer />
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    demoVal: state.demoVal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setdemoVal: (value) => dispatch({ type: "SET_VALUE", value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
