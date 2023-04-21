import { Application, Plugin } from "stream-deck-ts";
import { createWriteStream } from "fs";
import { join, basename } from "path";
import csvWriter from "csv-write-stream";
import sharp from "sharp";

class TimeKeeper extends Plugin {
  constructor() {
    super();
    this._tasks = {};
  }

  onKeyDown({ context, action }) {
    if (action === "com.dcampman.timekeeper") {
      const task = this._getTask(context);
      if (task) {
        if (task.running) {
          this.pauseTask(context);
        } else {
          this.resumeTask(context);
        }
      }
    } else if (action === "com.dcampman.timekeeper.pause_resume_all") {
      const allPaused = Object.values(this._tasks).every(
        (task) => !task.running
      );
      if (allPaused) {
        this.resumeAllTasks();
      } else {
        this.pauseAllTasks();
      }
    }
  }

  onKeyUp({ context, action }) {
    // No implementation required for this plugin
  }

  onWillAppear({ context, settings }) {
    if (!settings.taskName) {
      settings.taskName = "Unnamed Task";
    }
    this._tasks[context] = {
      taskName: settings.taskName,
      taskLogo: settings.taskLogo,
      outputFormat: settings.outputFormat || "csv",
      running: false,
      elapsedTime: 0,
    };
  }

  onWillDisappear({ context }) {
    delete this._tasks[context];
  }

  onSettingsDidChange({ context, settings }) {
    const task = this._getTask(context);
    if (task) {
      task.taskName = settings.taskName;
      task.taskLogo = settings.taskLogo;
      task.outputFormat = settings.outputFormat;
      this.resizeImage(settings.taskLogo);
    }
  }

  _getTask(context) {
    return this._tasks[context];
  }

  pauseTask(taskId) {
    const task = this._getTask(taskId);
    if (task && task.running) {
      task.running = false;
      this.setTitle(taskId, this.formatTime(task.elapsedTime), "darkred");
      this.writeTaskLog(taskId, "pause");
    }
  }

  resumeTask(taskId) {
    const task = this._getTask(taskId);
    if (task && !task.running) {
      task.running = true;
      this.setTitle(taskId, this.formatTime(task.elapsedTime), "black");
      this.writeTaskLog(taskId, "resume");
    }
  }

  pauseAllTasks() {
    for (const taskId in this._tasks) {
      if (this._tasks[taskId].running) {
        this.pauseTask(taskId);
      }
    }
  }

  resumeAllTasks() {
    for (const taskId in this._tasks) {
      if (!this._tasks[taskId].running) {
        this.resumeTask(taskId);
      }
    }
  }

  writeTaskLog(taskId, action) {
    const task = this._getTask(taskId);
    if (!task) return;

    const writer = csvWriter({
      sendHeaders: false,
      headers: ["timestamp", "action", "taskName", "taskLogo"],
    });
    writer.pipe(createWriteStream(this._getTaskFile(taskId), { flags: "a" }));
    writer.write({
      timestamp: new Date().toISOString(),
      action: action,
      taskName: task.taskName,
      taskLogo: task.taskLogo,
    });
    writer.end();
  }

  _getTaskFile(taskId) {
    return join(
      __dirname,
      "tasks",
      `${taskId}.${this._tasks[taskId].outputFormat}`
    );
  }

  formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, "0")}:${(minutes % 60)
      .toString()
      .padStart(2, "0")}`;
  }

  setTitle(context, title, color) {
    this.sendToPropertyInspector(context, {
      action: "setTitle",
      payload: { title, color },
    });
  }

  async resizeImage(imagePath) {
    if (!imagePath) return;

    const dimensions = { width: 144, height: 144 };
    const outputPath = join(__dirname, "resized_images", basename(imagePath));

    await sharp(imagePath)
      .resize(dimensions.width, dimensions.height)
      .toFile(outputPath);
  }
}

const application = new Application(TimeKeeper);
application.run();
