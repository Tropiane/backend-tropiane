import {fileURLToPath} from "url";
import {dirname} from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidHash = (password, hash) => bcrypt.compareSync(password, hash)
export default __dirname

export const createToken = (payload, duration) => jwt.sign(payload, config.SECRET, { expiresIn: duration });

export const verifyToken = (req, res, next) => {

    const headerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;
    const cookieToken = req.signedCookies && req.signedCookies[`${config.APP_NAME}_cookie`] ? req.signedCookies[`${config.APP_NAME}_cookie`] : undefined;
    const queryToken = req.query.access_token ? req.query.access_token : undefined;
    const receivedToken = headerToken || cookieToken || queryToken;

    
    if (!receivedToken) return res.status(401).send({ error: 'Se requiere token', data: [] });

    jwt.verify(receivedToken, config.SECRET, (err, payload) => {
        if (err) return res.status(403).send({ error: 'Token no válido', data: [] });
        
        req.user = payload;
        next();
    });
};