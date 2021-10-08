const CENTER_X = 350;
const CENTER_Y = 300;
const DEFAULT_COLOR ="rgb(243, 43, 61)";
const DEFAULT_RADIUS = 300;

const canvas = document.getElementById('main__timer-canvas');
const ctx = canvas.getContext('2d');
const digitMin = document.querySelector('.main__timer-digit--min');
const digitSec = document.querySelector('.main__timer-digit--sec');

class Render {
	constructor() {
		this.drayCtx();
	}

	renderDigit = (time) => {
		const {min, sec} = time;
		digitMin.textContent = String(min).padStart(2, '0');
		digitSec.textContent = String(sec).padStart(2, '0');
	}

	drayCtx = (color=DEFAULT_COLOR) => {
		ctx.fillStyle= color;
		ctx.arc(CENTER_X, CENTER_Y, DEFAULT_RADIUS, 0, Math.PI * 2);
		ctx.fill();
	}

	toggleStartStop = (isStarting, eventTarget) => {
		if (isStarting) {
			eventTarget.textContent = 'Stop';
		} else {
			eventTarget.textContent = 'Start';
		}
	}
}

export default Render;
