//import the dpendencies
const moment = require('moment');
const { Schema, model } = require('mongoose');

//add the ReactionSchema using the Schema constructor imported from Mongoose and 
    //define the fields with specific data types
const ReactionSchema = new mongoose.Schema({
  reactionId: mongoose.ObjectId,
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timeStampValidation) =>
      moment(timeStampValidation).format("MMMM Do YYYY, h:mm:ss a"),
  }
})
//add the ThoughtsSchema using the Schema constructor imported from Mongoose and 
    //define the fields with specific data types
const ThoughtsSchema = new Schema({
    //The text
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
    },
    //a timestamp of when the thought was created
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStampValidation) =>
      moment(timeStampValidation).format("MMMM Do YYYY, h:mm:ss a"),
    },
    toJSON: { 
      getters: true,
      virtuals: true
    },
    //the user that created this thought
    username: {
      type: String,
      required: true,
    },
    //the replies
    reactions: [ReactionSchema],
  });

//create a virtual called reactionCount that retrieves the length of the thought's reaction array field on query
ThoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create the Thoughts model using the ThoughtsSchema
const Thoughts = model('Thoughts', ThoughtsSchema);

//export the Though model
module.exports = Thoughts;