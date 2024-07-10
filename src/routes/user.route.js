const {Router } = require("express");
const router = Router()
const { findById, getUsers, addUser, updateUser, deleteUser} = require("../controllers/user.controller")

router.get('/:id', findById)
router.get('/',  getUsers)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)



module.exports = router