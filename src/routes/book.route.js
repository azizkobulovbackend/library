const {Router } = require("express");
const router = Router()
const isAdmin = require('../middlewares/isAdmin')
const {getBooks, addBook, updateBook, deleteBook, findById} = require("../controllers/book.controller")

router.get('/:id', isAdmin, findById)
router.get('/',  getBooks)
router.post('/', isAdmin, addBook)
router.put('/:id', isAdmin, updateBook)
router.delete('/:id', isAdmin, deleteBook)



module.exports = router