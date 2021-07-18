//import the dependencies
const { Schema, model } = require('mongoose');

var emailValidation = function(email){
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(String(email).toLowerCase());
};

//add the schema using the Schema constructor imported from Mongoose and 
    //define the fields with specific data types
const UserSchema = new Schema({
    //name of the user
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    //user's email
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: emailValidation,
            message: (email) => `${email.value} please enter a valid email address`,
        },
      },
      //users thoughts
      thoughts: {
        _id: [],
        ref: "Thought",
      },
      //user's friends
      friends: {
        _id: [],
        ref: "User"
      },
  });

  //create the user model using the UserSchema
const User = model('User', UserSchema);

//export the User model
module.exports = User;