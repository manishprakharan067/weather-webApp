const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//  nodemon src/app.js -e js,hbs
// console.log(__dirname);
// console.log(__filename);
//console.log(path.join(__dirname, "../public"));

const app = express();

//define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //custom directory
const partialPath = path.join(__dirname, "../templates/partials");

//setup handle bars engine view location
app.set("view engine", "hbs");
app.set("views", viewsPath); //custom directory
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Manish",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "ABout Me", name: "Manish" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "Help me",
    name: "Manish",
    helpText: "This is some helpful text.",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Hello Express</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Andrew",
//       age: 27,
//     },
//     {
//       name: "Sara",
//       age: 27,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({
      error: "You must provide an address",
    });
  }
  console.log(req.query.address);
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });
    forecast(latitude, longitude, (error, data) => {
      if (error) return res.send({ error });
      //console.log("DATA::", data);
      res.send({
        forecast: data?.forecast,
        location,
        address: req.query.address,
      });
    });
    //console.log("DATA::", data);
    // if (data) {

    // }
  });
});
//app.com
//app.com/help

// app.get(/.*/, (req, res) => {
//   // res.render("404", {
//   //   title: "404",
//   //   name: "Manish",
//   //   errorMessage: "Page not found",
//   // });
//   res.send("<h1>404 Page</h1>");
// });

app.get(/^\/help\/.*/, (req, res) => {
  //res.send("<h1>Help article not found</h1>");
  res.status(404).render("404", {
    errorMessage: "Help article Not Found",
    name: "Manish",
    title: "404",
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.status(400).send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.all(/.*/, (req, res) => {
  // res.status(404).send("<h1>404 Page Not Found</h1>");
  res.status(404).render("404", {
    errorMessage: "Page Not Found",
    name: "Manish",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
