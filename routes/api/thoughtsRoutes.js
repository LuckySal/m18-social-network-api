const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router
    .route("/")
    .get(getThoughts)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction);

module.exports = router;
