const canvas = document.getElementById('main__timer-canvas');
const ctx = canvas.getContext('2d');

class Timer {
	
	constructor(time=3000) {
		this._targetTime=time;
		this._min = Number(time/60);
		this._sec = time%60;
	}

	set targetTime(time) {
		this._targetTime = time;
	}

	start = () => {
		const startId = setInterval(() => {
			
		},1000);
	}

	get time() {
		return {
			min: this._min,
			sec: this._sec,
		}
	}
}


const drayCtx = (color="rgb(243, 43, 61)") => {
	ctx.fillStyle= color;
	ctx.arc(350, 300, 300, 0, Math.PI * 2);
	ctx.fill();
}



drayCtx();
