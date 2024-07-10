const {Router } = require("express");
const router = Router()
const isAdmin = require('../middlewares/isAdmin')
const {findById, getAllRent, rentBook, finishRent} = require("../controllers/rent.controller")

router.get('/:id', isAdmin, findById)
router.get('/', isAdmin, getAllRent)
router.post('/', rentBook)
router.delete('/finish-rent', finishRent)
// router.put('/:id', updateBook)
// router.delete('/:id', deleteBook)



module.exports = router