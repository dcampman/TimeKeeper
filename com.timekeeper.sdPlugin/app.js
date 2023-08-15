const fs = require("fs");
const path = require("path");
const { Action } = require("./libs/js");
const timekeeperAction = new Action("com.timekeeper.sdPlugin.timekeeper");
const pauseAllAction = new Action("com.timekeeper.sdPlugin.pauseall");
const timers = {};

const settings = {
  fileType: "txt", // This will be updated with the user's input
  title: "Task", // This will be updated with the user's input
  bgColor: "blue", // This will be updated with the user's input
  taskDescription: "Task Timer", // This will be updated with the user's input
  timeFormat: "" // This will be updated with the user's input
};


/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(
  ({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
    console.log("Stream Deck connected!");
  }
);

function writeToLogFile(message, format, context) {
  const moment = require("moment");
  const fs = require("fs");
  const date = moment().format(settings.timeFormat);
  const fullMessage = `${dateString} ${message}`;
  const logFilePath = path.join(
    os.homedir(),
    ".timeKeeper",
    context,
    `log.${format}`
  );
  const logFileDir = path.dirname(logFilePath);
  createDirIfNotExists(logFileDir);

  // Create the file only if it does not exist
  fs.access(logFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFile(logFilePath, '', (err) => {
        if (err) console.error(err);
      });
    }
  });

  switch (format) {
    case "json":
      fs.appendFile(
        logFilePath,
        JSON.stringify({ fullMessage }) + "\n",
        (err) => {
          if (err) throw err;
        }
      );
      break;
    case "csv":
      fs.appendFile(logFilePath, `"${fullMessage}"\n`, (err) => {
        if (err) throw err;
      });
      break;
    default: // txt
      fs.appendFile(logFilePath, fullMessage + "\n", (err) => {
        if (err) throw err;
      });
      break;
  }
}
timekeeperAction.onKeyUp(({ action, context, device, event, payload }) => {
  if (timers[context]) {
    // If a timer exists, pause it
    timers[context].pause();
    const pauseTime = new Date();
    const elapsedTime = timers[context].getTime();
    writeToLogFile(
      `Pause: ${pauseTime}, Elapsed Time: ${elapsedTime}`,
      fileType
    );
  } else {
    // If no timer exists, start a new one
    timers[context] = new Timer();
    timers[context].start();
    const startTime = new Date();
    writeToLogFile(
      `Start: ${startTime}, Title: ${title}, Task Description: ${taskDescription}`,
      fileType
    );
  }
});

$SD.onMessage((uuid, json) => {
  if (json.event === "setFileType") {
    settings.fileType = json.payload.fileType;
  } else if (json.event === "setTitle") {
    settings.title = json.payload.title;
  } else if (json.event === "setBgColor") {
    settings.bgColor = json.payload.bgColor;
    $SD.api.setSettings($SD.uuid, { bgColor: settings.bgColor });
  } else if (json.event === "setPauseAllBgColor") {
    settings.pauseAllBgColor = json.payload.bgColor;
    $SD.api.setSettings($SD.uuid, { pauseAllBgColor: settings.pauseAllBgColor });
  } else if (json.event === "setTaskDescription") {
    settings.taskDescription = json.payload.taskDescription;
  } else if (json.event === "setTimeFormat") {
    settings.timeFormat = json.payload.timeFormat;
  }
});

pauseAllAction.onKeyUp(({ action, context, device, event, payload }) => {
  // Pause all timers
  for (let timer of Object.values(timers)) {
    timer.pause();
  }
  // Change the background color of the pauseAll action button
  $SD.api.setGlobalSettings($SD.uuid, { bgColor: pausedBgColor });
});
