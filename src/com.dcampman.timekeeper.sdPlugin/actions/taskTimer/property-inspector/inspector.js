document.addEventListener("DOMContentLoaded", function () {
  const taskNameInput = document.getElementById("taskName");
  const outputFormatSelect = document.getElementById("outputFormat");

  taskNameInput.addEventListener("input", function () {
    saveSettings("taskName", taskNameInput.value);
  });

  outputFormatSelect.addEventListener("change", function () {
    saveSettings("outputFormat", outputFormatSelect.value);
  });

  function saveSettings(key, value) {
    if (window.opener) {
      const actionInfo = JSON.parse(window.opener.actionInfo);
      const context = actionInfo.context;

      const settings = actionInfo.payload.settings;
      settings[key] = value;

      const json = {
        event: "setSettings",
        context: context,
        payload: settings,
      };
      window.opener.postMessage(json, "*");
    }
  }
});
