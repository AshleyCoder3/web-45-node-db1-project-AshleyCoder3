const router = require('express').Router();
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require("./accounts-middleware");
const Account = require('./accounts-model');


router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  res.json(req.account);
});

router.post('/',
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    try {
      res.json('post accounts');
    } catch (err) {
      next(err);
    }
  });

router.put('/:id',
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    try {
      res.json('update accounts by id');
    } catch (err) {
      next(err);
    }
  });

router.delete('/:id', checkAccountId, (req, res, next) => {
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
