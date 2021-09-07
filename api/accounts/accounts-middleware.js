const db = require("../../data/db-config");
const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name === undefined ||
    !budget === undefined) {
    next({
      message: 'name and budget are required',
      status: 400
    });
  } if (typeof name !== 'string') {
    next({
      message: 'name of account must be a string',
      status: 400
    });
  } if (name.trim().length < 3 ||
    name.trim().length < 100) {
    next({
      message: 'name of account must be between 3 and 100',
      status: 400
    });
  } if (typeof budget !== 'number') {
    next({
      message: 'budget of account must be a number'
    });
  } if (budget < 0 ||
    budget > 1000000) {
    next({
      message: 'budget of account is too large or too small',
      status: 400
    });
  } else {
    next();
  }
};
//???? VVVVV
exports.checkAccountNameUnique = async (req, res, next) => {
  const accName = await db('accounts').count('name', req.body.name.trim());
  if (accName > 1) {
    next({
      message: 'that name is taken',
      status: 400
    });
  } else {
    next();
  }
};

exports.checkAccountId = (req, res, next) => {
  try {
    const { id } = req.params;
    const possibleAccount = Account.getById(id);
    if (possibleAccount) {
      req.account = possibleAccount;
      next();
    } else {
      next({
        message: 'account not found',
        status: 404
      });
    }
  } catch (err) {
    next(err);
  }
};
