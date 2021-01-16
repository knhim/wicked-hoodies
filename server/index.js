require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

// endpoint to grab all products
app.get('/api/products', (req, res, next) => {
  const sql = `
    SELECT  "productId",
            "name",
            "price",
            "image",
            "shortDescription"
    FROM    "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(error => next(error));
});

// get endpoint to grab speicific details of a product
app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);

  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: ' "productId" must be a positive integer'
    });
  }

  const sql = `
    SELECT  "productId",
            "name",
            "price",
            "image",
            "shortDescription",
            "longDescription"
  FROM      "products"
  WHERE     "productId" = $1
  `;

  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const productDetails = result.rows[0];
      if (!productDetails) {
        next(new ClientError(`productId ${productId} does not exist`, 404));
      } else {
        res.status(200).json(productDetails);
      }
    })
    .catch(error => next(error));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});