import usersController from "../controllers/users.controller.js";

const controller = new usersController();

const validateRegister = async (req, res, next) => {
    const {email} = req.body;
    const validate = await controller.validateMail(email);

    if (validate) {
        res.status(400).json({message: "Email already exists"});
    } else {
        next();
    }
}

export default validateRegister