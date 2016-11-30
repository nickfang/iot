const TIME_COLOR = "#FFFFFF";
const IAN_COLOR = "#00FF00";
const DIM_COLOR = "#222222";

function getCurrentTime(){
	var d = new Date();
	return { "hours": d.getHours(), "minutes": d.getMinutes() };
}

// Split time.
// five past, ten past, quarter past, twenty past, twenty five past, half past, twenty five to, twenty to, quarter to, ten to, five to
// It is better to think it is later than it actually is so you're more likely to be somewhere on time.
// 1-5 is five past, 6-10 is ten past, 11-15 is quarter past, etc.  0 is o'clock
function decodeTime() {
	var time = getCurrentTime();
	var minute = time.minutes;
	var hour = time.hours;

	document.getElementById("it").style.color=TIME_COLOR;
	document.getElementById("is").style.color=TIME_COLOR;
	getMinute(minute);
	if (minute > 30) {
		hour++;
	}
	getHour(hour);
}

function getMinute(minute) {
	// special case since the equation used in the switch case will put 0 in the five past case.
	var ids = [];
	var i;

	// special case so that if minutes are 0, it won't fall into case 0.
	if (minute == 0) {
		ids = ["o'clock"];
	} else {
		switch(((minute-1)/5)|0) {
			case 0:
				ids = ["min5","past"];
				break;
			case 1:
				ids = ["min10", "past"];
				break;
			case 2:
				ids = ["min15", "a", "past"];
				break;
			case 3:
				ids = ["min20", "past"];
				break;
			case 4:
				ids = ["min20", "min5", "past"];
				break;
			case 5:
				ids = ["min30", "past"];
				break;
			case 6:
				ids = ["min20", "min5", "to"];
				break;
			case 7:
				ids = ["min20", "to"];
				break;
			case 8:
				ids = ["min15", "a", "to"];
				break;
			case 9:
				ids = ["min10","to"];
				break;
			case 10:
				ids = ["min5","to"];
				break;
			case 11:
				ids = ["oclock"];
				break;
			default:
				console.log(minute + ": default - THIS IS WRONG!!!");
		}
	}
	for (var i=0; i < ids.length; i++) {
		document.getElementById(ids[i]).style.color=TIME_COLOR;
	}
}

function getHour(hour) {
		var id = "hour" + String(hour%12);
		document.getElementById(id).style.color=TIME_COLOR;
}

function clearStyle() {
	var elements;

	elements = document.querySelectorAll('.time');
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.color = DIM_COLOR;
	}
}

function testGetMinutes() {
	for (var i = 0; i < 60; i++) {
		getMinute(i);
	}
}

function testGetHours() {
	for (var i = 0; i < 24; i++) {
		getHour(i);
	}
}

function buttonPress(e) {
	var e = e || window.event;
	var btnCode;
	var elements;

	clearStyle();

	if ('object' === typeof e) {
		btnCode = e.button;

		switch(btnCode) {
			case 0:
			case 1:
			case 2:
				elements = document.querySelectorAll('.name');
				for (var i = 0; i < elements.length; i++) {
					elements[i].style.color = IAN_COLOR;
				}
				// .style.color = IAN_COLOR;
				break;
			default:
				console.log("Unexpected code: " + btnCode);
		}
	}
}

decodeTime();

// testGetMinutes();
// testGetHours();