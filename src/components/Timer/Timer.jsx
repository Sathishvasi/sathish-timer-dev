import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";

const CLOCKUNIT = 59;

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: null,
      showLoading: null,
      minutes: null,
      hours: null,
      interval: null,
    };

    this.handleResult = this.handleResult.bind(this);
    this.timer = this.timer.bind(this);
    this.pad = this.pad.bind(this);
  }

  componentDidUpdate() {}

  componentDidMount() {
    // Time calculation
    let time, hours, rhours, minutes, rminutes;
    time = 2;
    if (time > 0) {
      hours = time / 60;
      rhours = Math.floor(hours) <= 0 ? 0 : Math.floor(hours) - 1;
      minutes = (hours - rhours) * 60;
      rminutes = Math.round(minutes) <= 0 ? 0 : Math.round(minutes) - 1;

      console.log(rhours, rminutes);

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
      if (window.location.pathname.split("/")[3] === "") {
        clearInterval(interval);
      }
    }, 1000);
    this.setState({ interval: interval });
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
    // Enable loader
    this.setState({ showLoading: true });

    // Stops timer
    clearInterval(this.state.interval);

    // API time calc
    const APITime = 2;
    let hours, rhours, minutes, rminutes;
    hours = APITime / 60;
    rhours = Math.floor(hours) <= 0 ? 0 : Math.floor(hours);
    minutes = (hours - rhours) * 60;
    rminutes = Math.round(minutes) <= 0 ? 0 : Math.round(minutes);

    rminutes = rhours >= 1 ? 60 : rminutes;

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
        // localObj.time_taken = rhours + rminutes + ".0";
      } else {
        // Calculated current time with API time
        // localObj.time_taken =
        //   pad(rminutes - (parseInt(this.state.minutes) + 1)) + "." + pad(sec);
        alert(this.pad(rminutes - (parseInt(this.state.minutes) + 1)) + "." + this.pad(sec))
      }
    }
  }

  render() {
    const { hours, minutes, seconds, hideTimer, showLoading } = this.state;

    let publishButton;

    // if (this.state.redirectResult) {
    //   // Clearing time interval
    //   clearInterval(this.state.interval);
    //   // Clearing student selected questions data
    //   localStorage.removeItem("questions");
    //   this.setState({
    //     redirectResult: false,
    //     resultPage: "student-result",
    //   });
    //   return <Redirect to={`/${this.state.testId}/student/results`} />;
    // }

    return (
      <div className="nav-wrapper">
        {/* {!hideTimer && ( */}
        <div className="navbar__timer">
          <span>{hours + ":" + minutes + ":" + seconds}</span>
        </div>
        {/* )} */}
      </div>
    );
  }
}

export default Timer;
