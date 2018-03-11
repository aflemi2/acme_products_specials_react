const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_product_special_db');

const Product = conn.define('product', {
  name: Sequelize.STRING,
  isSpecial: Sequelize.BOOLEAN
}
)

const sync = ()=>{
  return conn.sync({ force:true });
};

const seed = ()=>{
  return Promise.all([
    Product.create({ name: 'apples', isSpecial: false}),
    Product.create({ name: 'oranges', isSpecial: false}),
    Product.create({ name: 'pears', isSpecial: false}),
  ]);
};

module.exports = {
  sync,
  seed,
  models: {
  Product
  }
}
