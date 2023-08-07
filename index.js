const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const bodyParse = require("body-parser");

const connectDb = require("./src/config/dbConnection");
const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const cartRoute = require("./src/routes/cartRoute");
connectDb();

app.use(cors()); //CORS middleware
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server Connected to PORT: ${port}`);
});
