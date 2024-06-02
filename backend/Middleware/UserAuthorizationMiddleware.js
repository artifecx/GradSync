const userAuthorizationHandler = (...roles) => {
    return (req, res, next) => {
        const userRole = req?.user?.user_type;

        if (!roles.includes(userRole)) {
            return res.status(403).json({
                status: false,
                message: "You don't have permission",
            });
        }
        next();
    };
};

module.exports = {
    userAuthorizationHandler,
};
