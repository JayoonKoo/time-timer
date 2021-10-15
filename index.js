import Timer from './module/Timer.js';

const resetBtn =  document.querySelector(".header__menu-item--reset-btn"),
	startBtn = document.querySelector('.header__menu-item--start-btn'),
	settingBtn = document.querySelector('.header__menu-item--setting-btn');


const timer = new Timer(2700, startBtn);

startBtn.addEventListener('click', timer.handelStart);
resetBtn.addEventListener('click', timer.handelReset);
settingBtn.addEventListener('click', timer.handleSetting);

