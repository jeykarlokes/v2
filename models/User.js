var mongoose = require('mongoose');
var UserDetail = require('./UserDetail');
var Order = require('./Order');
var Cart = require('./Cart');
// var cartSchema = new mongoose.Schema(
//     {
//         name:String,
//         desc:String,
//         price:Number,
//         image:String,
//         quantity:Number
//     })
var userSchema = new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email:String,
        password:Number,
        // cart:[]
        carts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Cart'
            }]
        // cart:[cartSchema],
        // orders:[exp_Schema],

        // userdetails:[
        //     {
        //         type:mongoose.Schema.Types.ObjectId,

        //         ref:'UserDetail'
        //     }],

        // orders:[
        //     {
        //         type:mongoose.Schema.Types.ObjectId,
        //         ref:'Order'
        //     }]
        
        
        
    });

module.exports = mongoose.model('User',userSchema);
