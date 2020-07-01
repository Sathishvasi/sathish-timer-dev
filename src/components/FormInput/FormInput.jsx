import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
        timerValue: '',
        validator: false,
        validatorMessge: '',
        redirectTimer: false
    };

    this.setCurrentVal = this.setCurrentVal.bind(this);
    this.startTimer = this.startTimer.bind(this);

    console.log(this.props.timerValue);
  }

  setCurrentVal(e){
    // Validator condition on change
    if(e.target.value!='' && this.state.validator){
      this.setState({validator: false})
    }
    // Input element limit
    if(e.target.value.length <= 6){
      this.setState({
        timerValue: e.target.value
      })
    }
  }

  startTimer(){
    // Validator condition on start TImer
    if(this.state.timerValue != ''){
      this.props.setTimerValue({timerValue: this.state.timerValue});
      this.setState({redirectTimer: true})
    }else{
      this.setState({
        validator: true,
        validatorMessage: '*Timer value required'
      })
    }
  }

  render() {
    const { validatorMessage, validator, timerValue, redirectTimer } = this.state;

    if(redirectTimer){
      return <Redirect to={"/timer"} />
    }

    return (
        <div className="timer-content__input">
            <div className="form__group field">
                <input type="number" maxLength="6" className="form__field" placeholder="Name" name="name" id='name' required onChange={(e) => this.setCurrentVal(e)} value={timerValue}/>
                <label htmlFor="name" className="form__label">Enter some minutes</label>
            </div>
            {validator && <span className="error-msg">{validatorMessage}</span>}
            <button className="start-timer" onClick={this.startTimer}>START TIMER</button>
            {/* <NavLink onClick={this.startTimer} to={`/timer`} className="start-timer">
                START TIMER
            </NavLink> */}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(FormInput);