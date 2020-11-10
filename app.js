const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const sha1 = require('js-sha1');
const mysql = require('mysql2');
const hasher = require('wordpress-hash-node');
// const pg = require('pg');
const multer = require('multer');
const fs = require('fs');
// const c = require('./check_connect');
const td = require('./time_date');
// const { query } = require('express');
// const { type } = require('os');
// const connect = require('./connect');
const router = express.Router();
const app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
// app.use([/^\/public\/movies($|\/)/, '/public'], express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", router);

// functions
function makeSequence(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// global variables
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'private_movies')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
        res.send(files)
})

// const pool = new pg.Pool({
//     connectionString: "postgres://pmnqlafbegesks:9ecb2ccfe923ce091f167044b953ece18f741e7365ec5851d43f21b03f78c417@ec2-34-237-89-96.compute-1.amazonaws.com:5432/dejlftg8h9o00u",
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const wp_pool = mysql.createPool({
    connectionLimit: 100,
    host     : '88.218.116.18',
    database : 'damenuss_up1',
    user     : 'damenuss_up1',
    password : 'R8Q37mtYz@yqm%5k',
});

check_connect = (cookie, callback) => {
    if (!cookie) {
        callback(null, false);
    } else {
        wp_pool.getConnection((err, client) => {
            if (err) {
                callback(err, false);
            } else {
                client.query("SELECT UID FROM sessions WHERE SID = '"+ cookie + "' AND logged_out = '0'", function(err, result) {
                    client.release();
                    callback(err, result[0])
                });
            }
        });
    }
}

// get_schedules = (cookie, callback) => {
//     if (!cookie) {
//         callback(null, false);
//     } else {
//         pool.connect(function(err, client, done) {
//             if (err) {
//                 callback(err, false);
//             } else {
//                 client.query("SELECT time, url, description FROM schedule INNER JOIN sessions ON sessions.uid = schedule.uid and sessions.sid = '" + cookie + "'", function(err, result) {
//                     done();
//                     callback(err, result.rows)
//                 });
//             }
//         });
//     }
// }

// routers
router.get('/', (req, res) => {
    res.redirect('/schedule');
});

router.get('/login', (req, res) => {
    res.render('login.html');
});

router.get('/log_out', (req, res) => {
    let updateQuery = "UPDATE sessions SET logged_out = '1'	WHERE sid = '" + req.cookies.LoggedIn + "'";
    wp_pool.getConnection((err, client) => {
        if (err) return console.log(err);
        client.query(updateQuery, function(err) {
            client.release();
            if (err) return console.log(err);
        });
    });
    res.redirect('login');
});
 
router.post('/login', function(req, res){
    wp_pool.getConnection((err, client) => {
        if (err){
            res.render('login.html');
            return console.log(err);
        }

        let email = req.body.email;
        let pass = req.body.password;
        let selectQuery = "SELECT ID, user_pass FROM wed_users WHERE user_email = '"+ email + "'";    
        
        client.query(selectQuery, function(err, result) {
            if(err) {
                res.render('login.html');
                return console.log(err);
            }
            if (!result[0]){
                res.render('login.html');
                return console.log("didn't find an email with this value");
            }
            if (hasher.CheckPassword(pass, result[0].user_pass)) {
                
                let sid = makeSequence(10);
                let now = td.get_time_date();
                let insertQuery = "INSERT INTO sessions (sid, uid, create_time, ip_address, user_agent) VALUES ('"+sid+"','"+result[0].ID+"','"+now+"','::1','"+req.get('user-agent')+"')";

                client.query(insertQuery, function(err) {
                    client.release();
                    if (err) {
                        console.log(err);
                        res.render('login.html');
                    }
                    res.cookie('LoggedIn', sid);
                    res.redirect('/schedule');
                });
            } else {
                res.render('login.html');
            }
        });
    });
});

router.get('/schedule', (req, res) => {
    check_connect(req.cookies.LoggedIn, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('login');
        } else {
            if (result) {
                res.render('schedule.html');
            } else {
                res.redirect('login');
            }
        }
    });
});

router.get('/view', (req, res) => {
    check_connect(req.cookies.LoggedIn, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('login');
        } else {
            if (result) {
                res.render('view.html');
            } else {
                res.redirect('login');
            }
        }
    });
});

// to see the videos from the wish list
router.get('/get_videos', (req, res) => {
    wp_pool.getConnection((err, client) => {
        if (err) {
            console.log(err);
        } else {
            client.query("SELECT VID FROM wish_list INNER JOIN sessions ON sessions.UID = wish_list.UID and sessions.SID = '" + req.cookies.LoggedIn + "'", function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result[0]) {
                    videos_id = result[0].VID.split(',');
                    client.query("SELECT ID, url, description FROM videos WHERE id IN ("+ videos_id +")", (err, result) => {
                        client.release();
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(JSON.stringify(result));
                        }
                    });
                }
            });
        }
    });
});

// router.get('/get_schedules', (req, res) => {
//     get_schedules(req.cookies.LoggedIn, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (result) {
//                 res.send(JSON.stringify(result));
//             } else {
//                 console.log(err);
//             }
//         }
//     });
// });

// to schedule a video from the schedule page
router.post('/schedule_a_video', (req, res) => {
    wp_pool.getConnection((err, client) => {
        if (err) console.log(err);
        else {
            client.query("SELECT UID FROM sessions WHERE SID = '" + req.cookies.LoggedIn + "'", function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result[0]) {
                    client.query("INSERT INTO schedule (TID, UID, url, time) VALUES ('"+makeSequence(10)+"', "+result[0].UID+", '"+req.body.url+"', '"+req.body.datetime+"')", (err) => {
                        client.release();
                        if (err) console.log(err);
                    });
                }
            });
        }
    });
});

// to see a video from the view page
router.get('/show_a_video', (req, res) => {
    wp_pool.getConnection((err, client) => {
        if (err) {
            console.log(err);
        } else {
            client.query("SELECT TID, url FROM schedule INNER JOIN sessions ON sessions.UID = schedule.UID and sessions.SID = '"+req.cookies.LoggedIn+"' AND '"+td.get_time_date()+"' > time", (err, result, fields) => {
                if (err) {
                    console.log(err);
                } else if (result[0]){
                    res.send(JSON.stringify({'ok': true, 'video': result[0]['url']}));
                    client.query("DELETE FROM schedule WHERE TID = '"+result[0]['TID']+"'", (err) => {
                        client.release();
                        if (err) console.log(err);
                    });
                } else {
                    res.send(JSON.stringify({'ok': false, 'video': '', 'time': td.get_time_date()}));
                }
            });
        }
    });
});


router.post('/uploadfile', (req, res, next) => {
    let cookie = req.cookies.LoggedIn;

    let connection = connect.create_connect();

    let uidQuery = "SELECT `uid` FROM `sessions` WHERE `sid` = '"+cookie+"'";
    connection.query(uidQuery, (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else if (response[0]) {
            let storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    let dir = 'public/private_movies/'+response[0]['uid'];
                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }
                    cb(null, 'public/private_movies/'+response[0]['uid'])
                },
                filename: function (req, file, cb) {
                    cb(null, file.originalname)
                }
            })

            let upload = multer({ storage: storage }).array('myFiles', 12);
            upload(req, res, function(err) {
                if (err) {
                    return res.send(err);
                }
                res.render('schedule.html');
            });
        } else {
            console.log('error in uploaddig a file no find uid');
        }
    });
});

app.listen(4000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
