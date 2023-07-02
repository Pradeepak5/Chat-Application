const { userModel } = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const createToken = async(payload) => {
    let token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token
}

const login = async(req,res) => {
    try{
        const {email, password} = req.body;
        const Data = await userModel.findOne({email: email, password: password});
        if(Data){
            const access_token = await createToken({name: Data.name,email: Data.email})
            res.status(200).json({message :"Login success", Data: Data, access_token: access_token});
        }else{
            res.status(403).json({message: 'user not exists'});
        }
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
}
const getUser = async(req,res) => {
    try{
        const {id} = req.params;
        const Data = await userModel.findOne({_id: id});
        res.status(200).json(Data);
    }catch(error){
        res.status(500).json(error);
    }
}

const register = async(req,res) => {
    try{
        const {name, email, password} = req.body;
        const Data = await userModel.findOne({email: email});
        if(!Data){
            const createAccount = new userModel({
                name,
                email,
                password
            })
            const result = await createAccount.save();
            res.status(200).json({message: 'account created successfully.'})
        }else{
            res.status(409).json({message: 'User already exists'});
        }
    }catch(error){
        res.status(500).json(error);
    }
}

module.exports = { register, login, getUser };