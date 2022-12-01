const { User, Thought } = require("../models");

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    async getSingleThought(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => {
                !thought
                    ? res
                          .status(404)
                          .json({ message: "No thought found with that ID!" })
                    : res.json(thought);
            })
            .catch((err) => res.status(500).json(err));
    },
    // Create a new thought
    async createThought(req, res) {
        try {
            const user = await User.findById(req.body.userId);
            const newThought = new Thought({
                username: user.username,
                thoughtText: req.body.text,
            });
            user.thoughts.push(newThought._id);
            newThought.save(function (err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.json(newThought);
                }
            });
            user.save();
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findById(req.body.thoughtId);
            thought.thoughtText = req.body.text;
            thought.save();
            res.json({ message: "Thought updated!", updated: true });
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findById(req.body.thoughtId);
            console.log(thought);
            const user = await User.findOne({ username: thought.username });
            let index = user.thoughts.indexOf(thought._id);
            thought.delete();
            if (index >= 0) {
                user.thoughts.splice(index, 1);
                res.json({ message: "Thought deleted!" });
            } else {
                res.json(500).json({ message: "Something weird happened" });
            }
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // Add reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            console.log(thought);
            thought.reactions.push({
                reactionBody: req.body.text,
                username: req.body.username,
            });
            console.log(thought);
            thought.save();
            res.json({ message: "Reaction added!", updated: true });
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // Delete reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            let index = thought.reactions.findIndex(
                (element) => element._id === req.body.reactionId
            );
            if (index >= 0) {
                thought.reactions.splice(index, 1);
                res.json({
                    message: "Reaction deleted!",
                    updated: true,
                });
            } else {
                res.status(404).json({
                    message: "Reaction not found",
                    updated: false,
                });
            }
        } catch (err) {
            res.status(400).json(err);
        }
    },
};
