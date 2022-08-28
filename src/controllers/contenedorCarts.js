const mongoose = require('mongoose');

const models = require('../models/schemaCarts');

const moment = require('moment');

const container = require('./contenedorProd.js')

mongoose.connect('mongodb+srv://corralon:corralontys2022@cluster0.xeyeprs.mongodb.net/Cluster0?retryWrites=true&w=majority')


class Carts {
    constructor() {
        this.collection = models;
    }

    async getAllCarts() {
        try{
            const obj = await this.collection.find()
            return obj
        }
        catch(err){
            return error;
        }
    }

    async crearCarrito(nameId){
        try{

            const newCarrito ={
                id: nameId,
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                productos:[]
            }

            const add = await this.collection.insertMany(newCarrito)

            console.log(`Carrito creado exitosamente`);

            return add;

        }
        catch(err){
            console.log(`${err} Error en la funcion crearCarrito`);
        }
    }

//    async deleteCartByID(id) {
//        try {
//            const deleteCart = await this.collection.doc(id).delete();
//            return `Carrito ${id} eliminado`;
//        } catch (error) {
//            return error;
//        }
//    }

    async getCartById(id) {
        try{
            const elemento = await this.collection.find({id: id}, {_id:0, __v:0})

            return elemento 
        } catch(err){
            return err;
        }
    }


    async getByIdProds(id) {
        try{
            const query = await this.collection.doc(id.toString()).collection('prod').get();
            let fileExist = query.docs;

            if(fileExist.length >= 0){
                let objs = fileExist.map(doc =>({
                    id: doc.id,
                    ...doc.data()
                }))
                return objs
            }else{
                console.log("No se encontraron productos")
            }
        } catch(err){
            return err;
        }
    }

    async saveProdId(id_carrito, id_prod){
        try{
            const producto = await container.getProdById(id_prod);
            const Obj = producto.keys(producto)
            for(let i=0; i< Obj.length; i++){
                console.log(Obj[i]);
              }

            const agregado = await this.collection.updateOne( {id: id_carrito}, {$push: {productos: {/*name: name, price: price, */id: id_prod/*, thumbnail: thumbnail*/}} } );
            return agregado;

        }
        catch(err){
            console.log(`${err} Error en la funcion prodAlCarrito`)
        }
    }

    async deleteProdById(id_carrito, id_prod){
        try{

            const producto = await container.getProdById(id_prod);

            const string = [];

            const hecho = await this.coleccion.updateOne( {id_carrito}, {$pull: {productos: string} } );
            return hecho;
        }
        catch(err){
            console.log(`${err} Error en la funcion deleteProdDeCarrito`)
        }
    }
}

const carts = new Carts();

module.exports = carts