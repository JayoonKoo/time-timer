const CANVAS_W = 700;
const CANVAS_H = 600;
const DEFAULT_COLOR = "rgb(243, 43, 61)";
const DEFAULT_RADIUS = 300;

const canvas = document.getElementById("main__timer-canvas");
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;

const ctx = canvas.getContext("2d");

const digitMin = document.querySelector(".main__timer-digit--min");
const digitSec = document.querySelector(".main__timer-digit--sec");

class Render {
  constructor(
		startRadian,
    canvasW = CANVAS_W,
    cnavasH = CANVAS_H,
    radius = DEFAULT_RADIUS,
    color = DEFAULT_COLOR,
  ) {
    this.canvasW = canvasW;
    this.cnavasH = cnavasH;
    this.radius = radius;
    this.color = color;
		this._startRadian = startRadian;
    this.drayCtx();
  }

  renderDigit = (time) => {
    const { min, sec } = time;
    digitMin.textContent = String(min).padStart(2, "0");
    digitSec.textContent = String(sec).padStart(2, "0");
  };

  drayCtx = (startRadian=this._startRadian) => {
    const centerX = this.canvasW / 2;
    const centerY = this.cnavasH / 2;
    ctx.fillStyle = this.color;
		ctx.clearRect(0, 0, this.canvasW, this.cnavasH);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, this.radius, Math.PI * (startRadian -0.5), Math.PI * 1.5, true);
    ctx.closePath();
    ctx.fill();
  };

  toggleStartStop = (isStarting, eventTarget) => {
    if (isStarting) {
      eventTarget.textContent = "Stop";
    } else {
      eventTarget.textContent = "Start";
    }
  };
}

export default Render;
