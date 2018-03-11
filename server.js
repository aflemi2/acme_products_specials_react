const express = require('express');
const path = require('path');
const app = express();
const { sync, seed, models} = require('./db');
const { Product } = models;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use((req, res, next)=>{
  Product.findAll({where: { isSpecial: true}})
  .then(specials=>{res.locals.specialCount = specials.length;
  next();
  })
  .catch(next);
});

app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/api/products', (req, res, next)=>{
  Product.findAll()
  .then(products=>res.send(products))
  .catch(next);
});
app.put('/api/products/:id', (req, res, next)=>{
  Product.findById(req.params.id)
  .then(product=>res.send(product))
  .catch(next);
});

app.use((err, req, res, next)=>{
  res.status(500).send({error: err});
});

const port = process.env.PORT || 9000;
app.listen( port, ()=>console.log(`Listening on port ${port}`));

sync()
.then(()=>seed());
