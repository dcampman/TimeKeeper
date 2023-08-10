class Timer {
  constructor() {
    this.startTime = null;
    this.pauseTime = null;
  }

  start() {
    this.startTime = Date.now();
    this.pauseTime = null;
  }

  pause() {
    if (this.startTime) {
      this.pauseTime = Date.now() - this.startTime;
      this.startTime = null;
    }
  }

  reset() {
    this.startTime = null;
    this.pauseTime = null;
  }

  getTime() {
    if (this.pauseTime) {
      return this.pauseTime;
    } else if (this.startTime) {
      return Date.now() - this.startTime;
    } else {
      return 0;
    }
  }
}

module.exports = Timer;
