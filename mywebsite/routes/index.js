var express = require("express");
var router = express.Router();
const date = require(__dirname + "/date.js");
 
const num = date.getNum();
const month = date.getMonth();
const day = date.getDay();

let datee = num+ ' '+month+ ' / '+ day

const dbCustomers = {};

var dbOrders = {};

var isTrue = true;

var userName = "";

let orders = [];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { page: "Home", menuId: "home" });
});

router.get("/about", function(req, res, next) {
  res.render("about", { page: "About Us", menuId: "about" });
});

router.get("/signup", function(req, res, next) {
  res.render("signup", { page: "Sign up", menuId: "signup" });
});
router.get("/products", function(req, res, next) {
  res.render("products", { page: "Products", menuId: "products" });
});

router.get("/contact", function(req, res, next) {
  res.render("contact", { page: "Contact", menuId: "contact" });
});



router.get("/customers", function(req, res, next) {
  var keys = Object.keys(dbCustomers);
  res.render("customers", {
    page: "Our Customers",
    menuId: "customers",
    customers: keys
  });
});

// -------------------------------------------- Log In Post --------------------------------------------
router.post("/", function(req, res) {
  var name = req.body.inputName;
  var email = req.body.inputEmail;
  var pass = req.body.inputPassword;

  const dbNames = Object.keys(dbCustomers);
  var result = "";

  for (let i = 0; i < dbNames.length; i++) {
    var dbName = dbNames[i];

    if (
      dbName === name &&
      dbCustomers[dbName]["email"] === email &&
      dbCustomers[dbName]["password"] === pass
    ) {
      userName = name;
      result = "1";
      res.redirect("/my-account");
    }
  }
  if (result === "") {
    isTrue = false;
    res.redirect("/");
  }
});

// -------------------------------------------- Sign Up Post --------------------------------------------
router.post("/signup", function(req, res) {
  var name = req.body.inputName;
  let email = req.body.inputEmail;
  let password = req.body.inputPassword;
  let phone = req.body.inputPhone;
  let adres = req.body.inputAdres;

  dbCustomers[name] = {
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
    phone: `${phone}`,
    adres: `${adres}`
  };
  userName = name;

  res.redirect("/my-account");
});

// -------------------------------------------- My Account Get --------------------------------------------
router.get("/my-account", function(req, res, next) {

  var keys = Object.keys(dbCustomers);
  
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === userName) {
     
      if (Object.keys(dbOrders).length === 0) {
        res.render("my-account", {
          page: "My Account",
          menuId: "my-account",
          orders: orders,

          companyName: userName,
          phone: dbCustomers[userName]["phone"],
          email: dbCustomers[userName]["email"],
          password: dbCustomers[userName]["password"],
          adres: dbCustomers[userName]["adres"]
        });
        
      } else {
        res.render("my-account", {
          page: "My Account",
          menuId: "my-account",
          orders: orders,

          companyName: userName,
          phone: dbCustomers[userName]["phone"],
          email: dbCustomers[userName]["email"],
          password: dbCustomers[userName]["password"],
          adres: dbCustomers[userName]["adres"],

          orders: dbOrders

          
        });
        
      }
    }
  }
});
// -------------------------------------------- AddOrder Post --------------------------------------------
router.post("/add-order", function(req, res) {


  let companyName = req.body.companyName;
  let productName = req.body.productName;
  let productCode = req.body.productCode;
  let piece = req.body.piece;
  let date = datee;
  let amount = piece * 300;

  if (Object.keys(dbOrders).length === 0) {
    let a = 1;
    dbOrders[userName] = {};

    dbOrders[userName][a] = {
      "productName": `${productName}`,
      "productCode": `${productCode}`,
      "piece": `${piece}`,
      "date": `${date}`,
      "amount": `${amount}`
    };
  } else {
    var a = Object.keys(dbOrders[userName]).length;
    
    dbOrders[userName][a+1] = {
      "productName": `${productName}`,
      "productCode": `${productCode}`,
      "piece": `${piece}`,
      "date": `${date}`,
      "amount": `${amount}`
    };
  }

  // console.log('Orders:',dbOrders);

  res.redirect("/my-account");
});
// -------------------------------------------- Del Order Delete --------------------------------------------
router.post("/del-order", function(req, res) {
  
  let orderNo = req.body.orderNo;
 
  delete dbOrders[userName][orderNo]
  

  // console.log(dbOrders);

  res.redirect("/my-account");
});
module.exports = router;
