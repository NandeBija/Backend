const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "lifechoices",
  password: "@Lifechoices1234",
  database: "Fullstack",
});

// CUSTOMER REGISTRATION
router.post("/", async (req, res) => {
  const { name, image, price, size, about } = req.body;
  if (!name || !image || !price || !size || !about)
    res.statusCode(400).send({ msg: "Not all fields have been submitted" });

  var sql = `INSERT INTO Fullstack.products (product_name, product_image, product_price, product_size, product_about) VALUES ('${name}', '${image}', '${price}', '${size}', '${about}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 product registered");
    res.send({ msg: "product added" });
  });
});
// GET ALL PRODUCTS
router.get("/", (req, res, next) => {
  var sql = `SELECT * FROM products`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("records selected");
    res.send(result);
  });
});

// GET 1 PRODUCT BY (ID)

router.get("/:id", (req, res, next) => {
  var sql = `SELECT * FROM products WHERE product_id =${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record selected");
    res.send(result);
  });
});

//UPDATE PRODUCTS

router.put("/:id", (req, res, next) => {
  const { name, image, price, size, about } = req.body;
  let sql = `UPDATE products SET `;
  if (name) sql += `product_name=${name}`;
  if (image) sql += `product_image=${image}`;
  if (price) sql += `product_price=${price}`;
  if (size) sql += `product_size=${size}`;
  if (about) sql += `product_about=${about}`;

  sql += `WHERE product_id=${req.params.id}`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 product updated");
    res.send(result);
  });
});

// DELETE PRODUCT
router.delete("/:id", (req, res, next) => {
  var sql = `DELETE FROM products WHERE product_id =${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 product deleted");
    res.send(result);
  });
});

module.exports = router;
