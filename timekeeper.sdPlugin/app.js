const { Action } = require('./libs/js');
const myAction = new Action("com.timekeeper.timekeeper");
const pauseAllAction = new Action("com.timekeeper.pauseall");
const timers = {};

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(
  ({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
    console.log("Stream Deck connected!");
  }
);

const fs = require('fs');
const logFilePath = './log.txt'; // Replace with the actual log file path

myAction.onKeyUp(({ action, context, device, event, payload }) => {
  if (timers[context]) {
    // If a timer exists, pause it
    timers[context].pause();
    const pauseTime = new Date();
    const elapsedTime = timers[context].getTime();
    fs.appendFile(logFilePath, `Pause: ${pauseTime}, Elapsed Time: ${elapsedTime}\n`, err => {
      if (err) throw err;
    });
  } else {
    // If no timer exists, start a new one
    timers[context] = new Timer();
    timers[context].start();
    const startTime = new Date();
    fs.appendFile(logFilePath, `Start: ${startTime}\n`, err => {
      if (err) throw err;
    });
  }
});

pauseAllAction.onKeyUp(({ action, context, device, event, payload }) => {
  // Pause all timers
  for (let timer of Object.values(timers)) {
    timer.pause();
  }
});
