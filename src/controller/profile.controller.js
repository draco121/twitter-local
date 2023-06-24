const profileService = require("../service/profile.service")
const router  = require("express").Router()
const logger = require('../utils/logger')
const jwtUtils = require('../utils/jwt-utils')

router.use((req,res,next) => {
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        if(userinfo){
              // Log an info message for each incoming request
            logger.info(`Received a request for ${req.url} from ${userinfo.data}`);
            next();
        }else{
            res.status(401).send()
        }
    }catch(err){
        res.status(401).send()
    }

})

router.put("/create", (req,res)=>{
    try{
        let userdata = req.body
        profileService.createProfile(userdata)
        res.send("profile created")
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.patch("/update",(req,res) => {
    try{
        let userdata = req.body
        profileService.updateProfile(userdata)
        res.send("profile updated")
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.delete("/delete/:username", (req,res) => {
    try{
        let username = req.params.username
        profileService.removeProfile(username)
        res.sendStatus(201)
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }    
})

router.get("/get/:username", async (req,res) => {
    try{
        let username = req.params.username
        let profile  = await profileService.getProfile(username)
        res.json(profile)
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }    
})

router.get("/search/:username", async (req,res) => {
    try{
        let username = req.params.username
        let profiles = await profileService.getProfiles(username)
        res.json(profiles)
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

module.exports = router