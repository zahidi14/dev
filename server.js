require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
// MongoDB
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/rent', {
    useNewUrlParser: true
});



// Express
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/availability", require("./routes/availabilityRoute"));
app.use("/reserve", require("./routes/reservationRoute"));

/* db.on("error", console.error.bind(console, "connection error:"));
db.once("open", _ => {
  console.log("Connected to DB");
});
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
  });
}

app.listen(PORT, () => {
  log(`Server is starting at PORT: ${PORT}`);
});

module.exports = app;
