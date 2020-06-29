import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Timer from "../components/Timer/Timer";
import bannerImg from "../assets/img/banner-img.png";
import logo from "../assets/img/demo.png"
import { connect } from "react-redux";
import validator from "validator";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableForm: false,
      timerValue: '',
      validator: false,
      validatorMessge: ''
    };
    this.startTimer = this.startTimer.bind(this);
    this.setCurrentVal = this.setCurrentVal.bind(this);

    console.log(this.props.timerValue);
  }

  componentDidUpdate(){
    // console.log(this.props.demoVal);
  }

  startTimer(){
    if(this.state.timerValue != ''){
      this.props.setTimerValue({
        timerValue: this.state.timerValue
      });
      this.setState({disableForm: true})
    }else{
      this.setState({
        validator: true,
        validatorMessage: '*Timer value required'
      })
    }
  }

  setCurrentVal(e){
    if(e.target.value!='' && this.state.validator){
      this.setState({validator: false})
    }
    if(e.target.value.length <= 6){
      this.setState({
        timerValue: e.target.value
      })
    }
  }

  render() {
    const { disableForm, validatorMessage, validator, timerValue } = this.state;
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
                <input type="number" maxLength="6" className="form__field" placeholder="Name" name="name" id='name' required onChange={(e) => this.setCurrentVal(e)} value={timerValue}/>
                <label htmlFor="name" className="form__label">Enter some minutes</label>
              </div>
              {validator && <span className="error-msg">{validatorMessage}</span>}
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
    timerValue: state.timerValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTimerValue: (value) => dispatch({ type: "SET_TIMER_VALUE", value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
