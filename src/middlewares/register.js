import usersManager from "../managers/userManager.js";

const validateRegister = (req, res, next) => {
    const {email} = req.body;
    const validate = usersManager.validateMail(email);

    if (validate) {
        next();
    } else {
        res.status(400).json({message: "Email already exists"});
    }
}

export default validateRegister