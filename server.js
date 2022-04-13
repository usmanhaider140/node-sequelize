const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Drop and Resync with { force: true }");
  })
  .catch((err) => {
    console.log(err);
  });
const corsOptions = {
  url: "http://localhost:3001",
};

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.json("Welcome to the server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
