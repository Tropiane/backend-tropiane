const auth = (req, res, next) => {
    if (req.session?.userData && req.session?.userData?.admin) {
        console.log(req.session.userData);
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
        res.redirect("/login");
    }
};

export default auth