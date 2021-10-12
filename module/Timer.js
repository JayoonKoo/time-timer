import Render from './Render.js';

const DEFAULT_TIME_SEC = 3000;


class Timer {
	constructor(time=DEFAULT_TIME_SEC, startBtn) {
		this._targetTime=time;
		this._resetStartRadian = this.getStartRadian(this._targetTime);
		this._render = new Render(this._resetStartRadian);
		this._currentTime = this._targetTime;
		this._min = Math.floor(time/60);
		this._sec = time%60;
		this._startId;
		this._startBtn = startBtn;
	}

	getStartRadian = (timeSec) => {
		return (timeSec / 60 * 6 ) / 180;
	}

	get currentStartRadian() {
		return this.getStartRadian(this._currentTime);
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

	get isStarting() {
		return typeof this._startId !== 'undefined';
	}

	handelReset = () => {
		if (this.isStarting) {
			this.stop();
		}
		this._currentTime = this._targetTime;
		this._render.renderDigit(this.time);
	}

	handelStart = (event) => {
		if (!this.isStarting) {
			this.start(() => this._render.drayCtx(this.currentStartRadian));
		} else {
			this.stop();
		}
		this._render.toggleStartStop(this.isStarting, this._startBtn);
	}

	start = (renderDigit) => {
		this._startId = setInterval(() => {
			this._currentTime -= 1;
			if (this._currentTime < 0) clearInterval(this._startId);

			const time = this.time;
			renderDigit(time);
		},1000);
	}

	stop = () => {
		clearInterval(this._startId);
		this._startId = undefined;
		this._render.toggleStartStop(this.isStarting, this._startBtn);
	}
}

export default Timer;
