const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
    if (req.session.currentUser) next();
    else next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
    if (!req.session.currentUser) next();
    else {
        console.log("The user is already connected")
        console.log(req.session.currentUser)
        next(createError(403))
    };
};

exports.validationLoggin = () => async (req, res, next) => {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) next(createError(400));



    next();
}
