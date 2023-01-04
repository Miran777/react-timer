import React from "react";
import {useState, useEffect} from 'react';
import { getPadTime } from './helpers/getPadTime'



function App() {
  const [timeLeft, setTimeLeft] = useState(60)
  const [isCounting, setIsCounting] = useState(false)
  const [scArrow, setSecondArrow] = useState(360 - timeLeft * 6)
  const [mscArrow, setMSecondArrow] = useState(0)


    useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
      setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))

      isCounting &&
      setSecondArrow((scArrow) => (timeLeft >= 1 ? scArrow + 6 : scArrow))
    }, 1000)

    const msInterval = setInterval(() => {
      isCounting &&
      setMSecondArrow((mscArrow) => timeLeft >= 1 ? mscArrow + 6 : mscArrow)
    }, 16,6666666666669);

    return () => {
      clearInterval(interval)
      clearInterval(msInterval)
      setMSecondArrow(0)
    }
  }, [isCounting, timeLeft])

  const minutes = getPadTime(Math.floor(timeLeft / 60))
  const seconds = getPadTime(timeLeft - minutes * 60)
  const rotateStyleSeconds = {
    transform: `rotateZ(${360 - timeLeft * 6}deg)`
  }
  const rotateMStyleSeconds = {
    transform: `rotateZ(${mscArrow}deg)`
  }


  const handle1 = () => {
    setTimeLeft(15)
  }
  const handle2 = () => {
    setTimeLeft(30)
  }
  const handle3 = () => {
    setTimeLeft(60)
  }
  const handle4 = () => {
    setTimeLeft(120)
  }
  const handleStart = () => {
    setIsCounting(true)
  }
  const handleStop = () => {
    setIsCounting(false)
  }
  const handleReset = () => {
    setIsCounting(false)
    setTimeLeft(2 * 60)
    setSecondArrow(360 - timeLeft * 6)
  }


  return (
    <div className="App">
      <div className="timers">
        <button onClick={handle1}>15 seconds</button>
        <button onClick={handle2}>30 seconds</button>
        <button onClick={handle3}>1 minute</button>
        <button onClick={handle4}>2 minutes</button>
      </div>
      <div className="clock">
        <div className="secs">
          <div style={rotateStyleSeconds} className="sc"></div>
        </div>
        <div className="msecs">
          <div style={rotateMStyleSeconds} className="msc"></div>
        </div>
      </div>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        {isCounting ? (
          <button onClick={handleStop} className="btn-left">Stop</button>) : (
          <button onClick={handleStart} className="btn-left">Start</button>)}
        <button onClick={handleReset} className="btn-right">Reset</button>
      </div>
    </div>
  );
}

export default App;
