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
  const { name, email, contact, password } = req.body;
  if (!name || !email || !contact || !password)
    res.statusCode(400).send({ msg: "Not all fields have been submitted" });

  var sql = `INSERT INTO Fullstack.customers (customer_name, customer_email, customer_contact, customer_password) VALUES ('${name}', '${email}', '${contact}', '${password}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 customer registered");
    res.send({ msg: "user created" });
  });
});

// GET ALL CUSTOMERS
router.get("/", (req, res, next) => {
  var sql = `SELECT * FROM customers`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("records selected");
    res.send(result);
  });
});

// GET 1 (ID)

router.get("/:id", (req, res, next) => {
  var sql = `SELECT * FROM customers WHERE customer_id =${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record selected");
    res.send(result);
  });
});

//UPDATE CUSTOMERS

router.put("/:id", (req, res, next) => {
  const { name, email, contact, password } = req.body;
  let sql = `UPDATE customers SET `;
  if (name) sql += `customer_name=${name}`;
  if (email) sql += `customer_email=${email}`;
  if (contact) sql += `customer_contact=${contact}`;
  if (password) sql += `customer_password=${password}`;

  sql += `WHERE customer_id=${req.params.id}`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    res.send(result);
  });
});

// DELETE POSTS
router.delete("/:id", (req, res, next) => {
  var sql = `DELETE FROM customers WHERE customer_id =${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 customer deleted");
    res.send(result);
  });
});

module.exports = router;
