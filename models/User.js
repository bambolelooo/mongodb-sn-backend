const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address.'],
        },
        thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        id: false,
        versionKey: false,
    }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

// Define pre-hook to remove user's thoughts when user is deleted
// userSchema.pre(
//     'deleteOne',
//     { document: true, query: false },
//     async function (next) {
//         try {
//             await Thought.deleteMany({ username: this.username })
//             next()
//         } catch (err) {
//             console.error(err)
//             next(err)
//         }
//     }
// )

const User = mongoose.model('User', userSchema)

module.exports = User
