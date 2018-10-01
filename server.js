var express = require('express');
var pgp = require('pg-promise')();
var db = pgp('postgres://qzwdfalyaqhdjf:f202bed3f53d1dc03b523853492dbfc397e1208f83d2e775b45f46c9652fe5bd@ec2-54-243-147-162.compute-1.amazonaws.com:5432/d70ueqr41e79i9?ssl=true');
//db ssl=true =ใช้ทดสอบดาต้าเบสในเครื่อง
// var db = pgp('postgres://nkwnjxuiidwrns:b72b4de42f726173c9acee8a85dd10ed1c8dc1a2ab7402a6feebbbccb8b14f85@ec2-54-163-245-44.compute-1.amazonaws.com:5432/d34ii1v5fr4h1e?ssl=true');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static ('static') );
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');

});

app.get('/about', function (req, res) {
    var name = ['BUBBLE'];
    var hobbies = ['Music', 'Movie', 'Programming'];
    var bdate = '27/03/1997';
    res.render('pages/about', { fullname: name, hobbies: hobbies, bdate: bdate });

});
//Display all products
app.get('/products', function (req, res) {
    var id = req.param('id');
    var sql = 'select* from products';
    if (id) {
        sql += ' where id =' + id;
    }
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.render('pages/products', { products: data })

        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })

});

//GET products pid
app.get('/products/:pid', function (req, res) {
    var pid = req.params.pid;
    var sql = "select * from products where id= " + pid;
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.render('pages/products_edit', { product: data[0] })

        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })


});

//Display all user
app.get('/users', function (req, res) {
    var id = req.param('id');
    var sql = 'select* from users';
    if (id) {
        sql += ' where id =' + id;
    }
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.render('pages/users', { users: data })

        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })

});
//Display all user id
app.get('/users/:id', function (req, res) {
    var id = req.param('id');
    var sql = 'select* from users';
    if (id) {
        sql += ' where id =' + id;
    }
    db.any(sql)
        .then(function (data) {
            console.log('DATA:' + data);
            res.render('pages/users', { users: data })

        })
        .catch(function (error) {
            console.log('ERROR:' + error);
        })

});

//update data
app.post('/products/update', function (req, res) {

    var id = req.body.id;
    var title = req.body.title;
    var price = req.body.price;
    // var sql = 'update products set title : "'+title+ '" price : "'+price+ '" where id : '+id;  วิธีต่อเเบบไม่ดี
    // Alt+96 = ``
    var sql = `update products set title : ${title} price : ${price} where id : ${id}`
    //db.none
    console.log('UPDATE : ' + sql);
    res.redirect('/products');

});
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});
//   console.log('Appp is running at http://localhost:8080');          

// app.listen(8080);