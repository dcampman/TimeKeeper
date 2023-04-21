let startTime = null;
let pausedTime = null;

// Update the following function in the plugin to set the startTime and pausedTime
// when starting and pausing the timer:
//
// function onStartTimer() {
//   if (pausedTime) {
//     startTime += Date.now() - pausedTime;
//     pausedTime = null;
//   } else {
//     startTime = Date.now();
//   }
// }
//
// function onPauseTimer() {
//   if (!pausedTime) {
//     pausedTime = Date.now();
//   }
// }

const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  let grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  let ang;
  let num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  if (startTime === null) {
    return;
  }

  let elapsedTime = pausedTime
    ? pausedTime - startTime
    : Date.now() - startTime;
  let elapsedSeconds = elapsedTime / 1000;
  let elapsedMinutes = elapsedSeconds / 60;

  // Hour
  let hour = (elapsedMinutes / 60) % 12;
  hour =
    (hour * Math.PI) / 6 +
    (elapsedMinutes * Math.PI) / (6 * 60) +
    (elapsedSeconds * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);

  // Minute
  let minute = (elapsedMinutes % 60) / 60;
  minute = minute * Math.PI * 2;
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);

  // Second (optional, uncomment the following lines to include a second hand)
  // let second = (elapsedSeconds % 60) / 60;
  // second = (second * Math.PI * 2);
  // drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

setInterval(drawClock, 1000);
