const express = require('express');
const { checkAccountId } = require("./accounts-middleware");
const Account = require('./accounts-model');
const router = express.Router();

router.get('/', (req, res, next) => {
  Account.getAll(req.query)
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(next);
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }

  //res.json(req.account);
});

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
});

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
});

//***********************500 error middleware***********//
//eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err.message); // delete after
  res.status(err.status || 500).json({
    message: err.message,
    devMessage: 'Something bad inside the account router!'
  });
});

module.exports = router;
