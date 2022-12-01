const { User, Thought } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .select("-__v")
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // TODO: Create a new user
    createUser(req, res) {
        const newUser = new User(req.body);
        newUser.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(newUser);
            }
        });
    },
    // TODO: Update a user
    updateUser(req, res) {
        User.findById(req.body.userId).then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user with that ID!" });
            } else {
                if (req.body.username) {
                    user.username = req.body.username;
                }
                if (req.body.email) {
                    user.email = req.body.email;
                }
                user.save(function (err) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    },
    // TODO: Delete a user
    deleteUser(req, res) {
        User.deleteOne({ _id: req.body.userId }, function (err) {
            err
                ? res.status(400).json(err)
                : res.json({
                      message: `User with id: ${req.body.userId} deleted`,
                  });
        });
    },
    // TODO: Add a friend to a user's friend list
    addFriend(req, res) {},
    // TODO: Remove a friend from a user's friend list
    removeFriend(req, res) {},
};
