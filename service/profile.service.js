const profileModel= require("../model/profile.model")


const profileService = {
    createProfile: async (profiledata)=>{
        let profile = new profileModel(profiledata)
        await profile.save()
    },

    updateProfile: async (profiledata) => {
        await profileModel.findOneAndUpdate({username: profiledata.username},profiledata)
    },

    removeProfile: async (username) => {
        await profileModel.findOneAndRemove({username: username})
    },

    getProfile: async (username) => {
        let profile = await profileModel.findOne({username:username})
        return profile
    },

    getProfiles: async (username) => {
        let profiles = await profileModel.find({username: new RegExp(username,'i')})
        return profiles
    }
}

module.exports = profileService