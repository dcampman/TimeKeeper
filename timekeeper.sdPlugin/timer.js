class Timer {
  constructor() {
    this.startTime = null;
    this.pauseTime = null;
    this.totalTime = 0;
    this.isPaused = true;
  }

  start() {
    if (this.isPaused) {
      this.startTime = Date.now();
      this.isPaused = false;
    }
  }

  pause() {
    if (!this.isPaused && this.startTime) {
      this.totalTime += Date.now() - this.startTime;
      this.startTime = null;
      this.isPaused = true;
    }
  }

  resume() {
    if (this.isPaused) {
      this.startTime = Date.now();
      this.isPaused = false;
    }
  }

  reset() {
    this.startTime = null;
    this.totalTime = 0;
    this.isPaused = true;
  }

  getTime() {
    if (this.isPaused) {
      return this.totalTime;
    } else {
      return this.totalTime + (Date.now() - this.startTime);
    }
  }

  static pauseAll(timers) {
    for (let timer of Object.values(timers)) {
      timer.pause();
    }
  }
}

module.exports = Timer;
