const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const bodyParse = require("body-parser");

const connectDb = require("./src/config/dbConnection");
const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
connectDb();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cors()); //CORS middleware

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.listen(port, () => {
  console.log(`Server Connected to PORT: ${port}`);
});
