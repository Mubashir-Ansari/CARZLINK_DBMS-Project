const express = require('express');
const imp = require('../core/user');
const pool = require('../core/pool')
// var imp = require('../core/user');
const User = imp.User;
var numb,resu,numb1,resu1;
// console.log("Hello",imp.getid);
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/views2.0/userhome');
        return;
    }
    // IF not we just send the index page.
    res.render('userindex', {title:"My application"});
})

// Get home page
router.get('/userhome', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('userhome', {opp:req.session.opp, name:user.fullname});
        return;
    }
    res.redirect('/');
});
router.get('/inspect_details', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('inspect_details', {opp:req.session.opp, name:user.fullname});
        return;
    }
    res.redirect('/');
});
//post and add form into database 
router.post('/userhome', (req, res, next) => {
    var plate=req.body.plate;
    numb=plate;
    var price=req.body.price;
    var description=req.body.description;
    var contact=req.body.contact;
    var make=req.body.make;
    var model=req.body.model;
    var year=req.body.year;
    var trans=req.body.Transmission;
    var color=req.body.color;
    var mileage=req.body.mileage;
    var capacity=req.body.capacity;
    var city=req.body.city;
    var fuel=req.body.fuel;
    var image=req.body.image;
    var sql2 = `INSERT INTO vehicles(user_id,image,city,make,model,yearr,fuel,trans,color,mileage,capacity,platee,price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    pool.query(sql2,[imp.getid,image, city ,make,model,year,fuel,trans,color,mileage,capacity,plate,price],function (err, results) {
                if (err) throw err;
                else{
                    // console.log(numb);
                    // console.log(plate);
                   let sql5 = `SELECT * FROM vehicles WHERE platee=?`
                   var resu3;
                   // call the query give it the sql string and the values (bind array)
                   pool.query(sql5, numb , function(err, result) {
                        if(err) 
                           throw err;
                        else{  
                       resu3=result[0].v_id;
                       console.log(resu3);
                       var sql = `INSERT INTO add_details(user_id,v_id, heading, phone) VALUES (?,?,?,?)`;
                       pool.query(sql,[imp.getid,resu3 ,description, contact],function (err, data) {
                        if (err) throw err;
                           res.redirect('/inspect_choice'); ;
                       });
                   }
               });
                }
            });
    
});

router.post('/inspect_choice', (req, res, next) => {
    var choice=req.body.choice;
    
    if(choice=='Yes'){
        res.redirect('/inspect_details');
    }
    else{
        res.redirect('/userhome');
    }

});


router.get('/inspect_choice', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('inspect_choice', {opp:req.session.opp, name:user.fullname});
        return;
    }
    res.redirect('/');
});

router.post('/inspect_details', (req, res, next) => {
    var timee=req.body.timee;
    var datee=req.body.datee;
    var pay=req.body.payment;
    let sql3 = `SELECT v_id FROM vehicles WHERE platee=?`
    var resu2;
    // call the query give it the sql string and the values (bind array)
    pool.query(sql3, numb , function(err, result) {
        if(err) throw err;
    else{
         resu=result[0].v_id;
         resu2=resu;
         var sql4 = `INSERT INTO schedulee (v_id,user_id,datee,timee,payment) VALUES (?,?,?,?,?)`;
        pool.query(sql4,[resu2,imp.getid,datee,timee,pay],function (err, results) {
                if (err) throw err;
                
                res.redirect('/userhome');            
            });
    }
    });
});


router.get('/inspection', (req, res)=>{ 
    const params = { }
    res.status(200).render('inspection.pug', params);
})

router.post('/inspection', (req, res, next) => {
    var id=req.body.worker;
    var pass=req.body.pass;
    var temp=0;
    let sql8 = `SELECT * FROM workers WHERE worker_id=? AND pass=?`
        // call the query give it the sql string and the values (bind array)
        pool.query(sql8,[id,pass] , function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no erro
            else{ 
            temp=result[0].w_name;
            if(temp!=0){
             res.redirect('./rating');
            }
            else{
                res.send('incorrect');
            }
            }
        });  

});

router.get('/rating', (req, res)=>{ 
    const params = { }
    res.status(200).render('rating.pug', params);
})


router.post('/rating', (req, res)=>{ 

    var w_id=req.body.workerr;
    var in_id=req.body.inspect;
    var exterior=req.body.exterior;
    var brake=req.body.brake;
    var engine=req.body.engine;
    var susp=req.body.susp;
    var elec=req.body.elec;
    var sql0 = `INSERT INTO inspection (inspect_id,worker_id, enginee,suspension,exterior,electric,brakes ) VALUES ('${in_id}', '${w_id}', '${engine}', '${susp}', '${exterior}', '${elec}', '${brake}' )`;
    pool.query(sql0,function (err, data) {
       if (err) throw err;
            // console.log("Data has been saved!");
            res.send('DATA HAS BEEN SAVED')
        });
});
// router.get('/inspect_details', (req, res, next) => {
//     let user = req.session.user;

//     if(user) {
//         res.render('inspect_details', {opp:req.session.opp, name:user.fullname});
//         return;
//     }
//     res.redirect('/');
// });

 

// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;

            // redirect the user to the home page.
            res.redirect('/userhome');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })

});


// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };  
     // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/');
            });

        }else {
            console.log('Error creating a new user ...');
        }
        
    });

});


// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;