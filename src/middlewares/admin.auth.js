import initAuthStrategies from "../auth/passport.config.js";
initAuthStrategies();

const adminAuth = (req, res, next) => {
    req.user.role !== "ADMIN" ? res.status(403).send({ error: "Usuario no autorizado", data: [] }) : next();
};

export default adminAuth