"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';
const env = process.env.NODE_ENV;
// Middleware - logs server requests to console
if (env !== 'test') {
    app.use((0, morgan_1.default)(logLevel));
}
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
});
app.use('/api/users', userRoutes_1.default);
app.listen(PORT, () => {
    console.log('The application is listening on port http://localhost:' + PORT);
});
(0, db_1.connectToDb)();
