const canvas = document.getElementById('main__timer-canvas');
const ctx = canvas.getContext('2d');
const digitMin = document.querySelector('.main__timer-digit--min');
const digitSec = document.querySelector('.main__timer-digit--sec');

const DEFAULT_TIME = 3000;
const CENTER_X = 350;
const CENTER_Y = 300;
const DEFAULT_COLOR ="rgb(243, 43, 61)";
const DEFAULT_RADIUS = 300;

const renderDigit = (time) => {
	const {min, sec} = time;
	digitMin.textContent = String(min).padStart(2, '0');
	digitSec.textContent = String(sec).padStart(2, '0');
}

class Timer {
	
	constructor(time=DEFAULT_TIME) {
		this._targetTime=time;
		this._currentTime = this._targetTime;
		this._min = Math.floor(time/60);
		this._sec = time%60;
		this._startId;
	}

	set targetTime(time) {
		this._targetTime = time;
	}

	get time() {
		this._min = Math.floor(this._currentTime/60);
		this._sec = this._currentTime % 60;
		return {
			min: this._min,
			sec: this._sec,
		}
	}

	start = (renderDigit) => {
		this._startId = setInterval(() => {
			this._currentTime -= 1;
			if (this._currentTime <=0) clearInterval(startId);
			
			const time = this.time;
			renderDigit(time);
		},1000);
	}

	finish = () => {
		clearInterval(this._startId);
	}
}

const timer = new Timer();
timer.start(renderDigit);
setTimeout(timer.finish, 70000);


const drayCtx = (color=DEFAULT_COLOR) => {
	ctx.fillStyle= color;
	ctx.arc(CENTER_X, CENTER_Y, DEFAULT_RADIUS, 0, Math.PI * 2);
	ctx.fill();
}

drayCtx();
