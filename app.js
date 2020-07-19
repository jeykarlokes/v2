var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Item = require('./models/Item');
var Order = require('./models/Order');
var Master_User = require("./models/User");
var Fashion_items = require("./sample-items.js");
var Cart  = require('./models/Cart');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27018/Shop_v2', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine','ejs');


app.get('/register', function(req, res) {
    res.render('Register');
})

app.get('/tem',function(req,res)
{
    res.render('Product')
})

app.get('/seed/item',function (req,res)
{
    res.render('S_item');
})

app.post('/seed/item',function (req,res)
{
    Item.create(Fashion_items,function (err,item)
    {
        if (err)
        {
            console.log(err)
        }
        else{
            res.send("SuccessFully Seeded in to DB ");
        }
    })

})






app.get('/fashions',function (req,res)
{
    Item.find({},function (err,item)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.render('Fashion',{items:item})
        }
    })
})



app.get('/fashions/add-to-cart/:id',function (req,res)
{
    var id = req.params.id;
    Master_User.find(
        {firstName:'ask'},function (err,foundUser)
        {
        if(err)
        {
            console.log(err);
        }
        else
        {
            Item.findById(id,"name price desc image" ,function (err, foundItem)
            {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    Cart.create({
                            name:foundItem.name,
                            price:foundItem.price,
                            desc:foundItem.desc
                            // image:foundItem.image
                    },function (err,cart)
                    {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        foundUser[0].carts.push(cart)
                        foundUser[0].save(function (err,data)
                        {
                        if(err)
                        {
                            console.log(err)
                        }
                        else
                        {

                            console.log("the final",data)
                        }
                     })
                    }
                })
                }

            })
        }
    })
})

app.get('/showuser',function(req,res)
{
    Master_User.find({},function(err,user)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('ShowUser',{User:user});
        }
    })
})

app.post('/register',function(req,res)
{
    Master_User.create({firstName:req.body.Fname,
    lastName:req.body.Lname,
    email:req.body.Email,
    password:req.body.Pwd
    },function(err,User)
    {
        if(err){console.log(err);}
        else{
            console.log('user added',User)
            res.redirect('/showuser');
        }
    })

});

app.get('/', function(req, res) {
    // https://ab23c15c9b5a46b89ee8e9b3e1a212c5.vfs.cloud9.us-east-1.amazonaws.com/
    res.render('landing.ejs');
})

app.get('/login', function(req, res) {
    res.render('Logins.ejs');
});

app.get('/admin',function(req,res)
{
    res.render('Admin.ejs');
})

app.get('/products/e-devices',function(req,res)
{
    res.render('Edevice');
});


app.get('/products/books',function(req,res)
{
    res.render('Book');
});

app.get('/products/entertainments',function(req,res)
{
    res.render('Entertainment');
});


app.get('/products/fashions',function(req,res)
{
    res.render('Fashion');
});



var items = [{
        name: 'E-devices',
        image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Fashions',
        image: 'https://images.unsplash.com/3/www.madebyvadim.com.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Books',
        image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
        name:'Entertainment',
        image:'https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
    },
    {
        name:'Entertainment',
        image:'https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
    }
];


app.get('/home', function(req, res) {
    res.render('home.ejs', { products: items });
})

app.listen(process.env.PORT, process.env.IP, function ()
{
    console.log('server started SuccessFully !!');

});
