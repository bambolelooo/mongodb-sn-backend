const router = require('express').Router()
const {
    getUsers,
    createUser,
    deleteUser,
    getSingleUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('controllers/userController')

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)
router.route('/:userId/friends/:friendId').delete(deleteFriend).post(addFriend)
module.exports = router
