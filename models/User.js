const { Schema, model } = require("mongoose");
const format = require("date-format");
const Thought = require("./Thought");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (text) {
                    const emailRegex =
                        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i;
                    return emailRegex.test(text);
                },
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
        },
        id: false,
    }
);

userSchema.pre(
    "deleteOne",
    { document: true, query: false },
    async function () {
        this.thoughts.forEach(async (element) => {
            const thought = await Thought.findByIdAndDelete(element);
        });
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
