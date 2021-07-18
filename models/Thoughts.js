//18.1.5 step ONE import the dpendencies
const { Timestamp } = require('bson');
const moment = require('moment');
const { Schema, model } = require('mongoose');

//add the schema using the Schema constructor imported from Mongoose and 
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
    toJSON: { getters: true },
    //the user that created this thought
    username: {
      type: String,
      required: true,
    },
    //the replies
    reactions: [ReactionSchema],
  });

//create the Thoughts model using the ThoughtsSchema
const Thoughts = model('Thoughts', ThoughtsSchema);

//export the Though model
module.exports = Thoughts;