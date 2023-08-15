/// <reference path="constants.js" />

/**
 * @class Action
 * A Stream Deck plugin action, where you can register callback functions for different events
 */
const fs = require("fs");
const path = require("path");

class ELGSDAction {
  UUID;
  on = EventEmitter.on;
  emit = EventEmitter.emit;

  constructor(UUID) {
    if (!UUID) {
      console.error(
        "An action UUID matching the action UUID in your manifest is required when creating Actions."
      );
    }

    this.UUID = UUID;
    this.verifyAndCreateLogDir(UUID);
    this.verifyAndCreateLogFile(UUID);
  }

  verifyAndCreateLogDir(context) {
    const logFileDir = path.join(os.homedir(), ".timeKeeper", context);
    fs.access(logFileDir, fs.constants.F_OK, (err) => {
      if (!exists) {
        fs.mkdir(logFileDir, { recursive: true }, (err) => {
          if (err) console.error(err);
        });
      }
    });
  }

  /**
   * Registers a callback function for the didReceiveSettings event, which fires when calling getSettings
   * @param {function} fn
   */
  onDidReceiveSettings(fn) {
    if (!fn) {
      console.error(
        "A callback function for the didReceiveSettings event is required for onDidReceiveSettings."
      );
    }

    this.on(`${this.UUID}.${Events.didReceiveSettings}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the keyDown event, which fires when pressing a key down
   * @param {function} fn
   */
  onKeyDown(fn) {
    if (!fn) {
      console.error(
        "A callback function for the keyDown event is required for onKeyDown."
      );
    }

    this.on(`${this.UUID}.${Events.keyDown}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the keyUp event, which fires when releasing a key
   * @param {function} fn
   */
  onKeyUp(fn) {
    if (!fn) {
      console.error(
        "A callback function for the keyUp event is required for onKeyUp."
      );
    }

    this.on(`${this.UUID}.${Events.keyUp}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the willAppear event, which fires when an action appears on the canvas
   * @param {function} fn
   */
  onWillAppear(fn) {
    if (!fn) {
      console.error(
        "A callback function for the willAppear event is required for onWillAppear."
      );
    }

    this.on(`${this.UUID}.${Events.willAppear}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the willAppear event, which fires when an action disappears on the canvas
   * @param {function} fn
   */
  onWillDisappear(fn) {
    if (!fn) {
      console.error(
        "A callback function for the willDisappear event is required for onWillDisappear."
      );
    }

    this.on(`${this.UUID}.${Events.willDisappear}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the titleParametersDidChange event, which fires when a user changes the key title
   * @param {function} fn
   */
  onTitleParametersDidChange(fn) {
    if (!fn) {
      console.error(
        "A callback function for the titleParametersDidChange event is required for onTitleParametersDidChange."
      );
    }

    this.on(`${this.UUID}.${Events.titleParametersDidChange}`, (jsn) =>
      fn(jsn)
    );
    return this;
  }

  /**
   * Registers a callback function for the propertyInspectorDidAppear event, which fires when the property inspector is displayed
   * @param {function} fn
   */
  onPropertyInspectorDidAppear(fn) {
    if (!fn) {
      console.error(
        "A callback function for the propertyInspectorDidAppear event is required for onPropertyInspectorDidAppear."
      );
    }

    this.on(`${this.UUID}.${Events.propertyInspectorDidAppear}`, (jsn) =>
      fn(jsn)
    );
    return this;
  }

  /**
   * Registers a callback function for the propertyInspectorDidDisappear event, which fires when the property inspector is closed
   * @param {function} fn
   */
  onPropertyInspectorDidDisappear(fn) {
    if (!fn) {
      console.error(
        "A callback function for the propertyInspectorDidDisappear event is required for onPropertyInspectorDidDisappear."
      );
    }

    this.on(`${this.UUID}.${Events.propertyInspectorDidDisappear}`, (jsn) =>
      fn(jsn)
    );
    return this;
  }

  /**
   * Registers a callback function for the sendToPlugin event, which fires when the property inspector uses the sendToPlugin api
   * @param {function} fn
   */
  onSendToPlugin(fn) {
    if (!fn) {
      console.error(
        "A callback function for the sendToPlugin event is required for onSendToPlugin."
      );
    }

    this.on(`${this.UUID}.${Events.sendToPlugin}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the onDialRotate event, which fires when a SD+ dial was rotated
   * @param {function} fn
   */
  onDialRotate(fn) {
    if (!fn) {
      console.error(
        "A callback function for the onDialRotate event is required for onDialRotate."
      );
    }
    this.on(`${this.UUID}.${Events.dialRotate}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the dialPress event, which fires when a SD+ dial was pressed or released
   * @deprecated Use onDialUp and onDialDown instead
   */
  onDialPress(fn) {
    if (!fn) {
      console.error(
        "A callback function for the dialPress event is required for onDialPress."
      );
    }
    this.on(`${this.UUID}.${Events.dialPress}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the dialDown event, which fires when a SD+ dial was pressed
   * @param {function} fn
   */
  onDialDown(fn) {
    if (!fn) {
      console.error(
        "A callback function for the dialDown event is required for onDialDown."
      );
    }
    this.on(`${this.UUID}.${Events.dialDown}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the dialUp event, which fires when a pressed SD+ dial was released
   * @param {function} fn
   */
  onDialUp(fn) {
    if (!fn) {
      console.error(
        "A callback function for the dialUp event is required for onDialUp."
      );
    }
    this.on(`${this.UUID}.${Events.dialUp}`, (jsn) => fn(jsn));
    return this;
  }

  /**
   * Registers a callback function for the touchTap event, which fires when a SD+ touch panel was touched quickly
   * @param {function} fn
   */
  onTouchTap(fn) {
    if (!fn) {
      console.error(
        "A callback function for the onTouchTap event is required for onTouchTap."
      );
    }
    this.on(`${this.UUID}.${Events.touchTap}`, (jsn) => fn(jsn));
    return this;
  }
}

const Action = ELGSDAction;
