require("dotenv/config");
const authRoute = require("../routes/auth.route");
const bookRoute = require("../routes/book.route")
const isAdmin = require("../middlewares/isAdmin")
const isAuth = require("../middlewares/isAuth")
const authorRoute = require('../routes/author.route')
const userRoute = require('../routes/user.route')
const rentRoute = require('../routes/rent.route')// const todosRoute = require("../routes/todos.route");

const modules = async (app, express) => {
    app.use(express.urlencoded({extended: true}));
    app.use(express.json())

    app.use('/api/auth', authRoute)
    app.use('/api/authors', isAuth, authorRoute)
    app.use('/api/books', isAuth, bookRoute)
    app.use('/api/users', isAdmin, userRoute)
    app.use('/rent', isAuth, rentRoute)
    // app.use('/users', isAdmin, todosRoute)
};

module.exports = modules;
