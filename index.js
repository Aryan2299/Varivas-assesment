const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.json());

require("./routes/auth")(app);

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
