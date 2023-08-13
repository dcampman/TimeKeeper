const PropertyInspector = require('../../../libs/js/property-inspector.js');
const Utils = require('../../../libs/js/utils.js');

$PI.onConnected((jsn) => {
    // Event listener for background color change
    document.getElementById('bgColor').addEventListener('change', function() {
        $SD.api.sendToPlugin($SD.uuid, {
            event: 'setBgColor',
            payload: {
                bgColor: this.value
            }
        });
    });
    // Event listener for paused background color change
    document.getElementById('pausedBgColor').addEventListener('change', function() {
        $SD.api.sendToPlugin($SD.uuid, {
            event: 'setPausedBgColor',
            payload: {
                pausedBgColor: this.value
            }
        });
    });
});
