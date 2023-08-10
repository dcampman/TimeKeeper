const PropertyInspector = require('../../../libs/js/property-inspector.js');
const Utils = require('../../../libs/js/utils.js');

$PI.onConnected((jsn) => {
    // Your JavaScript code goes here
    document.getElementById('bgColor').addEventListener('change', function() {
        $SD.api.sendToPlugin($SD.uuid, {
            event: 'setBgColor',
            payload: {
                bgColor: this.value
            }
        });
    });
    document.getElementById('pausedBgColor').addEventListener('change', function() {
        $SD.api.sendToPlugin($SD.uuid, {
            event: 'setPausedBgColor',
            payload: {
                pausedBgColor: this.value
            }
        });
    });
});
