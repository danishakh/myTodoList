const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const logger = require("morgan");
const cors = require('cors');
// const keys = require("./keys.js");
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up a whitelist and check against it:
// var whitelist = ['http://localhost:3001/api/'];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// Then pass them to cors:
// app.use(cors(corsOptions));

// Enable CORS by using it before your routes. This will allow axios to trigger API calls to server port (from a diff port 3000 -> 3001) 
app.use(cors());

// Add routes
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

//Connect to MongoDB
mongoose.connect(
	process.env.MONGODB_URL || `mongodb://${MONGO_USER}:${MONGO_PASS}@ds151805.mlab.com:51805/heroku_9wntptf6`,
	{ useNewUrlParser: true }
)
// mongoose.connect(
// 	process.env.MONGODB_URI || "mongodb://localhost/mytodolist",
// 	{ useNewUrlParser: true }
// );

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDB Connection Established");
});



// Define any API routes before this runs

// Serve up static assets if node env is production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static("client/build"));
	
	// Send every request to the React app (directing the /client/build/index.html file for every request that's not an API request)
	app.get("*", function(req, res) {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	  });
}




// Start API Server
app.listen(PORT, () => {
	console.log(`🌎  ==> API Server now listening on PORT ${ PORT }`);
});