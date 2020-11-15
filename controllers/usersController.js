const db = require('../db')
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;
const moment = require('moment');
const { request } = require('express');

module.exports = {
    async create (req, res) {
        try {
            await db.users.findOne({username : req.body.username}, function (err, existingUser){
                if(existingUser === null){
                    if (req.body.password === req.body.confirmPassword){
                        req.body.confirmPassword = true
                        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUND));
                        req.body.newRegister = true
                        db.users.insertOne(req.body)
                        // req.flash('alert', 'Successfully created an account!')
                        return res.redirect('/login');
                    } else {
                        return res.send('<a href="/register">Passwords do not match!</a>');
                    }
                } else {
                    // req.flash('alert', 'Username already exists!')
                    // console.log(req.flash('alert'))
                    // return res.render('users/new', { messages: req.flash('alert')})
                    return res.send('<a href="/">Username already exists!</a>');
                }
            })
        } catch(err) {
            res.render('errors/404', { err });
        }
    },
    newForm (req, res) {
        return res.render('users/new');
    },
    async show (req, res) {
        return res.render('users/profile', {currentUser: req.session.currentUser});
    }
};


// async create (req, res) {
//     try {
//         await db.users.findOne({username : req.body.username}, function (err, existingUser){
//             if(existingUser === null){
//                  db.users.findOne({email : req.body.email}, function (err, existingEmail){
//                     if(existingEmail === null){
//                         req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUND));
//                         console.log(request.body)
//                         db.users.insertOne(req.body)
//                         // req.flash('alert', 'Successfully created an account!')
//                         return res.redirect('/login');
//                     }
//                 })
//             } else {
//                 // req.flash('alert', 'Username already exists!')
//                 // console.log(req.flash('alert'))
//                 // return res.render('users/new', { messages: req.flash('alert')})
//                 return res.send('<a href="/">Username already exists!</a>');
//             }
//         })
//     } catch(err) {
//         res.render('errors/404', { err });
//     }
// },


// async create (req, res) {
//     try {
//         await db.users.findOne({username : req.body.username}, function (err, existingUser){
//             if(existingUser === null){
//                 req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUND));
//                 db.users.insertOne(req.body)
//                 // req.flash('alert', 'Successfully created an account!')
//                 return res.redirect('/login');
//             } else {
//                 // req.flash('alert', 'Username already exists!')
//                 // console.log(req.flash('alert'))
//                 // return res.render('users/new', { messages: req.flash('alert')})
//                 return res.send('<a href="/">Username already exists!</a>');
//             }
//         })
//     } catch(err) {
//         res.render('errors/404', { err });
//     }
// },


// async create (req, res) {
//     try {
//         await validatingUser(req, res)
//         await validatingEmail(req, res)
//         req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUND));

//         req.body.newRegister = true
//         console.log(req.body)

//         db.users.insertOne(req.body)
//         // req.flash('alert', 'Successfully created an account!')
//             return res.redirect('/login');
//     } catch(err) {
//         res.render('errors/404', { err });
//     }
// },

// function validatingUser(req, res){
//     console.log('validating user')
//     console.log(req.body)
//     db.users.findOne({username : req.body.username}, function (err, existingUser){
//         if(existingUser === null){
//             return
//         } else {
//             return res.send('<a href="/">Username already exists!</a>');
//         }
//     })
// }

// function validatingEmail(req, res){
//     console.log('validating email')
//     console.log(req.body)
//     db.users.findOne({email : req.body.email}, function (err, existingEmail){
//         if(existingEmail === null){
//             return
//         } else {
//             return res.send('<a href="/">Email already exists!</a>');
//         }
//     })
// }