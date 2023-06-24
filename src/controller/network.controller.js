const networkService = require("../service/network.service")
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
        res.status(401).send(err.message)
    }
})

router.post("/createnet",(req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        networkService.createNetwork(userinfo.data)
        res.send("network created")
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.post("/sendrequest/:friendusername",(req,res)=>{
    try{
        let friendusername = req.params.friendusername
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        networkService.sendFollowRequest(userinfo.data,friendusername)
        res.send("follow request sent successfully")
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
    
})

router.delete("/declinerequest/:friendusername",(req,res)=>{
    try{
        let friendusername = req.params.friendusername
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        networkService.declineFollowRequest(userinfo.data,friendusername)
        res.send("follow request declined")
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.delete("/withdrawrequest/:friendusername",(req,res)=>{
    try{
        let friendusername = req.params.friendusername
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        networkService.withdrawFollowRequest(userinfo.data,friendusername)
        res.send("follow request withdrawn")
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.post("/acceptrequest/:friendusername", (req,res) => {
    try{
        let friendusername = req.params.friendusername
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        networkService.acceptFollowrequest(userinfo.data,friendusername)
        res.send("follow request accepted")
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.delete("/unfollow/:friendusername", (req,res) => {
    try{
        let friendusername = req.params.friendusername
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        networkService.acceptFollowrequest(userinfo.data,friendusername)
        res.send("user unfollowed successfully")
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.post("/createnetwork", async (req,res) => {
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        await networkService.createNetwork(userinfo.data)
        res.sendStatus(201)
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.get("/listfollowers", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let followers = await networkService.getFollowers(userinfo.data) 
        res.json(followers)
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.get("/listfollowings", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let following= await networkService.getFollowing(userinfo.data) 
        res.json(following)
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.get("/listsentrequest", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let sentRequests = await networkService.getSentRequests(userinfo.data) 
        res.json(sentRequests)
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.get("/listrecivedrequest", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let recivedRequests = await networkService.getRecivedRequests(userinfo.data) 
        res.json(recivedRequests)
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.get("/followerscount", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let followerscount = await networkService.getFollowersCount(userinfo.data) 
        res.json({followerscount:followerscount})
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

router.get("/followingcount", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let followingcount = await networkService.getFollowingCount(userinfo.data) 
        res.json({followingcount:followingcount})
    }catch(err){
        logger.error(err)
        res.status(500).send(err.message)
    }
})

module.exports = router