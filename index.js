const express = require("express");
const app = express();
//require("dotenv").config({ path: "./src/config/dotenv" });
require('dotenv').config()
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const path = require("path");
const { authentication } = require('./middleware/auth')
const { dbConnection } = require("./config/config");
//const { typeError } = require('./middleware/errors')

dbConnection();

app.use(cors());
app.use(express.json());

app.use("/user", require("./route/userRoute"));
app.use("/post", require("./route/postRoute"));
app.use("/comment", require("./route/comentRoute"));

//app.use(typeError);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
