const express = require("express");
const cors = require("cors");

const customerRouter = require("./routes/Customerrouter");
const productRouter = require("./routes/Productsroute");

const app = express();
app.set("port", process.env.PORT || 8060);

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   const _rootUrl = req.get("host") + req.url;
//   res.send({
//     msg: "Welcome to the API. Check the routes object ",
//     routes: {
//       contact: `${_rootUrl}contact`,
//     },
//   });
// });

app.use("/customers", customerRouter);
app.use("/products", productRouter);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
