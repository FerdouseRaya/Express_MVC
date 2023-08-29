const express = require('express');
const app = express();
const  ProductController = require('../controller/Product');
const creatValidation = require('../middleware/validation');


app.post('/addItem',ProductController.addItem);
app.get('/get', ProductController.getAll);
app.get('/getItem',ProductController.getByID);
app.patch('/updateItem/:id',creatValidation,ProductController.updateById);
app.delete('/deleteItem/:id',ProductController.deleteById);


module.exports = app;

