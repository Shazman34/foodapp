import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // --- 🟢 FIX STARTS HERE ---
        // If req.body doesn't exist (because the request was empty), create it manually.
        if (!req.body) {
            req.body = {};
        }
        // --- 🟢 FIX ENDS HERE ---

        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export default authMiddleware;