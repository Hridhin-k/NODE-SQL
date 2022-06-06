let express = require('express');
let mysql = require('mysql');
let app = express();

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'apidata1'
})

con.connect((err) => {
  if (err) throw err;
  console.log()
})
app.get('/', (req, res) => {

  res.send('THIS IS A REST API DEVELOPED BY HRIDHIN');



});

app.get('/products', (req, res) => {

  let sql = 'select * from products ';
  con.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);

  });
});
app.post('/products/add', (req, res) => {
  let product = req.query.product;
  let price = req.query.price;
  let brand = req.query.brand;
  let model = req.query.model;
  let sql = 'insert into products(product,price,brand,model)values(?,?,?,?) ';
  con.query(sql, [product, price, brand, model], (err, data) => {
    if (err) throw err;
    res.send('inserted');

  });
});

app.get('/products/:id', (req, res) => {
  let id = req.params.id;

  let sql = 'select * from products where id=? ';
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    res.json(data);

  });
});

app.put('/products/edit', (req, res) => {
  let id = req.query.id;
  let product = req.query.product;
  let price = req.query.price;
  let brand = req.query.brand;
  let model = req.query.model;
  let sql = 'update products set product=?,price=?,brand=?,model=? where id=?';
  con.query(sql, [product, price, brand, model, id], (err, data) => {
    if (err) throw err;
    res.send('updated');

  });
});
app.delete('/products/delete', (req, res) => {
  let id = req.query.id;

  let sql = 'delete from products  where id=?';
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    res.send('deleted');

  });
});


app.listen(3000, () => { console.log("server started") })