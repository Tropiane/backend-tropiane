import passport from "passport";
import local from "passport-local";
import usersManager from "../managers/userManager.js";

const localStrategy = local.Strategy;

const initAuthStrategies = () => {
    passport.use(
        "login",
        new localStrategy(
            {passReqToCallback: true,usernameField: "username"},
            async (req, username, password, done) => {
                try {
                    if(username !== "" && password !== "") {
                        
                        const user = await usersManager.authenticate(username, password);
                        if (!user) {
                            return done(null, false);
                        }
                        return done(null, user);
                    }else{
                        return done("complete todos los campos", false);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);})

    passport.deserializeUser((user, done) => {
        done(null, user);})
};

export default initAuthStrategies