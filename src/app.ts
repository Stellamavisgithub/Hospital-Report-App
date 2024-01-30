// app.ts
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import connectToDatabase from './config/database.config'; // Import the database configuration
import session from 'express-session';

import indexRouter from './routes/index';
import usersRouter from './routes/doctors';
import reportRouter from './routes/report';
import mongoose from 'mongoose';

const startServer = async (): Promise<void> => {
  try {
    const database: mongoose.Connection = await connectToDatabase();
    
    const app = express();

    // view engine setup
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '..', 'public')));


    app.use(
      session({
        secret: `${process.env.secret}`,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
      })
    );
    
    app.use((req, res, next) => {
      res.setHeader('Cache-Control', 'no-store, must-revalide');
      next();
    })


    app.use('/', indexRouter);
    app.use('/doctors', usersRouter);
    app.use('/report', reportRouter);

    app.get('/homepage', function (req: Request, res: Response) {
      res.render('index', { title: 'Express' });
    });

    // catch 404 and forward to error handler
    app.use(function (req: Request, res: Response, next: NextFunction) {
      res.status(404).json({ message: 'Not found', error: 'Not found' });
    });

    // error handler
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: 'Internal Server Error',
      });
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error: any) {
    console.error('Error starting the server');
    console.error(error.message);
    process.exit(1); // Exit the process if there's an error
  }
};

startServer();
