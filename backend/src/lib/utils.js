import jwt from 'jsonwebtoken'

export const generateToken= async (userId,res)=>{
    const {NODE_ENV, JWT_SECRET}=process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET not yet configured");
    }
    const token= jwt.sign({userId},JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        httpOnly: true,
        maxAge: 7*24*3600*1000,
        sameSite:"strict",
        secure: NODE_ENV=='development' ? false : true 
    })
}