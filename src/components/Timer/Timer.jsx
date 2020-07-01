import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const CLOCKUNIT = 59;

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: null,
      showResult: false,
      resultMinutes: '',
      resultSeconds: '',
      minutes: null,
      hours: null,
      interval: null,
    };

    this.handleResult = this.handleResult.bind(this);
    this.timer = this.timer.bind(this);
    this.pad = this.pad.bind(this);
    this.goHome = this.goHome.bind(this);

    console.log(this.props.timerValue);
    
  }

  componentDidMount() {
    // Time calculation
    let time, hours, rhours, minutes, rminutes, chours, crhours, cminutes, crminutes;
    time = this.props.timerValue;
    if (time > 0) {
      hours = time / 60;
      rhours = Math.floor(hours) <= 0 ? 0 : Math.floor(hours) - 1;
      minutes = (hours - rhours) * 60;
      rminutes = Math.round(minutes) <= 0 ? 0 : Math.round(minutes) - 1;

      // Condition to get exceeded minutes
      if(rminutes > 59){
        chours = rminutes / 60;
        crhours = Math.floor(chours);
        cminutes = (chours - crhours) * 60;
        crminutes = Math.round(cminutes);

        rhours = rhours + crhours;
        rminutes = crminutes;
      }

      // Time values intialization
      this.setState({
        hours: this.pad(rhours),
        minutes: this.pad(rminutes),
        seconds: this.pad(CLOCKUNIT),
      });
    }

    // Get time from local storage if available
    let currentTime = localStorage.getItem("currentTime");
    if (currentTime) {
      this.setState({
        hours: isNaN(currentTime.split(" ")[0])
          ? "00"
          : currentTime.split(" ")[0],
        minutes: isNaN(currentTime.split(" ")[1])
          ? "00"
          : currentTime.split(" ")[1],
        seconds: currentTime.split(" ")[2],
      });
    }

    let interval = setInterval(() => {
      //Reducing seconds
      this.setState(({ seconds }) => ({
        seconds: this.pad(seconds - 1),
      }));

      // Conditions to change hours & minutes in timer() functi
      this.timer();

      // Set current timer value in local storage
      localStorage.setItem(
        "currentTime",
        this.state.hours + " " + this.state.minutes + " " + this.state.seconds
      );

      // Condition to clear timer in other pages
      if (window.location.pathname === "/") {
        clearInterval(interval);
      }
    }, 1000);
    this.setState({ interval: interval });
  }

  goHome(){
    localStorage.removeItem('currentTime');
    this.props.setImage({
      setImage: false
    });
  }

  timer() {
    if (this.state.seconds == "00") {
      if (this.state.minutes > 0) {
        this.setState({
          minutes: this.pad(this.state.minutes - 1),
          seconds: this.pad(CLOCKUNIT),
        });
      } else {
        if (
          this.state.hours === "00" &&
          this.state.minutes === "00" &&
          this.state.seconds === "00"
        ) {
          clearInterval(this.state.interval);
          this.handleResult();
        } else {
          this.setState({
            hours: this.pad(this.state.hours - 1),
            minutes: this.pad(CLOCKUNIT),
            seconds: this.pad(CLOCKUNIT),
          });
        }
      }
    }
  }

  pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

  handleResult(e) {
    // Stops timer
    clearInterval(this.state.interval);

    // API time calc
    const APITime = this.props.timerValue;
    let hours, rhours, minutes, rminutes, resultMinutes, resultSeconds;
    hours = APITime / 60;
    rhours = Math.floor(hours) <= 0 ? 0 : Math.floor(hours);
    minutes = (hours - rhours) * 60;
    rminutes = Math.round(minutes) <= 0 ? 0 : Math.round(minutes);

    // rminutes = rhours >= 1 ? 60 : rminutes;
    rminutes = rminutes === 0 ? 60 : rminutes;

    // POST API call of all questions
    let localObj = JSON.parse(localStorage.getItem("questions"));
    if (this.state.hours && this.state.minutes) {
      const sec = this.state.seconds === "00" ? 0 : 60 - this.state.seconds;
      const time_taken =
        parseInt(this.state.hours) * 60 +
        parseInt(this.state.minutes) +
        "." +
        sec;
        
      if (time_taken === "0.0") {
        // timer = rhours + rminutes + ".0";
        resultMinutes = rhours + rminutes;
        resultSeconds = 0;

      } else {
        // Calculated current time with API time
        // timer = this.pad(rminutes - (parseInt(this.state.minutes) + 1)) + "." + this.pad(sec);
        resultMinutes = this.pad(rminutes - (parseInt(this.state.minutes) + 1));
        resultSeconds = this.pad(sec)
      }
      // alert(`Timer running time: `+timer)
      this.setState({
        showResult: true,
        resultMinutes: resultMinutes,
        resultSeconds: resultSeconds
      })
    }

    // Image change
    this.props.setImage({
      setImage: true
    });
  }

  render() {
    const { hours, minutes, seconds, showResult, resultMinutes, resultSeconds } = this.state;

    let publishButton;

    return (
      <div className="nav-wrapper">
          {!showResult &&
          <div className="navbar__timer">
            <span>{hours + ":" + minutes + ":" + seconds}</span>
            <button className="start-timer" onClick={this.handleResult}>STOP TIMER</button>
          </div>
          }

          {showResult &&
          <div className="timer-result">
            <h4>Your Time Summary</h4>
            <div className="timer-result__detail">
              <span><b>{resultMinutes}</b> Minutes</span>
              <span><b>{resultSeconds}</b> Seconds</span>
            </div>
            {/* <button className="start-timer">HOME</button> */}
            <NavLink onClick={this.goHome} to={`/`} className="start-timer">
                RESET TIMER
            </NavLink>
          </div>
          }
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
      setImage: (value) => dispatch({ type: "SET_IMAGE", value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
