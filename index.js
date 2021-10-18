import Timer from './module/Timer.js';

const resetBtn =  document.querySelector(".header__menu-item--reset-btn"),
	startBtn = document.querySelector('.header__menu-item--start-btn'),
	settingBtn = document.querySelector('.header__menu-item--setting-btn'),
	// modal Div 
	modalDivMin = document.querySelector('.modal__time-minute'),
	modalDivSec = document.querySelector('.modal__time-sec'),
	// modal Button
	modalButtons = document.querySelector('.modal__button');



const timer = new Timer(2700, startBtn);

startBtn.addEventListener('click', timer.handelStart);
resetBtn.addEventListener('click', timer.handelReset);
settingBtn.addEventListener('click', timer.handleSetting);

modalDivMin.addEventListener('click', timer.handleMin);
modalDivSec.addEventListener('click', timer.handleSec);
modalButtons.addEventListener('click', timer.handleModalBtn);

