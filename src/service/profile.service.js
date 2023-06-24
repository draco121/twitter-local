const ProfileModel= require('../model/profile.model');
const networkService = require('./network.service');

const profileService = {

  // creates a new profile of a user
  createProfile: async (profiledata)=>{
    try {
      const profile = new ProfileModel(profiledata);
      await profile.save();
      networkService.createNetwork(profiledata.username);
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while creating profile');
    }
  },

  // updates an existing user profile
  updateProfile: async (profiledata) => {
    try {
      await ProfileModel.findOneAndUpdate({username: profiledata.username},
          profiledata);
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while updating profile');
    }
  },

  // deletes an existing profile
  removeProfile: async (username) => {
    try {
      await ProfileModel.findOneAndRemove({username: username});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while removing profile');
    }
  },

  // gets the profile for given username
  getProfile: async (username) => {
    try {
      const profile = await ProfileModel.findOne({username: username});
      return profile;
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching profile');
    }
  },

  // gets the list of profile for the given prefix as username
  getProfiles: async (username) => {
    try {
      const profiles = await ProfileModel.
          find({username: new RegExp(username, 'i')});
      return profiles;
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching list of profiles');
    }
  },
};

module.exports = profileService;
