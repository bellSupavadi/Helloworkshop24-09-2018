var express = require('express');
var pgp = require('pg-promise')();
// var db = pgp(process.env.DATABASE_URL);
var db = pgp('postgres://quxstzwnixkzml:c424aa6bac17fee1536ed4d7a61df67a66170995a252aed36c491ecd68444427@ec2-107-20-249-48.compute-1.amazonaws.com:5432/d5tcre0n3cjia1?ssl=true');
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
    var name = 'Lekkla Wilailak'
    var hobbies = ['music','movie','programing']
    var bdate = '18/08/59';
    res.render('pages/about',{fullname : name,hobbies : hobbies,Birthday : bdate});
});
// Display all products
app.get('/products/:pid', function(req, res) {
var pid = req.params.pid;
var sql = 'select* from products where id ='+pid;
db.any(sql)
.then(function(data){
    console.log('DATA:'+data);
    res.render('pages/product_edit',{product: data[0]})
    
})
.catch(function(error){
    console.log('ERROR:'+error);
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

// app.post('/products/update', async (req, res) => {
//     var id =req.body.id;
// var title =req.body.title;
// var price =req.body.price;
// var sql=`update products set title=${title},price=${price} where id=${id}`;
    
//     try {
//       const client = await pool.connect()
//       const result = await client.query(sql);
//       //const results = { 'results': (result) ? result.rows : null};
//       //res.render('pages/db', results );
//       res.send("test");
//       client.end();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })