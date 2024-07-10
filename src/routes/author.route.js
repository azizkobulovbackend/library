const {Router } = require("express");
const router = Router()
const isAdmin = require('../middlewares/isAdmin')
const {getAuthors, addAuthor, updateAuthor, findById, deleteAuthor} = require("../controllers/author.controller");


router.get('/:id', isAdmin, findById)
router.get('/', getAuthors)
router.post('/', isAdmin, addAuthor)
router.put('/:id', isAdmin, updateAuthor)
router.delete('/:id', isAdmin, deleteAuthor)

module.exports = router;