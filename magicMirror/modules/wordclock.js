const TIME_COLOR = "#FFFFFF";
const IAN_COLOR = "#00FF00";
const DIM_COLOR = "#222222";

function getCurrentTime(){
	var d = new Date();
	return { "hour": d.getHours(), "minute": d.getMinutes() };
}

// Split time.
// five past, ten past, quarter past, twenty past, twenty five past, half past, twenty five to, twenty to, quarter to, ten to, five to
// It is better to think it is later than it actually is so you're more likely to be somewhere on time.
// 1-5 is five past, 6-10 is ten past, 11-15 is quarter past, etc.  56-0 is o'clock
function decodeTime() {
	var clockIds = {
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
	var ids = [];
	var time = getCurrentTime();
	var index = Math.floor((time.minute-1)/5);

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

	// set the appropriate id's to display the time.
	for (var i=0; i < ids.length; i++) {
		document.getElementById(ids[i]).style.color=TIME_COLOR;
	}
}

function clearStyle() {
	var elements;

	elements = document.querySelectorAll('.time');
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.color = DIM_COLOR;
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

function testGetMinutes() {
	// figure out a way to test that the minute ids are set correctly
}

function testGetHours() {
	// figure out a way to test that the hour id is set correctly
}

decodeTime();