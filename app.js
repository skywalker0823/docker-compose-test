const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api_users');
const loginRouter = require('./routes/api_login');
const mainRouter = require('./routes/main');

const token_secret = require('crypto').randomBytes(64).toString('hex')
const dotenv = require('dotenv');

dotenv.config();
process.env.TOKEN_SECRET = token_secret
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api_users', usersRouter);
app.use('/api_login', loginRouter);
app.use('/main', mainRouter);





app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



// Dev mode example
// 1. docker run -dp 3306:3306 --name a_mysql -e MYSQL_ROOT_PASSWORD=123123 -e MYSQL_DATABASE=ngas --platform linux/amd64 mysql:5.7
// 2. npm install and sudo npm install -g nodemon
// 3. cd models
// 4. node init.js
// 5. cd ..
// 6. change db.js host to 127.0.0.1
// 7. pm2 start app.js / nodemon start
// http://127.0.0.1:3000/

// Dev mode 2.0
// docker-compose -f docker-compose.dev.yml up -d --build

// Production mode
// change models/db.js 的 host to mysql
// 似乎因為compose yml中/image 會影響結果(有時有 有時沒問題)
// docker-compose up --build -d
// docker-compose down --rmi all