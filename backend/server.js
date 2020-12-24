const express = require(`express`);
const cors = require(`cors`);
const path = require(`path`);
const mongoose = require(`mongoose`);

const menusRoutes = require(`./routes/menus.routes`);
const pagesRoutes = require(`./routes/pages.routes`);
const productsRoutes = require(`./routes/products.routes`);
const utilsRoutes = require(`./routes/utils.routes`);
const ordersRoutes = require(`./routes/orders.routes`);
const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `../build`)));
// app.use(express.static(path.join(__dirname, `../public`)));

/* API ENDPOINTS */
app.use(`/api`, menusRoutes);
app.use(`/api`, pagesRoutes);
app.use(`/api`, productsRoutes);
app.use(`/api`, utilsRoutes);
app.use(`/api`, ordersRoutes);

/* REACT WEBSITE */
app.use(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `../build/index.html`));
});

/* API ERROR PAGES */
app.use(`/api`, (req, res) => {
  res.status(404).send({ data: `Not found...` });
});

/* MONGOOSE */

// `

const dbURI =
  process.env.NODE_ENV === `production`
    ? `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.q4foz.mongodb.net/cookieGoDB?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/cookieGoDB`;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once(`open`, () => {
  console.log(`Successfully connected to the database`);
});
db.on(`error`, (err) => console.log(`Error: ${err}`));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// module.exports = { server, dbURI};
