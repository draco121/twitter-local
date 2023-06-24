const { json } = require("express")
const commentservice = require("../service/comment.service")
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


router.put("/create",(req,res)=>{
    try{
        let token = req.headers.authorization
        let userinfo = jwtUtils.validateToken(token)
        let commentdata= req.body
        commentdata.username = userinfo.data
        commentservice.createComment(commentdata)
        res.sendStatus(201)
    }catch(err){
        res.status(401).send(err)
    }
    

})

router.delete("/delete/:commentid",(req,res)=>{
    try{
        let commentid= req.params.commentid
        commentservice.deleteComment(commentid)
        res.send("comment removed")
    }catch(err){
        res.status(401).send(err)
    }

})

router.get("/listcomment/:postid",async (req,res)=>{
    try{
        let postid = req.params.postid
        let comments = await commentservice.getCommentList(postid)
        res.json(comments)
    }catch(err){
        res.status(401).send(err)
    }
})

router.get("/commentcount/:postid", async(req,res) => {
    try{
        let postid = req.params.postid
        let commentcount = await commentservice.getCommentCount(postid)
        res.json({commentcount:commentcount})
    }catch(err){
        res.status(401).send(JSON.stringify(err))
    }
})

module.exports = router