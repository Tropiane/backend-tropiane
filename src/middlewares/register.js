import usersManager from "../managers/userManager.js";

const validateRegister = async (req, res, next) => {
    const {email} = req.body;
    const validate = await usersManager.validateMail(email);

    if (validate) {
        res.status(400).json({message: "Email already exists"});
    } else {
        next();
    }
}

export default validateRegister