var express = require('express');
var pgp = require('pg-promise')();
// var db = pgp(process.env.DATABASE_URL);
var db = pgp('postgres://qzwdfalyaqhdjf:f202bed3f53d1dc03b523853492dbfc397e1208f83d2e775b45f46c9652fe5bd@ec2-54-243-147-162.compute-1.amazonaws.com:5432/d70ueqr41e79i9?ssl=true');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
var moment = require('moment');
moment().format();




// app.use(express.static('static'));
app.set('view engine','ejs');
app.get('/', function(req, res) {
    res.render('pages/index');
});
app.get('/about', function(req, res) {
    var name = 'Supavadi Manasuwan'
    var hobbies = ['music','movie','programing']
    var bdate = '27/03/1997';
    res.render('pages/about',{fullname : name,hobbies : hobbies,Birthday : bdate});
});
// Display all products
app.get('/products/:pid', function(req, res) {
    var pid = req.params.pid;
    var time = moment().format();
       
        
    var sql = 'select* from products where product_id ='+pid+'order by product_id ASC';
    db.any(sql)
    .then(function(data){
        console.log('DATA:'+data);
        res.render('pages/products_edit',{product: data[0],time: time})
        
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })
    
    });



//Display all products
app.get('/products', function(req, res) {
    var id = req.params.id;
    var sql='select* from products';
        if(id){
            sql += ' where product_id ='+id +' order by product_id ASC';
        }
   db.any(sql+' order by product_id ASC')
    .then(function(data){
        console.log('DATA:'+data);
        res.render('pages/products',{products: data})
        
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })

});

// Display all user
app.get('/users/:id', function(req, res) {
    var id=req.param('id');
    var time = moment().format();
    var sql = 'select * from users ';
    if(id){
        sql+=' where user_id ='+id;
    }
    db.any(sql)
    .then(function(data){
    console.log('DATA:'+data);
    res.render('pages/user_edit',{ user: data[0],time:time})

    })
    .catch(function(error){
        console.log('ERROR:'+error)
    })});

 // Display all user
 app.get('/users', function(req, res) {
    var user_id = req.params.user_id;
    var sql = 'select * from users';
    if(user_id){
        sql += ' where user_id ='+ user_id +' order by user_id ASC';
    }
  
   db.any(sql +' order by user_id ASC')
      .then(function(data){
          console.log('DATA:'+ data);
          res.render('pages/users',{users : data})
  
      })
      .catch(function(error){
          console.log('ERROR:'+ error);
  
      })
  });


//delete products
app.get('/product_delete/:pid',function (req, res) {
    var id = req.params.pid;
    var sql = 'DELETE FROM products';
    if (id){
            sql += ' where product_id ='+ id;
    }
    db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.redirect('/products')
            
        })
        .catch(function(data){
                console.log('ERROR:'+console.error);
                
    })
 });


 //delete users
app.get('/user_delete/:pid',function (req, res) {
    var id = req.params.pid;
    var sql = 'DELETE FROM users';
    if (id){
            sql += ' where user_id ='+ id;
    }
    db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.redirect('/users')
            
        })
        .catch(function(data){
                console.log('ERROR:'+console.error);
                
    })
 });






//add Product
app.get('/insert_product',function (req, res) {
    var time = moment().format();
    res.render('pages/insert_product', { time: time}); 
})
app.post('/products/insert_product', function (req, res) {
  
    var title = req.body.title;
    var price = req.body.price;
    var time = req.body.time;
    var sql = `INSERT INTO "public"."products" (title,price,created_at) VALUES('${title}','${price}','${time}');`;
    
    //db.none
    console.log('UPDATE:' + sql);
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/products')
        })

        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});
//add user
app.get('/insert_user',function (req, res) {
    var time = moment().format();
    res.render('pages/insert_user', { time: time}); 
})
app.post('/users/insert_user', function (req, res) {
  
    var email =req.body.email;
    var password =req.body.password;
    var time =req.body.time;
    var sql = `INSERT INTO "public"."users" (email,password,created_at) VALUES('${email}','${password}','${time}');`;
    //db.none
    console.log('UPDATE:' + sql);
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.redirect('/users')
        })

        .catch(function (error) {
            console.log('ERROR:' + error);
        })
});
//update product
app.post('/products/update',function (req, res) {
    var id =req.body.id;
    var title =req.body.title;
    var price =req.body.price;
    var time =req.body.time;
    var sql=`update products set title='${title}',price='${price}',created_at='${time}' where product_id='${id}'`;
    // res.send(sql)
    //db.none
    db.any(sql)
            .then(function (data) {
                console.log('DATA:' + data);
                res.redirect('/products')
            })
    
            .catch(function (error) {
                console.log('ERROR:' + error);
            })
    })
    
    //update user
    app.post('/users/update',function (req, res) {
        var id =req.body.id;
        var email =req.body.email;
        var password =req.body.password;
        var time =req.body.time;
        var sql=`update users set email='${email}',password='${password}',created_at='${time}' where user_id='${id}'`;
        // res.send(sql)
        //db.none
        db.any(sql)
                .then(function (data) {
                    console.log('DATA:' + data);
                    res.redirect('/users')
                })
        
                .catch(function (error) {
                    console.log('ERROR:' + error);
                })
        })

    //report Products
    app.get('/report_product', function (req, res) {
        var sql ='select products.product_id,products.title,sum(purchase_items.quantity) as quantity,sum(purchase_items.price) as price from products inner join purchase_items on purchase_items.product_id=products.product_id group by products.product_id;select sum(quantity) as squantity,sum(price) as sprice from purchase_items';
    db.multi(sql)
    .then(function  (data) 
    {
 
        // console.log('DATA' + data);
        res.render('pages/report_product', { product: data[0],sum: data[1]});
    })
    .catch(function (data) 
    {
        console.log('ERROR' + error);
    })
    });

    //report user
    
app.get('/report_user', function(req, res) {
    var sql='select purchases.user_id,purchases.name,users.email,sum(purchase_items.price) as price from purchases inner join users on users.user_id=purchases.user_id inner join purchase_items on purchase_items.purchase_id=purchases.purchase_id group by purchases.user_id,purchases.name,users.email order by sum(purchase_items.price) desc LIMIT 10;'
    db.any(sql)
        .then(function (data) 
        {
            // console.log('DATA' + data);
            res.render('pages/report_user', { users : data });
        })
        .catch(function (error) 
        {
            console.log('ERROR' + error);
        })
});
    


// console.log('app is running at http://localhost:8080');
// app.listen(8080);
var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log('App is running on http://localhost:' + port);
});

