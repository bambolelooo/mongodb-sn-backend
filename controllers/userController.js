const { Thought, User } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                console.log('Asked for all users')
                return res.json(users)
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then(async (user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: 'No user with such ID' })
                } else {
                    return res.json(user)
                }
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },
    deleteUser(req, res) {
        let username
        let isUser = true
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    isUser = false
                    return res.status(404).json({ message: 'No such user' })
                } else {
                    username = user.username
                    return Thought.deleteMany({ username: user.username })
                }
            })
            .then(() => {
                if (isUser) {
                    let message = `User '${username}' and their thoughts deleted!`
                    console.log(message)
                    return res.json({
                        message: message,
                    })
                }
                // Remove this res.json() call
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },
    updateUser(req, res) {
        User.findByIdAndUpdate(
            {
                _id: req.params.userId,
            },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: 'No user with this id!' })
                } else {
                    return res.json(user)
                }
            })
            .catch((err) => res.status(500).json(err))
    },
    addFriend(req, res) {
        let user1username
        let user2username
        User.findByIdAndUpdate(
            {
                _id: req.params.userId,
            },
            {
                $addToSet: {
                    friends: req.params.friendId,
                },
            },
            { runValidators: true, new: true }
        )
            .then((user1) => {
                user1username = user1.username

                return User.findByIdAndUpdate(
                    {
                        _id: req.params.friendId,
                    },
                    {
                        $addToSet: {
                            friends: req.params.userId,
                        },
                    },
                    { runValidators: true, new: true }
                )
            })
            .then((user2) => {
                user2username = user2.username
                if (!user2) {
                    return res
                        .status(404)
                        .json({ message: 'No user with this id!' })
                } else {
                    const message = `User '${user1username}' is now friends with user '${user2username}'`
                    console.log(message)
                    return res.json({
                        message: message,
                    })
                }
            })
            .catch((err) => res.status(500).json(err))
    },
    deleteFriend(req, res) {
        let user1username
        let user2username
        User.findByIdAndUpdate(
            {
                _id: req.params.userId,
            },
            {
                $pull: {
                    friends: req.params.friendId,
                },
            },
            { runValidators: true, new: true }
        )
            .then((user1) => {
                user1username = user1.username

                return User.findByIdAndUpdate(
                    {
                        _id: req.params.friendId,
                    },
                    {
                        $pull: {
                            friends: req.params.userId,
                        },
                    },
                    { runValidators: true, new: true }
                )
            })
            .then((user2) => {
                user2username = user2.username
                if (!user2) {
                    return res
                        .status(404)
                        .json({ message: 'No user with this id!' })
                } else {
                    const message = `User '${user1username}' is not friends with user '${user2username}' anymore`
                    console.log(message)
                    return res.json({
                        message: message,
                    })
                }
            })
            .catch((err) => res.status(500).json(err))
    },
}
