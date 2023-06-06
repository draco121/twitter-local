const networkModel = require('../model/network.model')
const networkService = {
    createNetwork: async (username)=>{
        let network = new networkModel({username:username})
        await network.save()
    },
    sendFollowRequest: async(myusername,friendusername) => {
        await networkModel.findOneAndUpdate({username: myusername},{$addToSet:{sentrequests: friendusername}})
        await networkModel.findOneAndUpdate({username: friendusername},{$addToSet:{recivedrequests: myusername}})
    },
    withdrawFollowRequest: async (myusername,friendusername) => {
        await networkModel.findOneAndUpdate({username:myusername},{$pull:{sentrequests: friendusername}})
        await networkModel.findOneAndUpdate({username:friendusername},{$pull:{recivedrequests: myusername}})
    },
    declineFollowRequest: async(myusername,friendusername) => {
        await networkModel.findOneAndUpdate({username:myusername},{$pull:{recivedrequests: friendusername}})
        await networkModel.findOneAndUpdate({username:friendusername},{$pull:{sentrequests: myusername}})
    },
    acceptFollowrequest: async(myusername,friendusername) => {
        await networkModel.findOneAndUpdate({username:myusername},{$addToSet:{followers: friendusername}})
        await networkModel.findOneAndUpdate({username:myusername},{$pull:{recivedrequests: friendusername}})
        await networkModel.findOneAndUpdate({username:friendusername},{$addToSet:{following: myusername}})
        await networkModel.findOneAndUpdate({username:friendusername},{$pull:{sentrequests: myusername}})
    },
    unfollow: async(myusername,friendusername) => {
        await networkModel.findOneAndUpdate({username:myusername},{$pull:{following: friendusername}})
        await networkModel.findOneAndUpdate({username:friendusername},{$pull:{followers: myusername}})
    },
    getFollowers: async(username) => {
        return await networkModel.find({username:username},"followers")
    },
    getFollowing: async(username) => {
        return await networkModel.find({username:username},"following")
    },
    getSentRequests: async (username) => {
        return await networkModel.find({username:username},"sentrequests")
    },
    getRecivedRequests: async (username) => {
        return await networkModel.find({username:username},"recivedrequests")
    }
}

module.exports = networkService