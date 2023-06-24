const ProfileModel= require('../model/profile.model');


const profileService = {

  // creates a new profile of a user
  createProfile: async (profiledata)=>{
    try {
      const profile = new ProfileModel(profiledata);
      await profile.save();
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while creating profile');
    }
  },

  // updates an existing user profile
  updateProfile: async (profiledata) => {
    try {
      await profileModel.findOneAndUpdate({username: profiledata.username},
          profiledata);
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while updating profile');
    }
  },

  // deletes an existing profile
  removeProfile: async (username) => {
    try {
      await profileModel.findOneAndRemove({username: username});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while removing profile');
    }
  },

  // gets the profile for given username
  getProfile: async (username) => {
    try {
      const profile = await profileModel.findOne({username: username});
      return profile;
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching profile');
    }
  },

  // gets the list of profile for the given prefix as username
  getProfiles: async (username) => {
    try {
      const profiles = await profileModel.
          find({username: new RegExp(username, 'i')});
      return profiles;
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching list of profiles');
    }
  },
};

module.exports = profileService;
