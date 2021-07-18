const { Thoughts } = require('../models');

const thoughtsController = {
  //TWO create the first two methods
    // get all thoughts
    getAllThoughts(req, res) {
      Thoughts.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    
      // get one thoughts by id
      getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
      },

    //create the method for handling POST /api/thoughts
    // createthought
    createThoughts({ body }, res) {
      Thoughts.create(body)
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err));
    },

    //creat the method for when requesting to PUT /api/thoughts/:id
    // update thought by id
    updateThoughts({ params, body }, res) {
      //with .findOneAndUpdate method, mongoose finds a single document we want to update,
            //then updates it and returns the updated document
      Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtsData => {
          if (!dbThoughtsData) {
            res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
        .catch(err => res.status(400).json(err));
    },

    //create the method to delet a thoughts from the database
    // delete thoughts
    deleteThoughts({ params }, res) {
      Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
          if (!dbThoughtsData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    //POST to create reaction stored in a single thought's reaction array field
    
    //DELET to pull and remove a reaction by the reaction's reactionId value
  };

  module.exports = thoughtsController;