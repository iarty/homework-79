const express = require("express");
const app = express();
const { PORT } = require("./config");
const mysqlDb = require("./db");

app.use(express.json());
app.use(express.static("public"));
app.use("/", require("./routes/categories"));
app.use("/", require("./routes/accountingSubject"));
app.use("/", require("./routes/locations"));

const start = async () => {
  try {
    await mysqlDb.connect();

    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.on("exit", () => {
      mysqlDb.disconnect();
    });
  }
};

start();
