const { User } = require('../models');

const userController = {
  //18.1.6 step TWO create the first two methods
    // get all pizzas
    getAllUsers(req, res) {
      User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    
      // get one user by id
      getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .then(dbUserData => res.json(dbUserData))
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

    //creat the method for when requesting to PUT /api/pizzas/:id
    // update user by id
    updatePizza({ params, body }, res) {
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
    deletePizza({ params }, res) {
      Pizza.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user was found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
  };

  module.exports = userController;