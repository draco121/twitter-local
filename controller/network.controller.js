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
        res.status(401).send(err)
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
        res.status(500).send(err)
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
        res.status(500).send(err)
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
        res.status(500).send(err)
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
        res.status(500).send(err)
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
        res.status(500).send(err)
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
        res.status(500).send(err)
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
        res.status(500).send(err)
    }
})

router.get("/listfollowers", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let followers = await networkService.getFollowers(userinfo.data) 
        res.send(followers)
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
})

router.get("/listfollowings", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let following= await networkService.getFollowing(userinfo.data) 
        res.send(following)
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
})

router.get("/listsentrequest", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let sentRequests = await networkService.getSentRequests(userinfo.data) 
        res.send(sentRequests)
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
})

router.get("/listrecivedrequest", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let recivedRequests = await networkService.getRecivedRequests(userinfo.data) 
        res.send(recivedRequests)
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
})

router.get("/followerscount", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let followerscount = await networkService.getFollowersCount(userinfo.data) 
        res.send(followerscount)
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
})

router.get("/followingcount", async (req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let followingcount = await networkService.getFollowingCount(userinfo.data) 
        res.send(followingcount)
    }catch(err){
        logger.error(err)
        res.status(500).send(err)
    }
})

module.exports = router