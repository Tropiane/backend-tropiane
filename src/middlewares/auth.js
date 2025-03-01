import initAuthStrategies from "../auth/passport.config.js";
initAuthStrategies();

const auth = (req, res, next) => {
    if (req.session?.passport) {
        console.log("User authenticated: " + req.session.userData.email);
        next();
    } else {
        console.log("User not authenticated");
        res.redirect("/login");
    }
};

export default auth