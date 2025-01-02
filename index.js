//import './index.css';

class Timer {
  hr = 0;
  min = 0;
  sec = 0;
  ms = 0;
  msCount = 0;

  constructor() {}

  get hour() {
    return this.hr.toString();
  }

  get minute() {
    return this.min.toString();
  }

  get second() {
    return this.sec.toString();
  }

  get millisecond() {
    return this.ms.toString();
  }

  get millis() { // No string conversion, running millisecond count since start!
    return this.msCount;
  }

  resetTimer() {
    this.hr = 0;
    this.min = 0;
    this.sec = 0;
    this.ms = 0;
    this.msCount = 0;
  }

  /**
   * Step forward 1 millisecond in the timer.
   */
  step() {
    this.ms += 10;
    this.msCount += 10;
    // ms -> sec
    if (this.ms >= 1000) {
      this.ms = 0;
      this.sec += 1;
    }
    // sec -> min
    if (this.sec >= 60) {
      this.sec = 0;
      this.min += 1;
    }
    // min -> hr
    if (this.min >= 60) {
      this.min = 0;
      this.hr += 1;
    }
  }
}

/** 
 * Convert number to money string
 */
function toMoney(val, places=2) {
  return "$" + val.toFixed(places);
}

var timer = new Timer();
var intervalID = null;

document.getElementById("startTimerBtn").onclick = function() {
  if (intervalID != null) {
    return;
  }
  // Get wages
  let wage1 = document.getElementById('rate1').value;
  let wage2 = document.getElementById('rate2').value;
  if (wage1 == "" || wage2 == "") { // Values needed!
    return;
  }
  // Get rate
  let rate = +document.querySelector('input[name=rateUnitSel]:checked').value;
  // Timer loop
  intervalID = setInterval(function () {
    timer.step();
    const formattedTime = timer.hour + ':' + timer.minute + ':' + timer.second + ':' + timer.millisecond;
    document.getElementById('timer').innerHTML = formattedTime;
    // update wage counters
    document.getElementById("wage1").innerHTML = toMoney(
      document.getElementById("rate1").value / rate * timer.millis);
    document.getElementById("wage2").innerHTML = toMoney(document.getElementById("rate2").value / rate * timer.millis);
  }, 10);
};

document.getElementById("resetTimerBtn").onclick = function() {
  if (intervalID != null) {
    timer.resetTimer();
    clearInterval(intervalID);
    intervalID = null;
  }
};
