const { User } = require('../models');

const userController = {
  //18.1.6 step TWO create the first two methods
    // get all users
    getAllUsers(req, res) {
      User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    
      // get one user by id and populate thought and friend data
      getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .select('-__v')
          .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user was found with this id!' });
                  return;
                }
                res.json(dbUserData);
            })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    //create the method for handling POST /api/users
    // createPizza
    createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //creat the method for when requesting to PUT /api/pizza/:id
    // update user by id
    updateUser({ params, body }, res) {
      //with .findOneAndUpdate method, mongoose finds a single document we want to update,
            //then updates it and returns the updated document
      User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user was found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
        .catch(err => res.status(400).json(err));
    },

    //create the method to delet a pizza from the database
    // delete user
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user was found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //post to add a new friend to a user's friend list
    
    addFriend({ params }, res){
        User.findOneAndUpdate({
            id_: params.id
        },
        {$push: { friends: params.friendsId}},
        {new: true},
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //delet to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndDelete({
            id_: params.id
        },
        {$pull: { friends: params.friendsId }},
        {new: true},
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }
  };

  module.exports = userController;