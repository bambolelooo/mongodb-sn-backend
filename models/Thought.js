const mongoose = require('mongoose')
const User = require('./User')
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
})

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    { versionKey: false }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})
thoughtSchema.post('save', async (doc) => {
    try {
        // find the user and update their thoughts array
        const user = await User.findOne({ username: doc.username })
        if (user) {
            if (!user.thoughts.includes(doc._id)) {
                user.thoughts.push(doc._id)
                await user.save()
                console.log(
                    `Added thought ${doc._id} to user ${user.username}'s thoughts array`
                )
            } else {
                console.log(
                    `Thought ${doc._id} already exists in user ${user.username}'s thoughts array`
                )
            }
        } else {
            console.log(`User with username ${doc.username} not found`)
        }
    } catch (error) {
        console.error(error)
    }
})

function dateFormat(timestamp) {
    return new Date(timestamp).toISOString()
}

const Thought = mongoose.model('Thought', thoughtSchema)
module.exports = Thought
