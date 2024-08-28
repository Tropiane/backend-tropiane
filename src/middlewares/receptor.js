
const receptorMiddleware = (req, res, next) => {
    console.log(`Method: ${req.method}, on URL: ${req.url}`);
    next();
}

export default receptorMiddleware