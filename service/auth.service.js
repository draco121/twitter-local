const userModel = require("../model/user.model")
const bcrpyt = require("bcrypt")
const jwtUtils = require("../utils/jwt-utils")
const authService = {
    createAccount: async (userinfo)=>{
        let result = await userModel.findOne({username:userinfo.username})
        if(result){
            throw "User already exists"
        }else{
            let password = bcrpyt.hashSync(userinfo.password,2)
            userinfo.password = password
            let user = new userModel(userinfo)
            await user.save();            
        }
    },
    login: async(userinfo)=>{
        let user = await userModel.findOne({username:userinfo.username})
        if(user){
            if(bcrpyt.compareSync(userinfo.password,user.password)){
                return jwtUtils.createToken(userinfo.username)
            }
            else{
                throw "username or password is wrong"
            }
        }else{
            throw "username or password is wrong"
        }
    }
}

module.exports = authService