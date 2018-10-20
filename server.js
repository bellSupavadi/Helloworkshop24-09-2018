var express = require('express');
var pgp = require('pg-promise')();
// var db = pgp(process.env.DATABASE_URL);
var db = pgp('postgres://qzwdfalyaqhdjf:f202bed3f53d1dc03b523853492dbfc397e1208f83d2e775b45f46c9652fe5bd@ec2-54-243-147-162.compute-1.amazonaws.com:5432/d70ueqr41e79i9');
var app = express();
var bodyParser = require('body-parser');//บังคับ
app.use(bodyParser.json());//บังคับ
app.use(bodyParser.urlencoded({ extended: true })); //บังคับ




// app.use(express.static('static'));
app.set('view engine','ejs');
app.get('/', function(req, res) {
    res.render('pages/index');
});
app.get('/about', function(req, res) {
    var name = 'Supavadi'
    var hobbies = ['music','movie','programing']
    var bdate = '27/03/1997';
    res.render('pages/about',{fullname : name,hobbies : hobbies,Birthday : bdate});
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



//Display all products
app.get('/products', function(req, res) {
    var id = req.param('id');
    var sql='select* from products';
        if(id){
            sql += ' where id ='+id;
        }
   db.any(sql)
    .then(function(data){
        console.log('DATA:'+data);
        res.render('pages/products',{products: data})
        
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })

});


//delete

app.get('/product_delete/:pid',function (req,res) {
    var pid = req.param.pid;
    var sql = 'DELETE FROM products';
    if (id){
            sql += ' where id ='+ pid;
    }
    db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/products',{product: data[0]});
            
        })
        .catch(function(data){
                console.log('ERROR:'+console.error);
                
    })
 });





// Display all user
app.get('/users/:id', function(req, res) {
    var id=req.param('id');
    var sql = 'select * from users';
    if(id){
        sql+=' where id ='+id;
    }
    db.any(sql)
    .then(function(data){
    console.log('DATA:'+data);
    res.render('pages/users',{users : data})

    })
    .catch(function(error){
        console.log('ERROR:'+error)
    })});


    // Display all user
    app.get('/users', function (req, res) {
        db.any('select * from users', )
            .then(function (data) {
                console.log('DATA' + data);
                res.render('pages/users', { users: data })
    
            })
            .catch(function (error) {
                console.log('ERROR:' + error);
            })
    
});

//add Product
app.get('/insert',function (req, res) {
    res.render('pages/insert'); 
})
app.post('/products/insert', function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var price = req.body.price;
    var sql = `INSERT INTO products (id,title,price)
    VALUES ('${id}', '${title}', '${price}')`;
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

//update
app.post('/products/update',function (req, res) {
var id =req.body.id;
var title =req.body.title;
var price =req.body.price;
var sql=`update products set title='${title}',price=${price} where id=${id}`;
// res.send(sql)
//db.none
db.query(sql);
    res.redirect('/products')    
db.close();
})





// console.log('app is running at http://localhost:8080');
// app.listen(8080);
var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log('App is running on http://localhost:' + port);
});

