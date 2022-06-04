const json_web_token = require("jsonwebtoken");
const Staff = require("../models/staffModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req,res,next)=>{
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = json_web_token.verify(token, process.env.JWT_SECRET);

            req.staff = await Staff.findById(decoded.id).select("-userpassword");
            next();
        } catch (error) {
            res.status(401);
            throw new Error ("Not authorized, token failed");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = {protect};