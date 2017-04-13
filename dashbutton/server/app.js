"use strict";

const express    = require("express");
const dashButton = require("node-dash-button");
const serverEvent = require("server-event");

const app        = express();
const port       = 3000;

let count = 0;

// dang button mac address: 68:54:fd:72:f4:74
// iface
// 10 second delay before looking for another button push
// use both arp and udp protocol
let dash = dashButton("68:54:fd:72:f4:74", null, 10000, 'all');

let server = serverEvent({ express: app });

app.get("/", (req, res) => {
   res.sendFile("dash.html");
	dash.on("detected", () => {
	   console.log("Button press detected, now figure out something for me to do!");
	   count++;
	   // send event
	   server(req, res);
	   res.sse('buttonCount', `Button press #: ${count}`);
	});
});

app.listen(port, (err) => {
   if (err) {
      return console.log("Something bad happened", err);
   }
   console.log(`Server is listening on ${port}`);
});

