const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');
const handlebars = require('express-handlebars').create();
const flash = require('connect-flash');
const passport = require('passport');

require('./passport');

// middleware
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');

app.use(flash())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
// app.use(session({cookie: {maxAge: null}}));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: process.env.SECRET || 'mySecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24
    }
}));

//////// google auth not working ///////

// const isLoggedIn = (req, res) => {
//     if (req.user){
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }
// app.get('/failed', (req, res) =>  res.render('/errors/404') )
// app.get('/good', isLoggedIn, (req, res) =>  res.send(`Welcome mr ${req.user.displayName}`) )
// // http://www.passportjs.org/docs/google/
// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
//   function(req, res) {
//     res.redirect('/good');
// });

db.connect();

require('./routes')(app);
require('dotenv').config();

app.listen(port, () => console.log(`Server started at port ${port}`));

