const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDb = require("./src/config/dbConnection");
const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
connectDb();

app.use(cors()); //CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.listen(port, () => {
  console.log(`Server Connected to PORT: ${port}`);
});
