const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
    if (req.session.currentUser) next();
    else {
        console.log("Error. The user is not logged in")
        next(createError(401))
    };
};

exports.isNotLoggedIn = () => (req, res, next) => {
    if (!req.session.currentUser) next();
    else {
        console.log("Error. The user is already logged in")
        next(createError(401));
    }
};

exports.validationLoggin = () => async (req, res, next) => {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) next(createError(400));



    next();
}
