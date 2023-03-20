const { User, Thought } = require('models/')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                console.log('Asked for all thoughts')
                return res.json(thoughts)
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },
    getSingleThought(req, res) {
        Thought.findById({ _id: req.params.thoughtId })
            .then((thought) => {
                console.log('Asked for single thought')
                return res.json(thought)
            })
            .catch((err) => {
                return res.json(err)
            })
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                const message = `Thought '${thought._id}' created by user ${req.body.username}`
                return res.json({ message: message })
            })
            .catch((err) => res.status(500).json(err))
    },
    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                const message = `Thought ${thought._id} updated`
                console.log(message)
                return res.json({ message: message })
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    },
    deleteThought(req, res) {
        Thought.findByIdAndDelete({ _id: req.params.thoughtId })
            .then(() => {
                const message = `Thought ${req.params.thoughtId} deleted`
                console.log(message)
                return res.json({ message: message })
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    },
    createReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                const message = `Added reaction to thought ${thought._id}`
                console.log(message)
                return res.json({ message: message })
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } }
        )
            .then((thought) => {
                const message = `Removed reaction ${req.params.reactionId} from thought ${thought._id}`
                console.log(message)
                return res.json({ message: message })
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    },
}
