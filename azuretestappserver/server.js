const express = require("express");
const path = require("path");
const app = express();

var config = {
	API_URL: process.env.API_URL || "http://localhost/api/",
	REFRESH_INTERVAL: process.env.REFRESH_INTERVAL || "20000"
};

app.use(express.static(path.join(__dirname, "build")));

app.get("/config", function(req, res) {
	res.json(config);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

let server = app.listen(process.env.PORT || "5000", () => {
	console.log("Azure Test App UI Server Listening On Port %s", server.address().port);
	console.log("API_URL : " + config.API_URL);
	console.log("REFRESH_INTERVAL : " + config.REFRESH_INTERVAL);
	console.log("Press Ctrl+C to quit.");
});