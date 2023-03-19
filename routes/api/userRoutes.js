const router = require('express').Router()
const {
    getUsers,
    createUser,
    deleteUser,
    getSingleUser,
    updateUser,
} = require('controllers/userController')

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

module.exports = router
