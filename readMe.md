# App Project Scope

## Table of Contents
- [Project Site](#project-site)
- [Project Approach](#project-scope)
- [Technology & App Infrastructure](#technology-&-app-infrastructure)
- [Code Organisation](#code-organisation)
- [Wireframes](#wireframes)
- [Limitations](#limitations)

## Project Site
Heroku Page: https://buddy-traveler-companion.herokuapp.com/

***Super Important notes on Latency***: 
- Latency: Average 20s per request (please wait patiently for the app to load), probably due to the allocated region (US) by Heroku. 
- Pages with the highest latency: those with analytics elements such as Dashboard & Attendance pages. Don't be surprised if the process is terminated (responses that take more than 30s to return will be terminated by Heroku)

## Project Scope
This project involves building a school management system. The app allows school administrators to manage student and teacher databases:

- **Manage Student & Teacher Data**: Basic CRUD operations

- **Data Aggregation**: aggregate by age groups and regions according to the data input

- **Data Analysis**: analyse data by age groups and region, and render views that help users visualise the existing state of student attendance (i.e total per month, regulars, non-regulars) and teachers' bandwidth based on the existing roster.

- **Manpower Allocation**: school administrators can roster teachers via the app

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


## Code Organisation

### Javascript

|Folder  |Purpose                                                    |Details|
|--------|-------------------------------------------------------------------|---------------------------------------------------------------------|
|`server.js`| Contains all starting codes to get the server running| This includes (1) ***Main Dependencies used by middlewares*** `method-override`, `express-session` (2) ***Connecting to other app components*** databases, routes, port|
|`database`| Connects to the Mongodb database and creates collections used by the app| Three collections include (1) `userAccounts` for all user accounts (2) `studentRecords` for student database (3) `teacherRecords` for teacher database|
|`repositories`| Contains codes that manipulates data input and output to and from the 3 main collections| This includes (1) `accountRepo` (2) `studentRepo` (3) `teacherRepo`. The `Helper` folder contains codes that aid repositories' data processing processes (1) building database objects (2) analysing & aggregating data (e.g. attendance frequency, rostering bandwidth) (3) building general configurations (e.g. calendar)|
|`formatter`| Contains code logics that helps transforming data into format easily processed by the front-end (e.g. parsing string, parsing phone number, parsing time, parsing custom error messages)| This includes student object formatter `Student.js`, teacher object formatter `Teacher.js`, error object formatter `ValidationError.js`|
|`services`| Contains code logics that help map repositories' data objects into proper format using the formatter, before serving them to the controllers | This includes (1) `userAccount.js` (2) `studentService.js` (3) `teacherService.js`|
|`controllers`| Contains code logics that manage the traffic from the routes by using the appropriate services to respond to the front-end requests | This includes (1)`onboardingControllers` that manage requqests to create new accounts, log in, log out and verify accounts (2) `studentControllers` that manage CRUD requests for student data by age groups, regions, analysing attendance (3) `teacherControllers` that manage CRUD requests for teacher data by age groups, regions, analysing roster. The `helper` folder manages codes used for (1) transforming data into different structures for analysis, (2) reusing codes for similar requests that require similar response logics|
|`router`| Contains app routes | This includes routes to handle requests related to the `userAccount`, `students` and `teachers`|
|`validators`| Contains codes that validate form inputs | This includes validators for `signup` 'new' form, `student` 'new' form, and `teacher` 'new' form|
|`views`| Contains codes that render the front-end | This includes front-end rendering codes for the `onboarding` interface, `student` 'interface, and `teacher` interface, on top of `dashboard` interface, and 'error' interface|

## Limitations

The following bugs have not been addressed:
- Age and bandwidth update upon updating child's DOB: repositories record the correct data, but renderer (ie. `services`, `public/main.js`) updates data only on page refresh 
- Forms that involve checkboxes: when only one checkbox is ticked, app throws error as codes currently only accounts for rendering an array. 


## Wireframes

**Dashboard View**
![Wireframes](https://github.com/jessephamsg/project-2/blob/master/Wireframes/dashboard.png)

**Student Age Group View**
![Wireframes](https://github.com/jessephamsg/project-2/blob/master/Wireframes/student-ageGroup-view.png)

**Student Attendance View**
![Wireframes](https://github.com/jessephamsg/project-2/blob/master/Wireframes/student-attendance-view.png)

**Student Profile View**
![Wireframes](https://github.com/jessephamsg/project-2/blob/master/Wireframes/student-profile-view.png)

**Teacher Add New View**
![Wireframes](https://github.com/jessephamsg/project-2/blob/master/Wireframes/teacher-addNew-view.png)

**Teacher Profile View**
![Wireframes](https://github.com/jessephamsg/project-2/blob/master/Wireframes/teacher-profile-view.png)

**Teacher Roster View**
![Wireframes](https://github.com/jessephamsg/project-2/blob/master/Wireframes/teacher-roster-view.png)