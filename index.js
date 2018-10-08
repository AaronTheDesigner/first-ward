//environment variables
require('dotenv').config();


//__a.REQUIREMENTS__\\
const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const edge = require('edge.js');
const cloudinary = require('cloudinary');



//__a.EXPRESS__\\
const app = new express();

const mongoStore = connectMongo(session);

app.use(session({

  secret: process.env.EXPRESS_SESSION_KEY,

  store: new mongoStore({

    mongooseConnection: mongoose.connection

  })

}))


//__mongoose and database__\\
mongoose.connect(process.env.DB_URI)
const Date = require('./database/models/Date')

//__Controllers__\\
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController  = require('./controllers/logout')
const adminLoginController = require('./controllers/adminLogin')
const adminUserController = require('./controllers/adminUser')
const dashController = require('./controllers/dash')
const dateController = require('./controllers/date')



//__c.STATIC__\\
app.use(fileupload())
app.use(express.static('public'))

app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//__MIDDLEWARE__\\
const storePost = require('./middleware/storePost')
const auth = require('./middleware/auth')
const admin = require('./middleware/admin')
const redirectIfAuthendicated = require('./middleware/redirectIfAuthenticated')

app.use('*', (request, response, next)=> {

  edge.global('auth', request.session.userId)

  next()
  
})


app.use('/posts/store', storePost)
app.use(connectFlash());

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,

  cloud_name: process.env.CLOUDINARY_NAME
})


//__b.ROUTES__\\
app.get('/', homePageController);

app.get('/date', dateController);

app.post('/dates/store', (request, response) => {

  Date.create(request.body, (error, post) => {

    response.redirect('/')

  })

})

app.get('/post/new', auth, createPostController);

app.post('/posts/store', auth, storePost, storePostController);

app.get('/post/:id', getPostController);

app.get('/auth/register', redirectIfAuthendicated, createUserController);

app.post('/users/register', redirectIfAuthendicated, storeUserController);

app.get('/auth/login', redirectIfAuthendicated, loginController);

app.post('/users/login', redirectIfAuthendicated, loginUserController);

app.get('/auth/logout', auth, logoutController);

//app.use((request, response) => response.render('not-found'));

//admin auth

app.get('/admin', adminLoginController);

app.post('/admin/login', adminUserController);

app.get('/admin/dash', admin, dashController);

app.get('/hb', (request, response) => {
  
  response.render('handbook')

})

app.get('/about', (request, response) => {

  response.render('about')

})

app.get('/doc', (request, response) => {

  response.render('doc')

})

app.get('/contact', (request, response) => {

  response.render('contact')

})

//__a.PORT__\\
app.listen(process.env.PORT, () => {
  console.log('app listening on port 4000')
})