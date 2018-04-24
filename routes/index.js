var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/onlineportal');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({

    emailid: { type: String, required: true, unique: true },
    pass1: { type: String, required: true },
    id: { type: String, required: true },
    score: { type: Number, default: 0 },
    result: { type: String, default: 'NOT TAKEN' }

});
var UserData = mongoose.model('UserData', userDataSchema);

var adminDataSchema = new Schema({
    num: { type: Number, unique: true },
    question: { type: String },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    option4: { type: String },
<<<<<<< HEAD
    category: { type:String},
    html: { type: String },
    css: { type:String },
    javascript: { type: String},
    nodejs: { type: String },
    level : {type:String},
    begineer : { type:String},
    intermediate : {type: String},
    advanced : {type: String},
=======
>>>>>>> origin/master
    optionCorrect: { type: String, }
});

var AdminData = mongoose.model('AdminData', adminDataSchema);


var candidatesInfoSchema = new Schema({
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    streename: { type: String },
    town: { type: String },
    district: { type: String },
    state: { type: String },
    zipcode: { type: String },
    email: { type: String, unique: true },
    phno: { type: Number, unique: true },
    collname: { type: String },
    qualification: { type: String },
    passout: { type: Number },
    c: { type: String },
    cplus: { type: String },
    html: { type: String },
    css: { type: String },
    javascript: { type: String },
    nodejs: { type: String },
    project_description: { type: String }

});

var CandidatesInfo = mongoose.model('CandidatesInfo', candidatesInfoSchema);


/* All Routes Go Here */
/* GET home page. */
router.get('/', function (req, res, next) {
    /*session=req.session;
    if(session.uniqueId){
    res.redirect('/redirects');*/
    console.log('Executing Online Portal!!');
    res.render('page1');
});

router.get('/page8', function (req, res, next) {
    if (session.uniqueId == 'maplebots') {
        UserData.find({}, function (err, doc) {
            res.render('page8', { items: doc });
        });
    }
    else {
        res.end('Unauthorized Access');
    }
    console.log('Online Portal Refused to execute!!');
});

router.get('/deleteName', function (req, res) {
    if (session.uniqueId = 'maplebots') {
        UserData.remove({}, function (err) {
            console.log('Collection Removed');
        });
    }
});

router.get('/scoreCard', function (req, res, next) {
    /*session=req.session;
    if(session.uniqueId){
    res.redirect('/redirects');*/
    var passedVariable = req.query.valid;
    console.log(passedVariable);
    res.render('page1', { score: passedVariable });
});

router.get('/page2', function (req, res, next) {
    session = req.session;
    //var passedVariable = req.query.valid;
    if (session.uniqueId) {
        var passedVariable = req.query.valid;
        res.render('page2', { item: passedVariable });
    } else {
        res.end('Unauthorized access');
    }

});

router.get('/userprofile', function (req, res, next) {
    session = req.session;
    //var passedVariable = req.query.valid;
    if (session.uniqueId) {
        var passedVariable = req.query.valid;
        res.render('candidatesinfo', { name: passedVariable });
    } else {
        res.end('Unauthorized access');
    }

});

router.get('/page5', function (req, res, next) {
    session = req.session;
    //var passedVariable = req.query.valid;
    if (session.uniqueId) {
        var passedVariable = req.query.valid;
        res.render('page5', { name: passedVariable });
    } else {
        res.end('Unauthorized access');
    }

});

router.get('/page6', function (req, res, next) {
    if (session.uniqueId) {
        var passedVariable;
        UserData.findOne({ id: session.uniqueId }, function (err, doc) {
            passedVariable = doc.score;
            res.render('page6', { marks: passedVariable });
        });
    }
});

router.get('/admin', function (req, res, next) {
    session = req.session;
    if (session.uniqueId == 'maplebots') {
        res.render('page3');
    } else {
        res.end('Unauthorized Access');
    }
});

router.post('/submit', function (req, res, next) {
    AdminData.findOne({ num: no }, function (err, doc) {
        console.log(req.body.option)

        if (err) {
            res.end('Please try again');
        }
        if (req.body.option != null && req.body.option != "undefined") {
            if (req.body.option.toString().trim() === doc.optionCorrect.toString().trim()) {
                mark++;
                console.log('Correct Answer');
            }
            else {
                console.log('Wrong Answer');
            }
        }
    });
    no++;
    AdminData.count({}, function (err, count) {
        total = count;
        if (no <= total) {
            AdminData.findOne({ num: no }, function (err, doc)
            // .then(function(doc)
            {
                res.render('page4', { item: doc });
            });
        }
        else {
            console.log(mark);
            var string = encodeURIComponent(mark);
            UserData.findOne({ id: session.uniqueId }, function (err, data) {
                if (err) {
                    res.send('Error!');
                }
                else {
                    data.score = mark;
                    data.save();
                    console.log(data.score);
                }
                var percent = (data.score / total) * 100;
                if (percent >= 50) {
                    data.result = 'PASS';
                    data.save()
                }
                else {
                    data.result = 'FAIL';
                    data.save()
                }
            });
            res.redirect('/page6');
        }
    });
});

router.post('/adminLogin', function (req, res, next) {
    session = req.session;
    if (session.uniqueId) {
        res.redirect('/admin');
    }
    if (req.body.username == 'maplebots' && req.body.password == 'maplebots') {
        session.uniqueId = req.body.username;
        console.log(session.uniqueId);
    }
    res.redirect('/admin');
});

router.get('/logout', function (req, res, next) {
    session = req.session;
    if (session.uniqueId) {
        req.session.destroy(function (error) {
            console.log(error);
            res.redirect('/');
        });
    }
});

router.post('/save', function (req, res, next) {
    var item = {
        num: req.body.number,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
<<<<<<< HEAD
        category: req.body.category,
        level : req.body.level,
=======
>>>>>>> origin/master
        optionCorrect: req.body.optionCorrect
    };

    var data = new AdminData(item);
    data.save(function (err, result) {
        if (err) {
            console.log(err);
            res.end('Enter a unique question number.')
        }
        else {
            res.redirect('/admin');
        }
    });
});

/*router.get('/page2', function(req, res, next){
 var passedVariable = req.query.valid;
 res.render('page2',{name:passedVariable});
});*/

router.get('/get-data', function (req, res, next) {
    AdminData.find({}, function (err, doc) {
        if (session.uniqueId == 'maplebots') {
            res.render('page7', { items: doc });
        }
        else {
            res.end('Unauthorized Access');
        }
    });
});

router.get('/startTest', function (req, res, next) {
    if (session.uniqueId) {

        no = 1;
        AdminData.findOne({ num: no }, function (err, doc)
        // .then(function(doc)
        {
            mark = 0;
            res.render('page4', { item: doc });
        });
    }
});

router.post('/register', function (req, res, next) {
    var item = {
        emailid: req.body.emailid,
        pass1: req.body.pass1,
        id: req.body.id
    };
    var data = new UserData(item);
    UserData.findOne({ name: req.body.name, emailid: req.body.emailid }, function (err, user) {
        if (user) {
            return res.status(404).send("You are already registered with us");
        }
        if (!user) {
            data.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    session = req.session;
                    console.log(session)
                    session.uniqueId = req.body.id;
                    console.log(session.uniqueId)
                    if (session.uniqueId) {
                        var string = encodeURIComponent(req.body.name);
                        res.redirect('/userprofile');
                    }
                }
            })
        }
    })
});

router.post('/userprofile', function (req, res, next) {
    var item = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        streetname: req.body.streetname,
        town: req.body.town,
        district: req.body.district,
        state: req.body.state,
        zipcode: req.body.zipcode,
        email: req.body.email,
        phno: req.body.phno,
        collname: req.body.collname,
        qualification: req.body.qualification,
        passout: req.body.passout,
        skills: req.body.skills,
        c: req.body.c,
        cplus: req.body.cplus,
        html: req.body.html,
        css: req.body.css,
        javascript: req.body.javascript,
        nodejs: req.body.nodejs,
        project_description: req.body.project_description
    };
    var data = new CandidatesInfo(item);
    UserData.findOne({ phno: req.body.phno, emailid: req.body.email }, function (err, user) {
        if (user) {
            return res.status(404).send("You are already registered with us");
        }
        if (!user) {
            data.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    session = req.session;
                    console.log(session)
                    session.uniqueId = req.body.phno;
                    console.log(session.uniqueId)
                    if (session.uniqueId) {
                        var string = encodeURIComponent(req.body.email);
                        res.redirect('/page5');
                    }
                }
            })
        }
    })
});

router.post('/getScore', function (req, res, next) {
    var sid = req.body.id;
    UserData.findOne({ id: sid }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.status(404).send("Sorry No Match.");
        }
        console.log("Your score is", user.score);
        var string = encodeURIComponent(user.score);
        res.redirect('/scoreCard?valid=' + string);

    });
});
router.get('/logo', function (req, res, next) {
    res.sendfile('logo.png');
});


router.post('/login', function (req, res, next) {
    var emailid = req.body.emailid;
    var id = req.body.id;

    UserData.findOne({ emailid: emailid, id: id }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!user) {
            return res.status(404).send("Sorry No Match.");
        }
        session = req.session;
        session.uniqueId = req.body.id;
        if (session.uniqueId) {
            console.log(user)
            var string = encodeURIComponent(user.name);
            res.render('page2', { item: user });
        }

    });
});

router.post('/update', function (req, res) {
    var id = req.body.num;

    AdminData.findOne({ num: id }, function (err, doc) {

        if (err) {
            console.error('error, no entry found');
        }

        doc.num = req.body.num1;
        doc.question = req.body.question;
        doc.option1 = req.body.op1;
        doc.option2 = req.body.op2;
        doc.option3 = req.body.op3;
        doc.option4 = req.body.op4;
<<<<<<< HEAD
        doc.category = req.body.category;
        doc.level = req.body.level;
=======
>>>>>>> origin/master
        doc.optionCorrect = req.body.op;
        doc.save();

    })
    res.redirect('/admin');
});

router.post('/delete', function (req, res, next) {
    var id = req.body.num;
    AdminData.findOne({ num: id }, function (err, doc) {
        doc.remove();
    });
    res.redirect('/admin');
});

/*delete the collection*/

router.get('/deleteAll', function (req, res) {
    if (session.uniqueId = 'maplebots') {
        AdminData.remove({}, function (err) {
            console.log("Collection Removed");
        });
        res.redirect('/admin');
    }
    else {
        res.end('Unauthorized Access');
    }
});

module.exports = router;