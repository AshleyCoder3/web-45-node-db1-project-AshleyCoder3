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
    res.json('get accounts by id');
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    res.json('post accounts');
  } catch (err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    res.json('update accounts by id');
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.json('delete accounts by id');
  } catch (err) {
    next(err);
  }
});

//***********************500 error middleware***********//
//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    devMessage: 'Something bad inside the account router!'
  });
});

module.exports = router;
