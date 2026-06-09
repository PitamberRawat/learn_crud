import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded",decoded);
        
        req.userDetails = decoded;
        next();
    }catch (err){
        return res.status(500).json({
            message: "Error in authMiddleware",
            error: err.message
        })
    }

}