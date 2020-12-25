const pool = require('./pool');
const bcrypt = require('bcrypt');
const { get } = require( '../routes/pages' );
var getid=0;

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
            getid=user;
        }
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;
        pool.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object 
    create : function(body, callback) 
    {

        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd,10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },

    login : function(username, password, callback)
    {
        //find the user data by his username.
        //pool.query(`select * from users`, function(err, result, fields) {
        // g`SELECT id FROM users WHERE username=?` ,username;
        // console.log(getid);
        this.find(username, function(user) {
            // if there is a user by this username.
            if(user) {
                // now we check his password.
                if(bcrypt.compareSync(password, user.password)) {
                    // return his data.
                    callback(user);
                    return;
                }  
            }
            // if the username/password is wrong then return null.
            callback(null);
        });

        let sql = `SELECT id FROM users WHERE username=?`
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, username , function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no erro
             getid=result[0].id;
            //  console.log("here: ",getid);
             module.exports.getid= getid;
        });
        
        
    }

}
module.exports.User = User;