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

myAction.onKeyUp(({ action, context, device, event, payload }) => {
  if (timers[context]) {
    // If a timer exists, pause it
    timers[context].pause();
  } else {
    // If no timer exists, start a new one
    timers[context] = new Timer();
    timers[context].start();
  }
});

pauseAllAction.onKeyUp(({ action, context, device, event, payload }) => {
  // Pause all timers
  for (let timer of Object.values(timers)) {
    timer.pause();
  }
});
