const { Action } = require("./libs/js");
const myAction = new Action("com.timekeeper.sdPlugin.timekeeper");
const pauseAllAction = new Action("com.timekeeper.sdPlugin.pauseall");
const timers = {};

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(
  ({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
    console.log("Stream Deck connected!");
  }
);

let logFileFormat = "txt"; // This will be updated with the user's input

function writeToLogFile(message, format, context) {
  const date = new Date();
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const fullMessage = `${dateString} ${message}`;
  const logFilePath = path.join(
    os.homedir(),
    "Documents",
    "TimeKeeper",
    context,
    "log.txt"
  );
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
myAction.onKeyUp(({ action, context, device, event, payload }) => {
  if (timers[context]) {
    // If a timer exists, pause it
    timers[context].pause();
    const pauseTime = new Date();
    const elapsedTime = timers[context].getTime();
    writeToLogFile(
      `Pause: ${pauseTime}, Elapsed Time: ${elapsedTime}`,
      logFileFormat
    );
  } else {
    // If no timer exists, start a new one
    timers[context] = new Timer();
    timers[context].start();
    const startTime = new Date();
    writeToLogFile(`Start: ${startTime}`, logFileFormat);
  }
});

$SD.onMessage((uuid, json) => {
  if (json.event === "setFileType") {
    fileType = json.payload.fileType;
  } else if (json.event === "setTitle") {
    title = json.payload.title;
  } else if (json.event === "setBgColor") {
    bgColor = json.payload.bgColor;
    $SD.api.setSettings($SD.uuid, { bgColor });
  } else if (json.event === "setTaskDescription") {
    taskDescription = json.payload.taskDescription;
  } else if (json.event === "setTimeFormat") {
    timeFormat = json.payload.timeFormat;
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
