const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT 
     s.id as saleId, 
     s.date as date, 
     sp.product_id as productId,
     sp.quantity as quantity 
     FROM sales s 
     JOIN sales_products sp 
     ON s.id = sp.sale_id`,
  );
  return sales;
};

const findById = async (saleId) => {
  const [sales] = await connection.execute(
    `SELECT s.date,
     sp.product_id as productId,
     sp.quantity FROM sales s
     JOIN sales_products sp 
     ON s.id = sp.sale_id WHERE s.id = ?`,
    [saleId],
  );
  return sales;
};

const insert = async (sale) => {
  const saleQuery = 'INSERT INTO sales (date) VALUES (NOW())';
  const [{ insertId: saleId }] = await connection.execute(saleQuery);

  sale.forEach(async (item) => {
    const { productId, quantity } = item;
    const productQuery = `INSERT INTO 
    sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    await connection.execute(productQuery, [saleId, productId, quantity]);
  });

  return saleId;
};

const remove = async (saleId) => {
  const deleteSalesProductsQuery = 'DELETE FROM sales_products WHERE sale_id = ?';
  await connection.execute(deleteSalesProductsQuery, [saleId]);

  const deleteSaleQuery = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(deleteSaleQuery, [saleId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
};
