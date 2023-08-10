const PropertyInspector = require('../../../libs/js/property-inspector.js');
const Utils = require('../../../libs/js/utils.js');

$PI.onConnected((jsn) => {
    // Your JavaScript code goes here
    document.getElementById('fileType').addEventListener('change', function() {
        // Handle change in file type
    });
    document.getElementById('filePath').addEventListener('change', function() {
        // Send the new file path to the plugin
        $SD.api.sendToPlugin($SD.uuid, {
            event: 'setLogFilePath',
            payload: {
                logFilePath: this.value
            }
        });
    });
    document.getElementById('imageUpload').addEventListener('change', function() {
        // Handle image upload
    });
    document.getElementById('title').addEventListener('change', function() {
        // Handle change in title
    });
    document.getElementById('bgColor').addEventListener('change', function() {
        // Handle change in background color
    });
    document.getElementById('taskDescription').addEventListener('change', function() {
        // Handle change in task description
    });
    document.getElementById('timeFormat').addEventListener('change', function() {
        // Handle change in time format
    });
});
