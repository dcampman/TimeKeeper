# TimeKeeper

TimeKeeper is a Stream Deck plugin that helps you track your time for various tasks. It allows you to start, pause, reset, and resume timers for each task; and exports the tracked time to a JSON file, CSV file, or plain text file.

## Features

- Assign a timekeeper action to a button of a stream deck to track time of a task.
- Start, pause, resume, and reset timers for each timekeeper action button created.
- A long press (2 seconds) of the button should reset the timer to 0.
- The elapsed time between pause to previous resume will be logged as well as all elapsed logged time since the timer started.
- Export tracked time per timekeeper action in JSON, CSV, or plain text format in the users home directory.
- Users can customize the task name and logo on the button using the Property Inspector.
- Pause and resume all timers with a separate action called PauseAll.

## Usage

1. Open Stream Deck and find the TimeKeeper plugin in the "Task Tracking" section.
2. Drag the "TimeKeeper" action to a button to create a task timer.
3. Click the button to open the Property Inspector, where you can set the logo, and output format.
4. Press the button on your Stream Deck to start, pause, or resume the timer for the task.
5. Press the button for 2 or more seconds to reset the timer for that button.
6. Optionally, drag the "PauseAll" action to another button to control all timers at once.

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for details.
