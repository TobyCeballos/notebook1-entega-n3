const mongoose = require('mongoose');

const models = require('../models/schemaUser');

const moment = require('moment');

const carts = require('./contenedorCarts');

mongoose.connect('mongodb+srv://corralon:corralontys2022@cluster0.xeyeprs.mongodb.net/Cluster0?retryWrites=true&w=majority')



class Contenedor {
    constructor(){
        this.collection = models;
    }

    async saveUser({user, email, age, avatar, phone , password, direction}){

        const newUser = {
            user: user,
            email: email,
            age: age,
            avatar: avatar,
            phone: phone,
            password: password,
            direction: direction
        }
        await carts.crearCarrito(user)

        const saves = await this.collection.insertMany(newUser)
        return saves
    };

    
    async getUser(username) {
        try {
            const obj = await this.getUsers()
            console.log(obj)
            for (const user of obj) {
                if (user.email === username){
                    return user;
                }
            }
            return false
        } catch (error) {
            console.log('ERROR ->', error);
        }
    }

    async getUsers(){
        const gets = await this.collection.find()
        return gets
    }
};


const message = new Contenedor()
module.exports = message;
