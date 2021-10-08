import Timer from './module/Timer.js';
import Render from './module/Render.js';


const canvas = document.getElementById('main__timer-canvas');
const ctx = canvas.getContext('2d');
const digitMin = document.querySelector('.main__timer-digit--min');
const digitSec = document.querySelector('.main__timer-digit--sec');



const timer = new Timer();
const render = new Render();

timer.start(render.renderDigit);
setTimeout(timer.finish, 70000);



render.drayCtx();
