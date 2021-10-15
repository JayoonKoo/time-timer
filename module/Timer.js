import Render from './Render.js';

const DEFAULT_TIME_SEC = 3000;
const defaultTimeSpan = document.querySelector('.default-time'),
	defaultTimeDiv = document.querySelector('.header__default-time'),
	modal = document.querySelector('.modal'),
	modalMinute =  document.querySelector('.modal__time-minute--min'),
	modalSec = document.querySelector('.modal__time-sec--sec');



class Timer {
	constructor(time=DEFAULT_TIME_SEC, startBtn) {
		this._targetTime=time;
		this._currentTime = this._targetTime;
		this._resetStartRadian = this.getStartRadian(this._targetTime);
		this._render = new Render(this._resetStartRadian, this.time);
		this._min = Math.floor(time/60);
		this._sec = time%60;
		this._defaultMin = String(this._min).padStart(2, "0");
		this._defaultSec = String(this._sec).padStart(2, "0")
		defaultTimeSpan.textContent = `${this._defaultMin} : ${this._defaultSec}`;
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
		this._render.drayCtx(this.currentStartRadian);
		this._render.drayDigit(this.time);
	}

	handelStart = (event) => {
		if (!this.isStarting) {
			this.start(() => {
				this._render.drayCtx(this.currentStartRadian)
				this._render.drayDigit(this.time);
			});
		} else {
			this.stop();
		}
		this._render.toggleStartStop(this.isStarting, this._startBtn);
	}

	handleSetting = (event) => {
		defaultTimeDiv.classList.toggle('unshow');
		if (defaultTimeDiv.classList.contains('unshow')) {
			// modal 창 보일 때
			modal.classList.remove('unshow');
			modalMinute.value = this._defaultMin;
			modalSec.value = this._defaultSec;
			
		} else {
			// modal 창 사라질 때 
			modal.classList.add('unshow');
		}
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
