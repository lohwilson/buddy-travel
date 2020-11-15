const db = require('../db');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
    async index (req, res) {
        return res.render('index', { currentUser: req.session.currentUser});
    },
    newForm (req, res) {
        return res.render('sessions/new');
    },
    async create (req, res) {
        try {
            const user = await db.users.findOne({ username: req.body.username });
            if(bcrypt.compareSync(req.body.password, user.password)) {
                req.session.currentUser = user;
                if(user.newRegister === true){
                    db.users.updateOne({ username: req.body.username}, {$set: {newRegister: false}})
                    console.log(req.session.currentUser)
                    console.log(user)
                    return res.redirect('/welcome');
                } else {
                    return res.redirect('/');
                }
            } else {
                throw new Error();
            }
        } catch(err) {
            return res.send('<a href="/">Username or password is wrong!</a>');
        }
    },
    welcome (req, res) {
        return res.render('sessions/welcome', {currentUser: req.session.currentUser });
    },
    destroy (req, res) {
        return req.session.destroy(() => {
            res.redirect('/');
        });
    }
};



