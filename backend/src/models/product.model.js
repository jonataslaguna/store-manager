const connection = require('./connection');
const { 
  getFormattedColumnNames, 
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;
  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

  return insertId;
};

const update = async (product, productId) => {
  const columns = getFormattedUpdateColumns(product);
  const query = `UPDATE products SET ${columns} WHERE id = ?`;
  await connection.execute(query, [...Object.values(product), productId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};