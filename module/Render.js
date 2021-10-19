const CANVAS_W = 700;
const CANVAS_H = 600;
const DEFAULT_COLOR = "rgb(243, 43, 61)";
const DEFAULT_RADIUS = 300;
const FONT = "bold 100px Arial";
const BASELINE = "middle";
const ALIGN = "center";

const canvas = document.getElementById("main__timer-canvas");
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;

const ctx = canvas.getContext("2d");
ctx.font = FONT;
ctx.textBaseline = BASELINE;
ctx.textAlign = ALIGN;

const digitMin = document.querySelector(".main__timer-digit--min");
const digitSec = document.querySelector(".main__timer-digit--sec");

class Render {
  constructor(startRadian, time) {
    this._startRadian = startRadian;
		this._centerX = 0;
		this._centerY = 0;
    this.drayCtx();
		this.drayDigit(time);
  }

  renderDigit = (time) => {
    const { min, sec } = time;
    digitMin.textContent = String(min).padStart(2, "0");
    digitSec.textContent = String(sec).padStart(2, "0");
  };

  drayCtx = (startRadian = this._startRadian) => {
		if (startRadian === 0) {
			startRadian = 2;
		} else {
			if (startRadian === 2) {
				startRadian = 0;
			}
		}
    this._centerX = CANVAS_W / 2;
    this._centerY = CANVAS_H / 2;
    ctx.fillStyle = DEFAULT_COLOR;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.beginPath();
    ctx.moveTo(this._centerX, this._centerY);
    ctx.arc(
      this._centerX,
      this._centerY,
      DEFAULT_RADIUS,
      Math.PI * (startRadian - 0.5),
      Math.PI * 1.5,
      true
    );
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

  drayDigit = (time) => {
		ctx.fillStyle = "#333";
    let { min, sec } = time;
    min = String(min).padStart(2, "0");
    sec = String(sec).padStart(2, "0");
    ctx.fillText(`${min} : ${sec}`, this._centerX, this._centerY);
  };
}

export default Render;
