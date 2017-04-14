"use strict";

const dashButton = require("node-dash-button");
const path = require("path");

const port       = 3000;
var app         = require("express")();
var serverEvent = require("server-event");

let count = 0;

serverEvent = serverEvent({ express: app, retry: 3000 });

// dang button mac address: 68:54:fd:72:f4:74
// iface
// 10 second delay before looking for another button push
// use both arp and udp protocol
let dash = dashButton("68:54:fd:72:f4:74", null, 10000, 'all');

app.get("/", (req, res) => {
   serverEvent(req, res);
   res.sendFile(path.join(__dirname, "dash.html" ));
   dash.on("detected", () => {
      console.log("Button press detected, now figure out something for me to do!");
      count++;
      // send event
      res.sse('buttonCount', `Button press #: ${count}`);
   });
});

app.listen(port, (err) => {
   if (err) {
      return console.log("Something bad happened", err);
   }
   console.log(`Server is listening on ${port}`);
});
