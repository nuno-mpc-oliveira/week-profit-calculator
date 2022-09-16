const appFunctions = require("./functions.js");
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");

const app = express();

var PROFITS = []; // not a database, just some in-memory storage for now

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/profits", (req, res, next) => {
  res.status(200).json({ profits: PROFITS });
});

app.post("/prices", (req, res, next) => {
  const { title, price } = req.body;
  const dayPrices = JSON.parse(title);

  //Validation
  const validatePrices = appFunctions.validateNumArray(dayPrices);
  if (!validatePrices === true) {
    return res.status(422).json({
      message: validatePrices,
    });
  }

  const profitObject = appFunctions.calcProfit(dayPrices);

  const createdProduct = {
    id: uuid(),
    title: profitObject.finalReport,
    price: profitObject.finalProfit,
  };

  PROFITS.length = 0;
  PROFITS.push(createdProduct);

  res
    .status(201)
    .json({ message: "Created new product.", product: createdProduct });
});

app.listen(5000); // start Node + Express server on port 5000
