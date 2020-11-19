const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const validationMiddleware = require('./middleware/validationMiddleware');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirMiddleware = require('./middleware/redirIfAuthMiddleware');
const flash = require('connect-flash');


const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const app = new express();

mongoose.connect('mongodb+srv://user1:WeGvLdOH0tomnHh9@cluster0.xee4a.mongodb.net/testblog?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use(flash());

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

let port = process.env.PORT;

if (port == null || port == "") {
    port = 4000;
}

app.listen(port, ()=>{
    console.log('App listening...');
});

app.use('/posts/store', validationMiddleware);

app.get('/', homeController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/post/:id', getPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirMiddleware, newUserController);
app.post('/users/register', redirMiddleware, storeUserController);
app.get('/auth/login', redirMiddleware, loginController);
app.post('/users/login', redirMiddleware, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));

// WeGvLdOH0tomnHh9