import initAuthStrategies from "../auth/passport.config.js";
initAuthStrategies();

const userAuth = (req, res, next) => {
    req.user.role !== "USER" ? res.status(403).send({ error: "Usuario no autorizado", data: [] }) : next();
};
export default userAuth