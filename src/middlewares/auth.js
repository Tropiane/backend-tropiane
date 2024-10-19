const auth = (req, res, next) => {
    if (req.session?.userData && req.session?.userData) {
        console.log("User authenticated: " + req.session.userData.email);
        next();
    } else {
        console.log("User not authenticated");
        res.redirect("/login");
    }
};

export default auth