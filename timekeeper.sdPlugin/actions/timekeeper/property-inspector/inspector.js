const PropertyInspector = require("../../../libs/js/property-inspector.js");
const Utils = require("../../../libs/js/utils.js");

$PI.onConnected((jsn) => {
  // Your JavaScript code goes here
document.getElementById("fileType").addEventListener("change", function () {
    // Send the new file format to the plugin
    $SD.api.sendToPlugin($SD.uuid, {
      event: "setLogFileFormat",
      payload: {
        logFileFormat: this.value,
      },
    });
});
  // Removed event listener for filePath
  document
    .getElementById("imageUpload")
    .addEventListener("change", function () {
      const imagePath = path.join(
        os.homedir(),
        "Documents",
        "TimeKeeper",
        context,
        "image.png"
      );
      const reader = new FileReader();
      reader.onload = function (event) {
        fs.writeFile(
          imagePath,
          new Buffer(event.target.result),
          "binary",
          (err) => {
            if (err) throw err;
          }
        );
      };
      reader.readAsBinaryString(this.files[0]);
    });
  document.getElementById("title").addEventListener("change", function () {
    // Handle change in title
  });
  document.getElementById("bgColor").addEventListener("change", function () {
    // Handle change in background color
  });
  document
    .getElementById("taskDescription")
    .addEventListener("change", function () {
      // Handle change in task description
    });
  document.getElementById("timeFormat").addEventListener("change", function () {
    // Send the new time format to the plugin
    $SD.api.sendToPlugin($SD.uuid, {
      event: "setTimeFormat",
      payload: {
        timeFormat: this.value,
      },
    });
  });
});
