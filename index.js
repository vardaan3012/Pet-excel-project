const express = require("express");
const app = express();

app.use("/", require("./routes/index"));

app.listen(process.env.PORT || 4000, () => {
    console.log("Started on Port 4000");
})