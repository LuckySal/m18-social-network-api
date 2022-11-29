const { User, Thought } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // TODO: Create a new user
    createUser(req, res) {},
    // TODO: Update a user
    updateUser(req, res) {},
    // TODO: Delete a user
    deleteUser(req, res) {},
    // TODO: Add a friend to a user's friend list
    addFriend(req, res) {},
    // TODO: Remove a friend from a user's friend list
    removeFriend(req, res) {},
};
