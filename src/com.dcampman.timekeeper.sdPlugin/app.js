/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const tasktimer = new Action("com.dcampman.timekeeper.tasktimer");

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(
  ({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
    console.log("Stream Deck connected!");
  }
);

tasktimer.onKeyUp(({ action, context, device, event, payload }) => {
  console.log("Your key code goes here!");
});

tasktimer.onDialRotate(({ action, context, device, event, payload }) => {
  console.log("Your dial code goes here!");
});
