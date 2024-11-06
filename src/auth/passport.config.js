import passport from "passport";
import config from "../config.js";
import local from "passport-local";
import usersManager from "../managers/userManager.js";
import GitHubStrategy from "passport-github2";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from "jsonwebtoken";

const localStrategy = local.Strategy;

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req.signedCookies[`${config.APP_NAME}_cookie`]
    ]),
    secretOrKey: config.SECRET,
};

const initAuthStrategies = () => {
    passport.use("login", new localStrategy(
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
        }));

    passport.use("ghlogin", new GitHubStrategy({
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GIT_HUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile._json?.email || null;
    
            if (email) {
                let findUser = await usersManager.getOne({ email });

                if (!findUser) {
                    const user = {
                        name: profile._json.name.split(" ")[0],
                        age: 0,
                        email: email,
                        password: "none"
                    };
                    findUser = await usersManager.create(user);
                }
                
                return done(null, findUser);
            } else {                
                return done("GitHub email not found", false);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.use("jwtlogin", new JwtStrategy(options, async (payload, done) => {
        try {
           const user = await usersManager.getOne({ email: payload.email });
           if (!user) {
               return done(null, false);
            } else{
                return done(null, {email: user.email, admin: user.admin});
           }
        } catch (error) {
            
            return done(error);
        }
    }));

    passport.use("current", new JwtStrategy(options, async (payload, done) => {
        try {
           const user = await usersManager.getOne({ email: payload.email });
           if (!user) {
               return done(null, false);
            } else{
                return done(null, {email: user.email, admin: user.admin});
           }
        } catch (error) {
            
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);})

    passport.deserializeUser((user, done) => {
        done(null, user);})
};

export default initAuthStrategies