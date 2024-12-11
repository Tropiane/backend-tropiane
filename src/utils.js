import {fileURLToPath} from "url";
import {dirname} from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

export const handlePolicies = policies => (req, res, next) => {
    const role = req.user.role;
    if(!policies.includes(role)) return res.status(403).send({ error: 'Usuario no autorizado', data: [] });
    next();
}

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS,
    },
});

export const sendMail = async (to, subject, html) => {
    try {
        const info = await transport.sendMail({
            from: config.GMAIL_USER,
            to,
            subject,
            html,
        });
        console.log("Correo enviado:", info);
    } catch (error) {
        console.error("Error al enviar correo:", error);
    }
};

export const registerMail = (user) => {
    const { firstName, lastName, email } = user;
    const subject = "Gracias por registrarte en el sitio";
    const html = `<h1>¡Hola ${firstName} ${lastName}!</h1>
    <p>Te has registrado con el email ${email}</p>
    <p>Ya puede comenzar a comprar y disfrutar de nuestros productos</p>
    <a href="http://localhost:8080/products">¡Comprar ahora!</a>`;
    sendMail(email, subject, html);
}

export const purchaseMail = (user, tickets) => {
    const { firstName, lastName, email } = user;
    const subject = "Gracias por comprar en el sitio";
    const html = `<h1>¡Hola ${firstName} ${lastName}!</h1>
    <p>Este es el ticket de tu compra:</p>
    <ul>
        <li>codigo de compra:${tickets.code}</li>
        <li>total:$ ${tickets.amount}</li>
    </ul>
    <p>Ya puede comenzar a comprar y disfrutar de nuestros productos</p>
    <a href="http://localhost:8080/products">¡Comprar ahora!</a>`;
    sendMail(email, subject, html);
}