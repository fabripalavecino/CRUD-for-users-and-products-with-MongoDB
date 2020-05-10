const express = require("express");

const { info, error } = require("./modules/my-log");

const routes = require("./routes/routes");

const app = express();

routes(app);

app.listen(4000, () => {
  //console.log("Running on port 4000");
});
