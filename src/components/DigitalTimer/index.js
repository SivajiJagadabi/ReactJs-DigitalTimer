// Write your code here
import {Component} from 'react'
import './index.css'

const timerInitialState = {
  isTimerRunning: false,
  timerElapsedInSecs: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = timerInitialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 0) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timerElapsedInSecs} = this.state
    const disabledButton = timerElapsedInSecs > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="set-timer-txt">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            type="button"
            disabled={disabledButton}
            className="limit-controller-btn"
            onClick={this.onDecreaseTimerLimitMinutes}
          >
            -
          </button>
          <div className="timer-minutes-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            type="button"
            onClick={this.onIncreaseTimerLimitMinutes}
            disabled={disabledButton}
            className="limit-controller-btn"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(timerInitialState)
  }

  increaseElapsedTimerInSecs = () => {
    const {timerLimitInMinutes, timerElapsedInSecs} = this.state
    const isTimerCompleted = timerLimitInMinutes * 60 === timerElapsedInSecs

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSecs: prevState.timerElapsedInSecs + 1,
      }))
    }
  }

  startOrPauseTimer = () => {
    const {isTimerRunning, timerElapsedInSecs, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerLimitInMinutes * 60 === timerElapsedInSecs

    if (isTimerCompleted) {
      this.setState({timerElapsedInSecs: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increaseElapsedTimerInSecs, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImage = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseImageAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="time-controller-container">
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.startOrPauseTimer}
        >
          <img
            alt={startOrPauseImageAltText}
            src={startOrPauseImage}
            className="timer-controller-icon"
          />
          <p className="timer-controller-text">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.onResetTimer}
        >
          <img
            alt="reset icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="timer-controller-icon"
          />
          <p className="timer-controller-text">Reset</p>
        </button>
      </div>
    )
  }

  timerElapsedInSecondsFormat = () => {
    const {timerLimitInMinutes, timerElapsedInSecs} = this.state
    const remainTimeInSeconds = timerLimitInMinutes * 60 - timerElapsedInSecs
    const minutes = Math.floor(remainTimeInSeconds / 60)
    const seconds = Math.floor(remainTimeInSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.timerElapsedInSecondsFormat()}
              </h1>
              <p className="timer-text">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
