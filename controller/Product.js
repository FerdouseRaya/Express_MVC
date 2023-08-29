const path = require('path');
const fs = require ('fs');
const ProductModel = require('../model/Product');
const {success,failure} =require('../util/common');
const logFilePath = path.join(__dirname, 'server', 'log.txt');
class Product{
    //getAll
    async getAll(req,res){
        try {
            const products = await ProductModel.getAll();
            return res.status(200).send(success("Successfully received all products", products));
          } catch (error) {
            return res.status(500).send(failure("Internal server error"));
          }
    }

    //get By id

    async getByID(req,res){
        const {id} =req.query;
        if(id){
            const itemResult = await ProductModel.getItemById(id);
            if(itemResult.success){
                return res.status(200).send(success('Item fetched by id Successfully!', itemResult));
            }
            else{
                return res.status(400).send(failure('Item not found!'));
            }
        }
        else{
            return res.status(400).send(failure('ID parameter is required.'));
        }
    
    }
    //delete By Id

    async deleteById(req,res){
        const{id} =req.params;
        try{
             const deleteItemResult = await ProductModel.deleteById(id);
            if(deleteItemResult.success){
                return res.status(200).send(success('Item deleted Successfully',deleteItemResult));
            }
            else{
                return res.status(400).send(failure('Item not found!'));
            }
        }
        catch(error){
                return res.status(500).send(failure('Server error...'));
        }
    }
    
    //add Item
    async addItem(req,res){
        try {
            const addItemResult = await ProductModel.addItem(req.body);
            if (addItemResult.success) {
                const item = req.body;
                return res.status(200).send(success('Great! Item Added!', item));
            } else {
                return res.status(400).send(failure(addItemResult.errors));
            }
    
        } catch (error) {
            return res.status(500).send(failure('Server error'));
        }
    }


    //update By Id
    async updateById(req,res){        
        const { id } = req.params;
        const updatedItemResult = await ProductModel.updateById(id, req.body);
    
        if (updatedItemResult.success) {    
            return res.status(200).send(success('Item updated successfully!'));
    
        } else {
            if (updatedItemResult.errors && updatedItemResult.errors.length > 0) {
                return res.status(400).send(failure(updatedItemResult.errors));
             } else {
                 return res.status(404).send(failure('Item not found!')); 
            }
        }
    }





    

}

module.exports = new Product();