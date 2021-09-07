const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
};

const getById = id => {
  return db('accounts').where('id', id).first();
};

const create = async account => {
  const stuff = await db('account').insert(account);
  console.log(stuff);
};

const updateById = (id, account) => {
  // DO YOUR MAGIC
};

const deleteById = id => {
  // DO YOUR MAGIC
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
