const likeservice = require("../service/like.service")
const jwtUtils = require("../utils/jwt-utils")
const router  = require("express").Router()
const logger = require('../utils/logger')

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


router.put("/create/:postid",(req,res)=>{
    try{
        let token = req.headers.authorization
        let postid = req.params.postid
        let userinfo = jwtUtils.validateToken(token)
        likeservice.likePost(userinfo.data,postid)
        res.sendStatus(201)
    }catch(err){
        res.status(401).send(err)
    }
})

router.delete("/delete/:postid",(req,res)=>{
    try{
        let token = req.headers.authorization
        let postid = req.params.postid
        let userinfo = jwtUtils.validateToken(token)
        likeservice.unlikePost(userinfo.data,postid)
        res.sendStatus(201)
    }catch(err){
        res.status(401).send(err)
    }
})

router.get("/likescount/:postid", async(req,res) => {
    try{
        let postid = req.params.postid
        let likescount = await likeservice.countLike(postid)
        res.json({likescount:likescount})
    }catch(err){
        res.status(401).send(JSON.stringify(err))
    }
})

module.exports = router