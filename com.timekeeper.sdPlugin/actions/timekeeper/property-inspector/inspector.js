const PropertyInspector = require("../../../libs/js/property-inspector.js");
const Utils = require("../../../libs/js/utils.js");

$PI.onConnected((jsn) => {
  // Event listener for file type change
  document.getElementById("fileType").addEventListener("change", function () {
    $SD.api.sendToPlugin($SD.uuid, {
      event: "setFileType",
      payload: {
        fileType: this.value,
      },
    });
  });
  // Event listener for image upload
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

  // Event listener for title change
  document.getElementById("title").addEventListener("change", function () {
    $SD.api.sendToPlugin($SD.uuid, {
      event: "setTitle",
      payload: {
        title: this.value,
      },
    });
  });

  // Event listener for background color change
  document.getElementById("bgColor").addEventListener("change", function () {
    $SD.api.sendToPlugin($SD.uuid, {
      event: "setBgColor",
      payload: {
        bgColor: this.value,
      },
    });
  });

  // Event listener for task description change
  document
    .getElementById("taskDescription")
    .addEventListener("change", function () {
      $SD.api.sendToPlugin($SD.uuid, {
        event: "setTaskDescription",
        payload: {
          taskDescription: this.value,
        },
      });
    });

  // Event listener for time format change
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
