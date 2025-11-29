const jwt= require('jsonwebtoken');
require('dotenv').config();
const ensureAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "jwt token missing" });
    try {
        const decoded = jwt.verify(auth.split(" ")[1],process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (err) {
        console.log("msg error ",err);
        
        return res.status(401).json({ message: "invalid token", err });

    }
}
module.exports = ensureAuth;

