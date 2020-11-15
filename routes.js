const sessionsController = require('./controllers/sessionsController');
const usersController = require('./controllers/usersController');
const travelController = require('./controllers/travelController');

module.exports = (app) => {
    app.get('/', sessionsController.index);

    /////////////////////////////////////////////////////////////////  FLASH   //////////////////////////////////////////////////////////////////////////
    // app.use((req, res, next)=>{
    //     res.locals.message = req.session.messages
    //     delete req.session.messages
    //     next()
    // })
    
    // app.get('/flash', function(req, res){
    //     // Set a flash message by passing the key, followed by the value, to req.flash().
    //     req.flash('info', 'Flash is back!')
    //     console.log(req.flash())
    //     res.redirect('/asdf');
    // });
       
    //   app.get('/asdf', function(req, res){
    //     // Get an array of flash messages by passing the key to req.flash()
    //     res.render('flash', { messages: req.flash('info') });
    // });

    ///////////////////////////////////////////////////////////////  FLASH   //////////////////////////////////////////////////////////////////////////

    app.get('/login', sessionsController.newForm);
    app.post('/login', sessionsController.create);

    app.get('/register', usersController.newForm);
    app.post('/register', usersController.create);
    app.get('/travelAdvice', travelController.showTravelAdvice);
    app.get('/searchFlights', travelController.searchFlights);
    app.post('/searchFlights', travelController.flightsSearched);
    app.get('/searchHotels', travelController.searchHotels);
    app.post('/searchHotels', travelController.hotelsSearched);

    // middleware to check if current user is logged in
    app.use((req, res, next) => {
        if(req.session.currentUser) {
            next();
        } else {
            return res.redirect('/');
        }
    });

    app.get('/welcome', sessionsController.welcome);
    app.delete('/sessions', sessionsController.destroy);
    app.get('/profile', usersController.show);

    app.get('/travel', travelController.overview);
    app.get('/travel/new', travelController.newTripForm);
    app.post('/travel', travelController.create);
    app.get('/travelUpcoming', travelController.upcomingIndex);
    app.get('/travelCompleted', travelController.completedIndex);
    app.get('/travel/:id', travelController.show);
    app.get('/travel/:id/edit', travelController.edit);
    app.delete('/travel/:id', travelController.removeItem);
    app.put('/travel/:id', travelController.update);

}


