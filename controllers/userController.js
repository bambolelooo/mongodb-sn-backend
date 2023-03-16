const { Thought, User } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                console.log('asked for all users')
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
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No such user' })
                } else {
                    username = user.username
                    return Thought.deleteMany({ username: user.username })
                }
            })
            .then(() => {
                console.log(`User ${username} deleted`)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
}
