# App Project Scope

## Table of Contents
- [Project Site](#project-site)
- [Project Approach](#project-scope)
- [Technology & App Infrastructure](#technology-&-app-infrastructure)
- [Code Organisation](#code-organisation)
- [Wireframes](#wireframes)

## Project Site
Heroku Page: https://buddy-traveler-companion.herokuapp.com/

## Project Scope
This project involves building a travel companion app to track trips made and providing an overview of the user's budgets.
This app allows the user to perform CRUD operations for trips, which will provide and analysis for the budgets for the trips.
This app will also be linked to several APIs to retrieve data on flights and accommodation recommendation.

## Technology & App Infrastructure

**Tech Stack**: 
- MongoDB: no-SQL database
- ExpressJS: NodeJS framework for the app backend
- EJS: for rendering UI components
- NodeJS: JS runtime environment

**Other Frameworks**: 
- Jquery: for rendering front-end on data changes 
- ChartJS: for rendering charts

**Dependencies**:
- Express-session: manage user sessions
- Bcrypt: for encrypting password before storing into the database
- method-override: for forms' DELETE and PUT methods
- node-fetch: to fetch data from APIs
- moment: for effecient time converting abilities
- unirest: SDK for an API

## Code Organisation

### Javascript

|Folder  |Purpose                                                    |Details|
|--------|-------------------------------------------------------------------|---------------------------------------------------------------------|
|`server.js`| Contains all starting codes to get the server running| This includes (1) ***Main Dependencies used by middlewares*** `method-override`, `express-session` (2) ***Connecting to other app components*** databases, routes, port|
|`database`| Connects to the Mongodb database and creates collections used by the app| Three collections include (1) `users` for all user accounts (2) `travel` for details regaring particular trips|
|`controllers`| Contains code logics that manage the traffic from the routes by using the appropriate services to respond to the front-end requests | This includes (1)`sessionsController` that manages the current session which includes log in, log out and verify accounts (2) `usersController` that manage creating an account and rendering account creation page(3) `travelController` that manage CRUD requests for trips planned together with flights and hotels searching logic|
|`router`| Contains app routes | This includes routes to handle requests related to the `users` and `travel`|
|`views`| Contains codes that render the front-end | This includes front-end rendering codes for the `onboarding` interface, `user` 'interface, and `trips` interface, on top of `dashboard` interface, and 'error' interface|

## Wireframes
