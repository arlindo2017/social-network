const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

//Set Port
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to database
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Social Media API server running on port ${PORT}!`);
  });
});
