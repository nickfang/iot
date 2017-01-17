const button = document.querySelector('button');
const clock = setInterval(function() { decodeTime() }, 1000);
let timeUpdated = false;

function getCurrentTime(){
	const d = new Date();
	return { "hour": d.getHours(), "minute": d.getMinutes() };
}

// Split time.
// five past, ten past, quarter past, twenty past, twenty five past, half past, twenty five to, twenty to, quarter to, ten to, five to
// It is better to think it is later than it actually is so you're more likely to be somewhere on time.
// 1-5 is five past, 6-10 is ten past, 11-15 is quarter past, etc.  56-0 is o'clock
function decodeTime() {
	const time = getCurrentTime();

	console.log(time.hour + ":" + time.minute, time.minute % 5 === 1, timeUpdated === false);
	// update the time at [1,6,11,16,21,26,31,36,41,46,51,56] after the hour.
	if ((time.minute % 5 === 1) && (timeUpdated === false)) {
		setNewTime(time);
		console.log("Updated time at: " + time.hour + ":" + time.minute);
		timeUpdated = true;
	}
	if (time.minute % 5 === 2) {
		timeUpdated = false;
	}
}

function setNewTime(time) {
	console.log('setNewTime');
	const clockIds = {
		"0": ["min5","past"],
		"1": ["min10", "past"],
		"2": ["min15", "a", "past"],
		"3": ["min20", "past"],
		"4": ["min20", "min5", "past"],
		"5": ["min30", "past"],
		"6": ["min20", "min5", "to"],
		"7": ["min20", "to"],
		"8": ["min15", "a", "to"],
		"9": ["min10","to"],
		"10": ["min5","to"],
		"11": ["oclock"]
	};
	const index = Math.floor((time.minute-1)/5);
	let ids = [];

	ids.push("it");
	ids.push("is");
	// special case since the equation to find ids will put 0 minutes into index 0 of clockIds.
	if (time.minute === 0) {
		ids.push("oclock");
	} else {
		ids = ids.concat(clockIds[index]);
	}
	if (time.minute > 30) {
		time.hour++;
	}
	ids.push("hour" + String(time.hour%12));

	clearStyle();
	// add class to turn on the appropriate id's to display the time.
	for (var i=0; i < ids.length; i++) {
		document.getElementById(ids[i]).classList.add('word-on');
	}
}

function clearStyle() {
	let elements;

	// clear everything by removing all classes the change the word color.
	elements = document.querySelectorAll('.time');
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.remove('word-on');
	}
	elements = document.querySelectorAll('.name');
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.remove('ian-on');
	}
}

function buttonPress(e) {
	let elements;

	console.log('buttonPress' + e);
	clearStyle();

	elements = document.querySelectorAll('.name');
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.add('ian-on');
	}

	// only code within the setTimeout will be run after the timeout.
	// has to be in an anonymous function or the code will run right away.
	// code after the settimeout will run right away.
	setTimeout( () => setNewTime(getCurrentTime()), 10000);

}

function testGetMinutes() {
	// figure out a way to test that the minute ids are set correctly
}

function testGetHours() {
	// figure out a way to test that the hour id is set correctly
}

document.addEventListener('DOMContentLoaded', setNewTime(getCurrentTime()));
button.addEventListener('mouseup', buttonPress);
