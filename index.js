const express = require("express");
require("./services/passport");

const app = express();

app.use(express.json());

require("./routes/auth")(app);

app // clientSecret: CEdMDOBlK3AiPwrozbHDKHJV // clientID:  473512430308-27u7jb451qon910o9ptskmfhksvobf51.apps.googleusercontent.com
  .listen(8080, () => {
    console.log("Listening on port 8080...");
  });
