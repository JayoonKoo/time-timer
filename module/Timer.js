const DEFAULT_TIME_SEC = 3000;

class Timer {
	
	constructor(time=DEFAULT_TIME_SEC) {
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
			if (this._currentTime < 0) clearInterval(startId);

			const time = this.time;
			renderDigit(time);
		},1000);
	}

	finish = () => {
		clearInterval(this._startId);
	}
}

export default Timer;
