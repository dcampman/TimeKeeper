const fs = require("fs");
const path = require("path");
const { Action } = require("./libs/js");
const timekeeperAction = new Action("com.timekeeper.sdPlugin.timekeeper");
const pauseAllAction = new Action("com.timekeeper.sdPlugin.pauseall");
const timers = {};
const settings = {};

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
  console.log("Stream Deck connected!");
});

// This will be replaced with a call to the LogWriter class
timekeeperAction.onKeyUp(({ action, context, device, event, payload }) => {
  if (!timers[context]) {
    // If no timer exists, start a new one and initialize the settings
    timers[context] = new Timer();
    settings[context] = {
      fileType: "txt",
      title: "Task",
      bgColor: "blue",
      taskDescription: "Task Timer",
      timeFormat: ""
    };
    timers[context].start();
    const startTime = new Date();
    writeToLogFile(
      `Start: ${startTime}, Title: ${settings[context].title}, Task Description: ${settings[context].taskDescription}`,
      settings[context].fileType
    );
  } else {
    // If a timer exists, pause it and log the pause time
    timers[context].pause();
    const pauseTime = new Date();
    const elapsedTime = timers[context].getTime();
    writeToLogFile(
      `Pause: ${pauseTime}, Elapsed Time: ${elapsedTime}`,
      settings[context].fileType
    );
  }
});

$SD.onMessage((uuid, json) => {
  const { event, payload } = json;
  const context = payload?.context;
  if (event === "setFileType") {
    // Update the fileType setting for the corresponding TimeKeeper action
    settings[context].fileType = payload.fileType;
  } else if (event === "setTitle") {
    // Update the title setting for the corresponding TimeKeeper action
    settings[context].title = payload.title;
  } else if (event === "setBgColor") {
    // Update the bgColor setting for the corresponding TimeKeeper action
    settings[context].bgColor = payload.bgColor;
    $SD.api.setSettings(context, { bgColor: settings[context].bgColor });
  } else if (event === "setTaskDescription") {
    // Update the taskDescription setting for the corresponding TimeKeeper action
    settings[context].taskDescription = payload.taskDescription;
  } else if (event === "setTimeFormat") {
    // Update the timeFormat setting for the corresponding TimeKeeper action
    settings[context].timeFormat = payload.timeFormat;
  }
});

pauseAllAction.onKeyUp(({ action, context, device, event, payload }) => {
  // Pause all timers
  Timer.pauseAll(timers);
  // Change the background color of the pauseAll action button
  $SD.api.setGlobalSettings($SD.uuid, { bgColor: payload.pausedBgColor });
});
