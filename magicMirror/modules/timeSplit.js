

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
	var minute = time.mimutes;
	var hour = time.hours;

	if (time.minutes == 0) {
		decodeHours();
		console.log(" o'clock");
		return;
	}

	getMinutes(minute);
	if (minutes > 30) {
		hour++;
	}
	getHour(hour);

}

function getMinute(minute) {
	// special case since the equation used in the switch case will put 0 in the five past case.
	if (minute == 0) {
		console.log(minute + ": o'clock");
		return;
	}
	switch(((minute-1)/5)|0) {
		case 0:
			console.log(minute + ": five past ");
			break;
		case 1:
			console.log(minute + ": ten past ");
			break;
		case 2:
			console.log(minute + ": quarter past ");
			break;
		case 3:
			console.log(minute + ": twenty past ");
			break;
		case 4:
			console.log(minute + ": twenty-five past ");
			break;
		case 5:
			console.log(minute + ": half past ");
			break;
		case 6:
			console.log(minute + ": twenty-five to ");
			break;
		case 7:
			console.log(minute + ": twenty to ");
			break;
		case 8:
			console.log(minute + ": quarter to ");
			break;
		case 9:
			console.log(minute + ": ten to ");
			break;
		case 10:
			console.log(minute + ": five to ");
			break;
		case 11:
			console.log(minute + ": o'clock");
			break;
		default:
			console.log(minute + ": default - THIS IS WRONG!!!");
	}

}

function getHour(hour) {
		switch (hour % 12) {
			case 0:
				console.log("twelve");
				break;
			case 1:
				console.log("one");
				break;
			case 2:
				console.log("two");
				break;
			case 3:
				console.log("three");
				break;
			case 4:
				console.log("four");
				break;
			case 5:
				console.log("five");
				break;
			case 6:
				console.log("six");
				break;
			case 7:
				console.log("seven");
				break;
			case 8:
				console.log("eight");
				break;
			case 9:
				console.log("nine");
				break;
			case 10:
				console.log("ten");
				break;
			case 11:
				console.log("eleven");
				break;
			default:

		}
}

function testGetMinutes() {
	for (i = 0; i < 60; i++) {
		// console.log(i + ": ");
		getMinute(i);
	}
}

var time = getCurrentTime();
console.log(time.hours);
console.log(time.minutes);

// decodeTime();
testGetMinutes();

