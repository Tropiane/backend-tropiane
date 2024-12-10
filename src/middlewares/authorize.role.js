import initAuthStrategies from "../auth/passport.config.js";
import passport from "passport";
initAuthStrategies();

export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        passport.authenticate('current', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            if (user.role !== requiredRole) {
                return res.status(403).json({ message: 'Forbidden: Access is denied.' });
            }

            req.user = user;
            next();
        })(req, res, next);
    };
};
