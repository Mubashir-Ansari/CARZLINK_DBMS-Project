const express = require('express');
const { createPool }=require('mysql');
const app = express();

const port =1337;
const path = require("path"); 
const bodyparser=require("body-parser")

const session = require('express-session');
const pageRouter = require('./routes/pages');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    //database:'ssql',
    database: "test",
    connectionLimit: 10
})

// var mydata=function(data){
//     this.name=data.name;
//     this.phone=data.phone;
//     this.email=data.email;
//     this.address=data.address;
//     this.description=data.description;
//     this.id=data.id;
// };


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
app.use(session({
    secret:'youtube_video',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res)=>{ 
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res)=>{ 
    const params = { }
    res.status(200).render('services.pug', params);
})
app.post('/contact', (req, res)=>{ 

    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var address=req.body.address;
    var description=req.body.desc;

    var sql = `INSERT INTO contactus (name, phone, email, address, description ) VALUES ('${name}', '${phone}', '${email}', '${address}', '${description}' )`;
    pool.query(sql,function (err, data) {
       if (err) throw err;
            console.log("Data has been saved!");
            res.send('Data has been saved!');
            // res.redirect('/views/home');
        });
});
app.get('/search', (req, res)=>{ 
    // const params = { }
    // res.status(200).render('search.pug', params);
    pool.query('select add_details.heading, add_details.phone, '
    + 'vehicles.city, vehicles.make, vehicles.model, vehicles.yearr, vehicles.fuel, vehicles.trans, vehicles.color, '
    + 'vehicles.mileage, vehicles.capacity, vehicles.image  from add_details '
    + 'INNER JOIN vehicles on add_details.v_id=vehicles.v_id ', function(err, result , fields) {
        if (err) {
            return console.log(err);
        }
        // console.log(result[0])
        res.render('search',{
            items: result
    });
});
})
app.get('/certified', (req, res)=>{ 
    // const params = { }
    // res.status(200).render('search.pug', params);
    pool.query('select add_details.heading, add_details.phone, '
    + 'vehicles.city, vehicles.make, vehicles.model, vehicles.yearr, vehicles.fuel, vehicles.trans, vehicles.color, '
    + 'vehicles.mileage, vehicles.capacity, vehicles.image  from add_details '
    + 'INNER JOIN vehicles on add_details.v_id=vehicles.v_id '
    + 'INNER JOIN schedulee on vehicles.v_id=schedulee.v_id '
    + 'INNER JOIN inspection on schedulee.inspect_id=inspection.inspect_id ', function(err, result , fields) {
        if (err) {
            return console.log(err);
        }
        // console.log(result[0])
        res.render('certified',{
            items: result
    });
});
})
app.post('/filtermake', (req, res) => {
    var Make=req.body.Make;
    var sql='select add_details.heading, add_details.phone, '
    + 'vehicles.city, vehicles.make, vehicles.model, vehicles.yearr, vehicles.fuel, vehicles.trans, vehicles.color, '
    + 'vehicles.mileage, vehicles.capacity, vehicles.image  from add_details '
    + 'INNER JOIN vehicles on add_details.v_id=vehicles.v_id '
    + 'WHERE vehicles.make = ?';
    pool.query(sql,[Make],function(err, result , fields) {
        if (err) {
            return console.log(err);
        }
        res.render('filtermake',{
            items: result
    });
});
});
app.post('/filtercity', (req, res) => {
    var City=req.body.City;
    var sql='select add_details.heading, add_details.phone, '
    + 'vehicles.city, vehicles.make, vehicles.model, vehicles.yearr, vehicles.fuel, vehicles.trans, vehicles.color, '
    + 'vehicles.mileage, vehicles.capacity, vehicles.image  from add_details '
    + 'INNER JOIN vehicles on add_details.v_id=vehicles.v_id '
    + 'WHERE vehicles.city = ?';
    pool.query(sql,[City],function(err, result , fields) {
        if (err) {
            return console.log(err);
        }
        res.render('filtercity',{
            items: result
    });
});
});
app.post('/filteryear', (req, res) => {
    var Year=req.body.Year;
    var sql='select add_details.heading, add_details.phone, '
    + 'vehicles.city, vehicles.make, vehicles.model, vehicles.yearr, vehicles.fuel, vehicles.trans, vehicles.color, '
    + 'vehicles.mileage, vehicles.capacity, vehicles.image  from add_details '
    + 'INNER JOIN vehicles on add_details.v_id=vehicles.v_id '
    + 'WHERE vehicles.yearr = ?';
    pool.query(sql,[Year],function(err, result , fields) {
        if (err) {
            return console.log(err);
        }
        res.render('filteryear',{
            items: result
    });
});
});
app.post('/filtertrans', (req, res) => {
    var Transmission=req.body.Transmission;
    var sql='select add_details.heading, add_details.phone, '
    + 'vehicles.city, vehicles.make, vehicles.model, vehicles.yearr, vehicles.fuel, vehicles.trans, vehicles.color, '
    + 'vehicles.mileage, vehicles.capacity, vehicles.image  from add_details '
    + 'INNER JOIN vehicles on add_details.v_id=vehicles.v_id '
    + 'WHERE vehicles.trans = ?';
    pool.query(sql,[Transmission],function(err, result , fields) {
        if (err) {
            return console.log(err);
        }
        res.render('filtertrans',{
            items: result
    });
});
});
app.post('/filter', (req, res) => {
    var Make=req.body.Make;
    var Year=req.body.Year;
    var City=req.body.City;
    var Transmission=req.body.Transmission;
    var sql='select add_details.heading, add_details.phone, '
    + 'vehicles.city, vehicles.make, vehicles.model, vehicles.yearr, vehicles.fuel, vehicles.trans, vehicles.color, '
    + 'vehicles.mileage, vehicles.capacity, vehicles.image  from add_details '
    + 'INNER JOIN vehicles on add_details.v_id=vehicles.v_id '
    + 'where vehicles.yearr = ?'
    + 'AND vehicles.make = ?'
    + 'AND vehicles.city = ?'
    + 'AND vehicles.trans = ?';
    pool.query(sql,[Year,Make,City,Transmission],function(err, result , fields) {
        if (err) {
            return console.log(err);
        }
        res.render('filter',{
            items: result
    });
});
});
        
//     pool.query('select add_details.heading, add_details.phone, '
//     + 'vehicles.city, vehicles.make, vehicles.model, vehicles.yearr, vehicles.fuel, vehicles.trans, vehicles.color, '
//     + 'vehicles.mileage, vehicles.capacity, vehicles.image  from add_details '
//     + 'INNER JOIN vehicles on add_details.v_id=vehicles.v_id '
//     + 'where vehicles.yearr = ' + Year,
//     + 'AND vehicles.make = ' + Make, function(err, result , fields) {
//         if (err) {
//             return console.log(err);
//         }
//         // console.log(result[0])
//         res.render('filter',{
//             items: result
//     });
// });
// });
app.use('/', pageRouter);
//post an add
app.get('/userindex', (req, res)=>{
    const params = { }
    res.status(200).render('userindex.pug', params);
})
// registration table

// app.get('/index',function(req,resp){
//     pool.query(`select * from registration`, function(err, result, fields) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log('successfull');
//         console.log(result[0].firstname);
//         resp.send('hello, ' + result[0].firstname);
//     });
    
//     })

// create
// app.get('/createdb',function(req,resp){
//     let sql='CREATE DATABASE ssql';
//     pool.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         resp.send('database created');
//     });
// });




// app.use((req, res, next) =>  {
//     var err = new Error('Page not found');
//     err.status = 404;
//     next(err);
// })

// // Handling errors (send them to the client)
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.send(err.message);
// });


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

module.exports = app;
module.exports=pool;
//app.listen(8000);
