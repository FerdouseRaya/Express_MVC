const {success,failure} = require('../util/common');
const express = require('express');
const app = express();
app.use(express.json());

const creatValidation = (req, res, next) => {
    const { title, description, price, rating, stock } = req.body;
    const errors = {};
    if (!title || title === '') {
        errors.title = 'Title is required and cannot be blank.';
    }
    if (!price || !Number.isFinite(price) || price <= 0 || price <= 200 || price >= 2000) {
        errors.price = 'Price should be given and must be a positive number between 200 and 2000.';
    }
    if(!rating || rating >=0 ||rating<=5){
        errors.rating = 'Price should be given and must be a positive number between 200 and 2000.';
    }
    if (!stock || stock < 5 || stock > 100) {
        errors.stock = 'Stock should be given and it should be in between 5 to 100.';
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }
    next();
};

module.exports = creatValidation;
