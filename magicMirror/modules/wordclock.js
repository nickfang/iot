const TIME_COLOR = "#000000";

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
	if (minute == 0) {
		console.log(minute + ": o'clock");
		return;
	}
	switch(((minute-1)/5)|0) {
		case 0:
			console.log(minute + ": five past ");
			ids = ["min5","past"];
			break;
		case 1:
			console.log(minute + ": ten past ");
			ids = ["min10", "past"];
			break;
		case 2:
			console.log(minute + ": quarter past ");
			ids = ["min15", "ian_a", "past"];
			break;
		case 3:
			console.log(minute + ": twenty past ");
			ids = ["min20", "past"];
			break;
		case 4:
			console.log(minute + ": twenty-five past ");
			ids = ["min20", "min5", "past"];
			break;
		case 5:
			console.log(minute + ": half past ");
			ids = ["min30", "past"];
			break;
		case 6:
			console.log(minute + ": twenty-five to ");
			ids = ["min20", "min5", "to"];
			break;
		case 7:
			console.log(minute + ": twenty to ");
			ids = ["min20", "to"];
			break;
		case 8:
			console.log(minute + ": quarter to ");
			ids = ["min15", "to"];
			break;
		case 9:
			console.log(minute + ": ten to ");
			ids = ["min10","to"];
			break;
		case 10:
			console.log(minute + ": five to ");
			ids = ["min5","to"];
			break;
		case 11:
			console.log(minute + ": o'clock");
			ids = ["oclock"];
			break;
		default:
			console.log(minute + ": default - THIS IS WRONG!!!");
	}
	for (var i=0; i < ids.length; i++) {
		console.log(ids);
		document.getElementById(ids[i]).style.color=TIME_COLOR;
	}
}

function getHour(hour) {
		var id = "hour" + String(hour%12);
		console.log(id);
		document.getElementById(id).style.color=TIME_COLOR;
		// switch (hour % 12) {
		// 	case 0:
		// 		console.log("twelve");
		// 		document.getElementById("twelve").style.color="black";
		// 		break;
		// 	case 1:
		// 		console.log("one");
		// 		document.getElementById("one").style.color="#000000";
		// 		break;
		// 	case 2:
		// 		console.log("two");
		// 		break;
		// 	case 3:
		// 		console.log("three");
		// 		break;
		// 	case 4:
		// 		console.log("four");
		// 		break;
		// 	case 5:
		// 		console.log("five");
		// 		break;
		// 	case 6:
		// 		console.log("six");
		// 		break;
		// 	case 7:
		// 		console.log("seven");
		// 		break;
		// 	case 8:
		// 		console.log("eight");
		// 		break;
		// 	case 9:
		// 		console.log("nine");
		// 		break;
		// 	case 10:
		// 		console.log("ten");
		// 		break;
		// 	case 11:
		// 		console.log("eleven");
		// 		break;
		// 	default:
		// 		console.log("getHour() - default - THIS IS WRONG!!!")
		// }
}

function clearStyle() {
	document.getElementById("one").removeAttribute("style");
}

function testGetMinutes() {
	for (var i = 0; i < 60; i++) {
		// console.log(i + ": ");
		getMinute(i);
	}
}

function testGetHours() {
	for (var i = 0; i < 24; i++) {
		getHour(i);
	}
}

// var time = getCurrentTime();
// console.log(time.hours);
// console.log(time.minutes);

// clearStyle();
decodeTime();
testGetMinutes();
testGetHours();
// testGetMinutes();