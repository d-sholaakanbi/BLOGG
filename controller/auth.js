const Users = require('../models/user');
const handleError = require('../utils/handlerrors');



const register = async (req, res) => {
    const {email, name, password} = req.body
    if(!email || !password || !name ) {
       return res.status(400).json({success: false, message:"please neccessary information"})
    }
    try {
        const user = await Users.create({...req.body});
        const token = user.generateToken();
        res.status(201).json({data: {name: user.name, email: user.email}, token }) 
    } catch (error) {
        const errors = handleError(error);
        res.json(400).json({errors})
    }   
};

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) { return res.status(400).json({success: false, message:"please neccessary information"})

    }
    try {
        const user = await Users.findOne({email});
        if (!user){
            throw Error("incorrect Email")
        }
        const authenticated = await user.comparePassword(password);
        if(!authenticated){
            throw Error('incorrect Password') 
        }
        const token = user.generateToken();
        return res.status(200).json({user:{name: user.name, email: user.email }, token})
     } catch (error) {
        const errors = handleError(error);
        res.json(400).json({errors})
    }    
};

module.exports = {register, login}