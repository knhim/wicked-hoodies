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

// get endpoint to grab specific details of a product
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

// GET endpoint for /api/cart

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.status(200).json([]);
  } else {

    const cartId = req.session.cartId;
    const sql = `
       SELECT     "c"."cartItemId",
                  "c"."price",
                  "p"."productId",
                  "p"."image",
                  "p"."name",
                  "p"."shortDescription"
        FROM   "cartItems" as "c"
        JOIN   "products" as "p" using ("productId")
        WHERE  "c"."cartId" = $1
    `;
    const params = [cartId];

    db.query(sql, params)
      .then(result => res.status(200).json(result.rows))
      .catch(error => next(error));
  }
});

// POST endpoint for /api/cart
app.post('/api/cart/', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);

  if (productId <= 0 || !Number.isInteger(productId)) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  const sql = `
    SELECT  "price"
    FROM    "products"
    WHERE   "productId" = $1
  `;

  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const price = result.rows[0].price;
      if (!result.rows[0]) {
        throw (new ClientError(`product ${productId} does not exist`, 400));
      }

      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: price
        };
      }

      const sql = `
      INSERT INTO   "carts" ("cartId", "createdAt")
      VALUES        (default, default)
      RETURNING     "cartId"
      `;

      return db.query(sql)
        .then(result => {
          const cartId = result.rows[0].cartId;
          return {
            cartId: cartId,
            price: price
          };
        });
    })
    .then(result => {
      const { cartId, price } = result;
      req.session.cartId = cartId;

      const sql = `
      INSERT INTO "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"
      `;

      const params = [cartId, productId, price];
      return db.query(sql, params)
        .then(result => {
          const { cartItemId } = result.rows[0];
          return {
            cartItemId: cartItemId
          };
        });
    })
    .then(result => {
      const { cartItemId } = result;
      const sql = `
        SELECT    "c"."cartItemId",
                  "c"."price",
                  "p"."productId",
                  "p"."image",
                  "p"."name",
                  "p"."shortDescription"
        FROM   "cartItems" as "c"
        JOIN   "products" as "p" using ("productId")
        WHERE  "c"."cartItemId" = $1
      `;

      const params = [cartItemId];

      return db.query(sql, params)
        .then(result => {
          const { cartItemId, price, productId, image, name, shortDescription } = result.rows[0];
          res.status(201).json({
            cartItemId: cartItemId,
            price: price,
            productId: productId,
            image: image,
            name: name,
            shortDescription: shortDescription
          });
        });
    })
    .catch(err => {
      next(err);
    });

});

app.post('/api/orders', (req, res, next) => {
  const { name, creditCard, shippingAddress } = req.body;
  const cartId = req.session.cartId;

  if (!cartId) {
    res.status(400).json({ error: 'The cartId does not exist' });
  }

  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    res.status(400).json({ error: 'Name, creditCard, and shippingAddress fields are required' });
  }

  const sql = `
    INSERT INTO "orders" ("cartId","name", "creditCard", "shippingAddress")
    VALUES ($1, $2, $3, $4)
    RETURNING "createdAt", "creditCard", "name", "orderId", "shippingAddress"
  `;
  const params = [cartId, name, creditCard, shippingAddress];

  db.query(sql, params)
    .then(result => {
      req.session.destroy();
      res.status(201).json(result.rows[0]);
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
