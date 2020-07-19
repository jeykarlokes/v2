var mongoose = require("mongoose");
var userdetail_schema = mongoose.Schema(
    {
        address:String,
        phoneno:Number,

    });

module.exports = mongoose.model('UserDetail',userdetail_schema);


