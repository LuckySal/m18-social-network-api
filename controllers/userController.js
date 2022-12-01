const { User, Thought } = require("../models");

module.exports = {
    // Get all users
    async getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a user
    async getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a new user
    async createUser(req, res) {
        const newUser = new User(req.body);
        newUser.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(newUser);
            }
        });
    },
    // Update a user
    async updateUser(req, res) {
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
    // Delete a user
    async deleteUser(req, res) {
        User.deleteOne({ _id: req.body.userId }, function (err) {
            err
                ? res.status(400).json(err)
                : res.json({
                      message: `User with id: ${req.body.userId} deleted`,
                  });
        });
    },
    // Add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findById(req.body.userId);
            const friend = await User.findById(req.body.friendId);
            if (user.friends.indexOf(friend._id) >= 0) {
                res.json({
                    message: `User ${user._id} already has friend ${friend._id}`,
                    updated: false,
                });
            } else {
                user.friends.push(friend._id);
                user.save();
                res.json({ message: "Friend added!", updated: true });
            }
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // Remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findById(req.body.userId);
            const friend = await User.findById(req.body.friendId);
            let index = user.friends.indexOf(friend._id);
            if (index >= 0) {
                user.friends.splice(index, 1);
                res.json({
                    message: `User ${user._id} removed friend ${friend._id}`,
                    updated: true,
                });
            } else {
                res.json({ message: "Friend not found", updated: false });
            }
        } catch (err) {
            res.sttus(400).json(err);
        }
    },
};
