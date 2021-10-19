import Render from './Render.js';

const DEFAULT_TIME_SEC = 3000;
const defaultTimeSpan = document.querySelector('.default-time'),
	defaultTimeDiv = document.querySelector('.header__default-time'),
	modal = document.querySelector('.modal'),
	// modal 인풋 부분
	modalMinute =  document.querySelector('.modal__time-minute--min'),
	modalSec = document.querySelector('.modal__time-sec--sec');
	


class Timer {
	constructor(time=DEFAULT_TIME_SEC, startBtn) {
		this.targetTime=time;
		this._currentTime = this._targetTime;
		this._resetStartRadian = this.getStartRadian(this._targetTime);
		this._render = new Render(this._resetStartRadian, this.time);
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
		this._defaultMin = Math.floor(time/60);
		this._defaultSec = time%60;
		const defaultMin = String(this._defaultMin).padStart(2, "0");
		const defaultSec = String(this._defaultSec).padStart(2, "0");
		defaultTimeSpan.textContent = `${defaultMin} : ${defaultSec}`;
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

	handleChnage = (event) => {
		const {target: {value}} = event;
		const numValue = Number(value);
		const {target: {dataset: {type}}} = event;
		switch (type) {
			case "min":
				if (numValue >= 60) {
					alert("60분 보다 작은 값을 입력해야 합니다.");
					event.target.value = "59";
				} else {
					if (numValue < 0) {
						alert("0보다 작은 값은 입력할 수 없습니다.");
						event.target.value = "0";
					} 
				}		
				break;

			case "sec":
				if (numValue > 60) {
					alert("60분 보다 이하의 값을 입력해야 합니다.");
					event.target.value = "60";
				} else {
					if (numValue < 0) {
						alert("0보다 작은 값은 입력할 수 없습니다.");
						event.target.value = "0";
					} 
				}		
				break;
		
			default:
				break;
		}
	}


	handleMin = (event) => {
		const {target} = event;
		const minInput = document.querySelector('.modal__time-minute--min');
		if (target.dataset.action === "increase") {
			minInput.value = Number(minInput.value) + 5 >= 60 ? "59" :  String(Number(minInput.value) + 5);
		} else {
			if (target.dataset.action === "decrease") {
				minInput.value = Number(minInput.value) - 5 <= 0 ? "0" :  String(Number(minInput.value) - 5);
			}
		}
	}

	handleSec = (event) => {
		const {target} = event;
		const secInput = document.querySelector('.modal__time-sec--sec');
		if (target.dataset.action === "increase") {
			secInput.value = Number(secInput.value) + 5 >= 60 ? "59" :  String(Number(secInput.value) + 5);
		} else {
			if (target.dataset.action === "decrease") {
				secInput.value = Number(secInput.value) - 5 <= 0 ? "0" :  String(Number(secInput.value) - 5);
			}
		}
	}

	handleModalBtn = (event) => {
		const {value : min} = document.querySelector('.modal__time-minute--min');
		const {value: sec} = document.querySelector('.modal__time-sec--sec');
		const {target : {dataset: {action}}} = event;
		if (action === "cancle") {
			this.handleSetting();
		} else {
			if (action === "submit") {
				const time = (Number(min) * 60) + (Number(sec));
				this.targetTime = time;
				this.handleSetting();
			}
		}
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
