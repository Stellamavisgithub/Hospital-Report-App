"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_config_1 = __importDefault(require("./config/database.config")); // Import the database configuration
const express_session_1 = __importDefault(require("express-session"));
const index_1 = __importDefault(require("./routes/index"));
const doctors_1 = __importDefault(require("./routes/doctors"));
const report_1 = __importDefault(require("./routes/report"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const database = yield (0, database_config_1.default)();
        const app = (0, express_1.default)();
        // view engine setup
        app.set('views', path_1.default.join(__dirname, '..', 'views'));
        app.set('view engine', 'ejs');
        app.use((0, morgan_1.default)('dev'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
        app.use((0, express_session_1.default)({
            secret: `${process.env.secret}`,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false },
        }));
        app.use((req, res, next) => {
            res.setHeader('Cache-Control', 'no-store, must-revalide');
            next();
        });
        app.use('/', index_1.default);
        app.use('/doctors', doctors_1.default);
        app.use('/report', report_1.default);
        app.get('/homepage', function (req, res) {
            res.render('index', { title: 'Express' });
        });
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            res.status(404).json({ message: 'Not found', error: 'Not found' });
        });
        // error handler
        app.use(function (err, req, res, next) {
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
    }
    catch (error) {
        console.error('Error starting the server');
        console.error(error.message);
        process.exit(1); // Exit the process if there's an error
    }
});
startServer();
