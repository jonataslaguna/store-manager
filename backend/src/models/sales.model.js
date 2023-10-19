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

module.exports = {
  findAll,
  findById,
};