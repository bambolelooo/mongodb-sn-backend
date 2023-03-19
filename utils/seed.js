// import mongoose and the model
const connection = require('../config/connection')
const { Thought, User } = require('../models')

// connect to MongoDB using Mongoose
connection.on('error', (err) => err)

connection.once('open', async () => {
    console.log('connected')

    const users = [
        {
            username: 'johndoe',
            email: 'johndoe@example.com',
            thoughts: [],
            friends: [],
        },
        {
            username: 'janedoe',
            email: 'janedoe@example.com',
            thoughts: [],
            friends: [],
        },
        {
            username: 'bobsmith',
            email: 'bobsmith@example.com',
            thoughts: [],
            friends: [],
        },
    ]
    // create some thoughts with reactions
    const thoughts = [
        {
            thoughtText: 'I love coding!',
            username: 'johndoe',
            reactions: [
                {
                    reactionBody: 'Me too!',
                    username: 'janedoe',
                },
                {
                    reactionBody: 'That is awesome!',
                    username: 'bobsmith',
                },
            ],
        },
        {
            thoughtText: 'I hate Mondays!',
            username: 'janedoe',
            reactions: [
                {
                    reactionBody: 'Same here!',
                    username: 'bobsmith',
                },
            ],
        },
    ]

    // insert the thoughts into the database
    try {
        await Thought.deleteMany({}).then(() => {
            console.log('thought--')
        })
        await User.deleteMany({}).then(() => {
            console.log('user--')
        })

        await User.collection.insertMany(users)
        console.log('++users')
        for (let j = 0; j < thoughts.length; j++) {
            const thought = thoughts[j]
            await Thought.create(thought)
            console.log(`Created thought`)
        }

        console.log('++thought')
    } catch (e) {
        console.log(e)
    }

    process.exit(0)
})
